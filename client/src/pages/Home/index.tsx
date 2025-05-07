import React, { useState, useEffect, useRef } from 'react';
import { Menu } from '@arco-design/web-react';
import Navbar from '../../components/Navbar/Navbar';
import LeftMenu from '../../components/LeftMenu/LeftMenu';
import Card from '../../components/Card/Card';
import RightColumns from '../../components/RightColumns/RightColumns';
import { userInfo, menuCardMap } from '../../components/constant';
import Chat from '../../components/Chat/Chat';

const Home: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('采矿');
  const [activeSubMenu, setActiveSubMenu] = useState('镐子');
  const [allParentKeys, setAllParentKeys] = useState<string[]>([]);
  const [cardList, setCardList] = useState<object[]>(menuCardMap['采矿'].cardList);
  useEffect(() => {});
  const handleCardClick = (info: object) => {
    console.log('开采', info);
  };
  const handleMenuClick = (title: string) => {
    console.log('点击菜单', title);
    setActiveMenu(title);
    setAllParentKeys(menuCardMap[title].subMenu.map((item: any) => item.key));
    setCardList(menuCardMap[title].subMenu[0].children[0].cardList);
  };
  return (
    <div className="">
      <Navbar userInfo={userInfo} />
      <div className="flex justify-between">
        <LeftMenu onMenuClick={handleMenuClick} />
        <div className="p-[20px] flex-1 relative">
          {/* 主内容区域 */}
          {menuCardMap[activeMenu].subMenu ? (
            <div className="flex justify-between" style={{ height: 'calc(100vh - 360px)' }}>
              <Menu
                style={{ width: 220, height: '100%' }}
                theme="dark"
                autoOpen={true}
                defaultOpenKeys={allParentKeys}
                defaultSelectedKeys={['1-1']}
                onClickMenuItem={key => {
                  menuCardMap[activeMenu].subMenu.forEach(parent => {
                    parent.children.forEach(child => {
                      if (child.key === key) {
                        setActiveSubMenu(child.title);
                      }
                    });
                  });
                }}>
                {menuCardMap[activeMenu].subMenu.map((item: any) => (
                  <Menu.SubMenu
                    key={item.key}
                    title={
                      <span>
                        {item.icon}
                        {item.title}
                      </span>
                    }>
                    {item.children?.map((sub: any) => (
                      <Menu.Item key={sub.key}>{sub.title}</Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ))}
              </Menu>
              <div
                className="flex-1 overflow-y-scroll grid justify-center gap-[20px] hide-scrollbar"
                style={{ maxHeight: 'calc(100vh - 360px)', gridTemplateColumns: 'repeat(auto-fit, 300px)' }}>
                {cardList.map(item => (
                  <Card info={item} type={activeSubMenu} onCardClick={handleCardClick} />
                ))}
              </div>
            </div>
          ) : (
            <>
              <div
                className="grid justify-center gap-[20px]"
                style={{ maxHeight: 'calc(100vh - 360px)', gridTemplateColumns: 'repeat(auto-fit, 300px)' }}>
                {cardList.map(item => (
                  <Card info={item} type={activeMenu} onCardClick={handleCardClick} />
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
