import React, { useEffect } from 'react';
import style from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select } from '@arco-design/web-react';
import { state, setUserInfo } from '../../store';
import { classMap, classOptions } from '../../constants/constant';
import { useSignalRContext } from '../../context/signalRContext';
import { getCharacterList, addCharacter, getCharacterDetail } from '../../api/index';
import { IconArrowLeft } from '@arco-design/web-react/icon';
const FormItem = Form.Item;

const RoleSelect: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [createRole, setCreateRole] = React.useState(0); //创建角色界面
    const [cteateList, setCreateList] = React.useState([1, 2, 3] as any); //没角色时的占位
    const [roleList, setRoleList] = React.useState([] as any); //角色列表
    const [selectedClass, setSelectedClass] = React.useState(1);
    const { start } = useSignalRContext();
    const [errors, setErrors] = React.useState('');
    const getCharacterDetailFunc = async (id: string) => {
        const res = await getCharacterDetail(id);
        if (res) {
            setUserInfo(res.data);
            start(id)
            navigate('/');
        }
    };
    const addCharacterFunc = async (params: any) => {
        const res = await addCharacter(params);
        if (res) {
            getCharacterListFunc();
            setCreateRole(2);
        }
    };
    const getCharacterListFunc = async () => {
        const res = await getCharacterList();
        if (res) {
            const list: any = res.data;
            setRoleList(list);
            const arr = [];
            for (let i = 0; i < 3 - list.length; i++) {
                arr.push(i);
            }
            setCreateList(arr);
        }
    };
    useEffect(() => {
        getCharacterListFunc();
    }, []);

    // 过滤特殊字符
    const handleRoleInputChange = (e: any) => {
        const value = e.target.value.replace(/[^\w\u4e00-\u9fa5]/g, '');
    };
    const validateRoleName = (characterName: any) => {
        if (!characterName) {
            setErrors('角色名不能为空');
            return false;
        }
        // 全汉字情况
        if (/^[\u4e00-\u9fa5]+$/.test(characterName)) {
            if (characterName.length < 2 || characterName.length > 8) {
                setErrors('汉字用户名需2-8个字');
                return false;
            }
        }
        // 非汉字情况
        else if (!/[\u4e00-\u9fa5]/.test(characterName)) {
            if (characterName.length < 2 || characterName.length > 16) {
                setErrors('非汉字用户名需2-16个字符');
                return false;
            }
        }
        // 混合情况
        else {
            let length = 0;
            for (let char of characterName) {
                length += /[\u4e00-\u9fa5]/.test(char) ? 2 : 1;
            }
            if (length < 2 || length > 16) {
                setErrors('混合用户名总长度需2-16个字符(1汉字=2字符)');
                return false;
            }
        }
        return true;
    };
    return (
        <div className={style['login-box']}>
            <div className="w-[452px] flex items-center" style={{ justifyContent: createRole === 1 ? 'start' : 'center' }}>
                {createRole === 1 && (
                    <IconArrowLeft
                        style={{ fontSize: '24px', marginRight: '150px' }}
                        onClick={() => {
                            setCreateRole(2);
                        }}
                    />
                )}
                <div className="text-2xl font-medium">请{createRole === 1 ? '创建' : '选择'}角色</div>
            </div>
            <div className="text-sm font-normal text-[var(--sub-font-color)] mt-[10px]">游戏版本 V0.0.1</div>
            {createRole === 1 ? (
                // 创建角色
                <Form
                    requiredSymbol={false}
                    form={form}
                    layout={'vertical'}
                    style={{ width: 452 }}
                    autoComplete="off"
                    onValuesChange={(v, vs) => { }}
                    onSubmit={v => {
                        console.log('提交角色', v.characterName);
                        if (validateRoleName(v.characterName)) {
                            const params = {
                                characterName: v.characterName,
                                class: selectedClass,
                            };
                            addCharacterFunc(params);
                        }
                    }}>
                    <FormItem label="角色名称" field="characterName">
                        <Input className={style.input} onChange={handleRoleInputChange} maxLength={16} placeholder="请输入角色名称" />
                    </FormItem>
                    {errors && <div className="text-[var(--danger-color)] mb-[20px]">{errors}</div>}
                    <FormItem label="职业">
                        <Select
                            className={style.input}
                            placeholder="请选择职业"
                            style={{ width: 452 }}
                            value={selectedClass}
                            onChange={value => {
                                setSelectedClass(value);
                                console.log('You select', value);
                            }}
                            options={classOptions}></Select>
                    </FormItem>
                    {/* 职业介绍 */}
                    <div className="text-base text-[var(--sub-font-color)]">
                        <div className="ttext-[var(--main-font-color)]">职业介绍：</div>
                        <div>职责：</div>
                        <div>被动技能：</div>
                        <div>次要技能：</div>
                        <div>主要技能：</div>
                    </div>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            long
                            style={{ marginTop: 20, height: 48, color: 'var(--active-color)', backgroundColor: 'var(--sub-bg-color)' }}>
                            创建角色
                        </Button>
                    </FormItem>
                </Form>
            ) : (
                //选择角色,最多只能选三个角色，保留三个空位
                <div>
                    {roleList.map((item: any) => (
                        <div
                            className={style['rule-box']}
                            onClick={() => {
                                console.log('点击了角色进入页面');
                                getCharacterDetailFunc(item.id);
                            }}>
                            <div>{item.name}</div>
                            <div>
                                {classMap[item.class]}
                                <span>
                                    Lv.{item.level < 10 ? '0' : ''}
                                    {item.level}
                                </span>
                            </div>
                        </div>
                    ))}
                    {cteateList.map(() => (
                        <div
                            className={style['rule-box']}
                            style={{ borderStyle: 'dashed' }}
                            onClick={() => {
                                setCreateRole(1);
                            }}>
                            <div>+</div>
                            <div>创建角色</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RoleSelect;
