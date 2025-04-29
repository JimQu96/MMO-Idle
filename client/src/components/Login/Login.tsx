import React from 'react';
import style from './index.module.css';
import { Button, Form, Input, Select } from '@arco-design/web-react';
const FormItem = Form.Item;
const Option = Select.Option;
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];
const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [hasAccount, setHasAccount] = React.useState(false);
  const [createRole, setCreateRole] = React.useState(false);
  return (
    <div className={style['login-box']}>
      {createRole ? (
        <div className="text-2xl font-medium">请创建角色</div>
      ) : (
        <div className="text-2xl font-medium">欢迎{hasAccount ? '登录' : '注册'}艾姆艾姆欧放置</div>
      )}

      <div className="text-sm font-normal text-[var(--sub-font-color)] mt-[10px]">游戏版本 V0.0.1</div>
      {createRole ? (
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
            //   如果没有角色先去创建角色
            setCreateRole(true);
          }}>
          <FormItem label="角色名称" field="name" rules={[{ required: true, message: '必填' }]}>
            <Input className={style.input} placeholder="请输入角色名称" />
          </FormItem>
          <FormItem label="职业" field="password" rules={[{ required: true, message: '必填' }]}>
            <Select className={style.input} 
              placeholder="请选择职业"
              style={{ width: 452 }}
              onChange={value => {
                console.log('You select', value);
              }}>
              {options.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </FormItem>
          {/* 职业介绍 */}
          <div className='text-base text-[var(--sub-font-color)]'>
            <div className='ttext-[var(--main-font-color)]'>职业介绍：</div>
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
              //   如果没有角色先去创建角色
              setCreateRole(true);
            }}>
            <FormItem label="账号" field="name" rules={[{ required: true, message: '账号必填' }]}>
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
            {hasAccount ? '未有账号' : '已有账号'}
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
