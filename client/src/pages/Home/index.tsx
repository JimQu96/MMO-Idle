import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import LeftMenu from '../../components/LeftMenu/LeftMenu';
import Card from '../../components/Card/Card';
import RightColumns from '../../components/RightColumns/RightColumns';
import { mineList, userInfo, menuCardMap } from '../../components/constant';
import Chat from '../../components/Chat/Chat';

const Home: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('采矿');
  useEffect(() => {});
  const handleCardClick = (info: object) => {
    console.log('开采', info);
  };
  const handleMenuClick = (title: string) => {
    console.log('点击菜单', title);
    setActiveMenu(title);
  };
  return (
    <div className="">
      <Navbar userInfo={userInfo} />
      <div className="flex justify-between">
        <LeftMenu onMenuClick={handleMenuClick} />
        <div className="p-[20px] flex-1 relative">
          {/* 主内容区域 */}
          {menuCardMap[activeMenu].subMenu ? (
            <></>
          ) : (
            <>
              <div
                className="grid justify-center gap-[20px]"
                style={{ maxHeight: 'calc(100vh - 360px)', gridTemplateColumns: 'repeat(auto-fit, 300px)' }}>
                {menuCardMap[activeMenu].cardList.map(item => (
                  <Card info={item} onCardClick={handleCardClick} />
                ))}
              </div>
            </>
          )}

          {/* 聊天世界 */}
          <Chat />
        </div>
        {/* 右侧装备区 */}
        <RightColumns />
      </div>
    </div>
  );
};

export default Home;
