import React, { useState, useEffect, useRef } from 'react';
import { Button, Dropdown, Menu } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import style from './index.module.css';
import logo from '../../assets/react.svg';
import { state, setToken } from '../../store';
const Navbar: React.FC = () => {
  const userInfo = state.userInfo;
  const navigate = useNavigate();
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [working, setWorking] = useState(false);
  const dropList = (
    <Menu
      style={{ width: 200 }}
      theme="dark"
      onClickMenuItem={(key: string) => {
        if (key === '1') {
          navigate('/roleSelect');
        } else if (key === '2') {
          setToken('');
          localStorage.removeItem('characterId')
          navigate('/login');
        }
      }}>
      <Menu.Item key="1">选择角色</Menu.Item>
      <Menu.Item key="2">退出登录</Menu.Item>
    </Menu>
  );
  useEffect(() => {
    const handleAnimationIteration = () => {
      // 每次动画循环完成时调用
      console.log('进度条循环完成！');
      // 这里调用你的接口
    };

    const progressBar = progressBarRef.current;
    if (progressBar) {
      progressBar.addEventListener('animationiteration', handleAnimationIteration);
    }
    // 清理函数
    return () => {
      if (progressBar) {
        progressBar.removeEventListener('animationiteration', handleAnimationIteration);
      }
    };
  }, []);
  return (
    <div className="left-0 top-0 w-full box-border border-[0px_0px_1px_0px] border-solid border-[var(--hover-color)] h-(--navbar-height) flex items-center justify-between">
      <h1 className="text-base font-normal" style={{ fontSize: 20, paddingLeft: 20 }}>
        艾姆艾姆欧放置
      </h1>
      {/* 状态栏 */}
      <div className="flex items-center justify-between">
        {working ? (
          <div className="flex items-center justify-between">
            <div>
              正在采集
              <span>灰色矿石</span>
              中...
            </div>
            <div className={style.statusBar}>
              {/* 滚动的条 */}
              <div className={style['progress-bar']} ref={progressBarRef}></div>
            </div>
            <Button
              onClick={() => {
                setWorking(false);
              }}>
              立即停止
            </Button>
          </div>
        ) : (
          <div>正在发呆中...</div>
        )}
      </div>
      {/* 个人信息 */}
      <div className="flex items-center justify-between">
        <div style={{ fontSize: 16 }}>{userInfo.name}</div>
        <Dropdown droplist={dropList} position="bl">
          <img style={{ width: 32, height: 32, marginLeft: 20, marginRight: 20 }} src={logo} alt="" />
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
