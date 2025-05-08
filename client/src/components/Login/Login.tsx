import React from 'react';
import style from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select } from '@arco-design/web-react';
import {state, setUserInfo} from '../../store'
import { userInfo } from '../../components/constant';
import { register ,login} from '../../api/index';

const FormItem = Form.Item;
const Option = Select.Option;
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [hasAccount, setHasAccount] = React.useState(false); //是否注册过
  const [createRole, setCreateRole] = React.useState(0); //创建角色界面
  const [cteateList, setCreateList] = React.useState([] as any); //没角色时的占位
  const [roleList, setRoleList] = React.useState([] as any); //角色列表
  const onRegister=async(params:any)=>{
    const res=await register(params)
  }
  const onLogin=async(params:any)=>{
    const res=await login(params)
  }
  return (
    <div className={style['login-box']}>
      {createRole ? (
        <div className="text-2xl font-medium">请{createRole === 1 ? '创建' : '选择'}角色</div>
      ) : (
        <div className="text-2xl font-medium">欢迎{hasAccount ? '登录' : '注册'}艾姆艾姆欧放置</div>
      )}

      <div className="text-sm font-normal text-[var(--sub-font-color)] mt-[10px]">游戏版本 V0.0.1</div>
      {createRole === 1 ? (
        // 创建角色
        <Form
          requiredSymbol={false}
          form={form}
          layout={'vertical'}
          style={{ width: 452 }}
          autoComplete="off"
          onValuesChange={(v, vs) => {
            console.log(v, vs);
          }}
          onSubmit={v => {
            console.log('login', v);
            setCreateRole(2);
          }}>
          <FormItem label="角色名称" field="name" rules={[{ required: true, message: '必填' }]}>
            <Input className={style.input} placeholder="请输入角色名称" />
          </FormItem>
          <FormItem label="职业" field="password" rules={[{ required: true, message: '必填' }]}>
            <Select
              className={style.input}
              placeholder="请选择职业"
              style={{ width: 452 }}
              onChange={value => {
                console.log('You select', value);
              }}>
              {options.map(option => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
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
      ) : createRole === 2 ? (
        //选择角色,最多只能选三个角色，保留三个空位
        <div>
          {roleList.map((item: any) => (
            <div className={style['rule-box']} onClick={() => {
                console.log('点击了角色进入页面');
                setUserInfo(userInfo)
                console.log(state.userInfo)
                navigate('/')
              }}>
              <div>{item.name}</div>
              <div>
                {item.job} <span>{item.level}</span>
              </div>
            </div>
          ))}
          {cteateList.map(() => (
            <div
              className={style['rule-box']}
              style={{borderStyle:'dashed'}}
              onClick={() => {
                console.log('点击了');
                setCreateRole(1);
              }}>
              <div>+</div>
              <div>创建角色</div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <Form
            requiredSymbol={false}
            form={form}
            layout={'vertical'}
            style={{ width: 452 }}
            autoComplete="off"
            onValuesChange={(v, vs) => {
              console.log(v, vs);
            }}
            onSubmit={v => {
              console.log('login', v);
              if(hasAccount){
                onLogin(v)
              }else{
                onRegister(v)
              }
              //   如果有角色，展示选择角色页面2，没有展示创建角色页面1
              setCreateRole(2);
              const list = [
                {
                  name: 'MHN',
                  job: '防御战士',
                  level: 'LV1',
                },
              ];
              setRoleList(list);
              const arr = [];
              for (let i = 0; i < 3 - list.length; i++) {
                arr.push(i);
              }
              setCreateList(arr);
            }}>
            <FormItem label="账号" field="userName" rules={[{ required: true, message: '账号必填' }]}>
              <Input className={style.input} placeholder="请输入账号" />
            </FormItem>
            <FormItem label="密码" field="password" rules={[{ required: true, message: '密码必填' }]}>
              <Input className={style.input} placeholder="请输入密码" />
            </FormItem>
            {!hasAccount && (
              <FormItem
                label="确认密码"
                field="confirm_password"
                dependencies={['password']}
                rules={[
                  {
                    validator: (v, cb) => {
                      if (!v) {
                        return cb('确认密码必填');
                      } else if (form.getFieldValue('password') !== v) {
                        return cb('确认密码必须和密码一致');
                      }
                      cb(null);
                    },
                  },
                ]}>
                <Input className={style.input} placeholder="确认密码" />
              </FormItem>
            )}
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                long
                style={{ marginTop: 20, height: 48, color: 'var(--active-color)', backgroundColor: 'var(--sub-bg-color)' }}>
                {hasAccount ? '登录游戏' : '注册账号'}
              </Button>
            </FormItem>
          </Form>
          <div style={{ color: 'var(--sub-font-color)' }}>
            {hasAccount ? '未有账号?' : '已有账号!'}
            <Button
              type="text"
              style={{ color: 'var(--active-color)' }}
              onClick={() => {
                setHasAccount(!hasAccount);
              }}>
              {hasAccount ? '立即注册' : '直接登录'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
