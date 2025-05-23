import React, { useState, useEffect, useRef } from 'react';
import { Menu, Spin } from '@arco-design/web-react';
import Navbar from '../../components/Navbar/Navbar';
import LeftMenu from '../../components/LeftMenu/LeftMenu';
import Card from '../../components/Card/Card';
import RightColumns from '../../components/RightColumns/RightColumns';
import { menuCardMap } from '../../constants/constant';
import Chat from '../../components/Chat/Chat';
import WelcomeBackPopup from '../../components/Popup/WelcomeBackPopup';
import WorkPopup from '../../components/Popup/WorkPopup';
import Fight from '../../components/Fight/Fight';
import { state, setUserInfo } from '../../store';
import { getCharacterDetail } from '../../api/index';
import { useSignalRContext } from '../../context/signalRContext';
import { LifeSkillDescriptions } from '../../enums/LifeSkillDescriptions';

const Home: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('Mining');
  const [allParentKeys, setAllParentKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [cardList, setCardList] = useState<object[]>(menuCardMap['Mining'].cardList);
  const [loading, setLoading] = useState(true);
  const [showWelcomeBackPopup, setShowWelcomeBackPopup] = useState(false);
  const [showWorkPopup, setShowWorkPopup] = useState(false);
  const [itemInfo, setItemInfo] = useState({});
  const [showFight, setShowFight] = useState(false);
  const [fightInfo, setFightInfo] = useState({});
  const { start } = useSignalRContext();
  const userInfo = state.userInfo;
  useEffect(() => {
    const characterId = localStorage.getItem('characterId');
    console.log('首页', userInfo, characterId);
    getCharacterDetailFunc(characterId);
    // setShowWelcomeBackPopup(true);
  }, []);
  const getCharacterDetailFunc = async (id: any) => {
    const res = await getCharacterDetail(id);
    if (res) {
      setUserInfo(res.data);
      start(id);
      setLoading(false);
    }
  };
  const handleCardClick = (info: any) => {
    console.log('点击卡片', info);
    if (info.attr === 'fight') {
      setShowFight(true);
      setFightInfo(info);
    } else {
      setShowFight(false);
      setShowWorkPopup(true);
      const skillInfo=userInfo.lifeSkills.filter(item => LifeSkillDescriptions[item.skillType].code === info.attr)[0]
      setItemInfo({ ...info, currentLevel:skillInfo.level,type:LifeSkillDescriptions[skillInfo.skillType].name });
    }
  };
  const handlePopupClick = (status: boolean) => {
    setShowWorkPopup(status);
  };
  const handleMenuClick = (attr: string) => {
    console.log('点击菜单', attr);
    if (attr !== 'fight') {
      setShowFight(false);
    }
    setActiveMenu(attr);
    if (menuCardMap[attr].subMenu) {
      setAllParentKeys(menuCardMap[attr].subMenu.map((item: any) => item.key));
      if (menuCardMap[attr].subMenu[0].children) {
        setCardList(menuCardMap[attr].subMenu[0].children[0].cardList);
        setSelectedKeys(menuCardMap[attr].subMenu[0].children[0].key);
      } else {
        setSelectedKeys(menuCardMap[attr].subMenu[0].key);
        setCardList(menuCardMap[attr].subMenu[0].cardList);
      }
    } else {
      setCardList(menuCardMap[attr].cardList);
    }
  };
  return (
    <Spin dot loading={loading} style={{ display: 'block' }}>
      <div className="h-[100vh]">
        {userInfo.id && (
          <>
            <Navbar />
            <div className="flex justify-between">
              <LeftMenu onMenuClick={handleMenuClick} />
              <div className="p-[20px_0] flex-1 relative">
                {/* 主内容区域 */}

                {showFight ? (
                  <>
                    {/* 战斗页面 */}
                    <Fight info={fightInfo} />
                  </>
                ) : menuCardMap[activeMenu].subMenu ? (
                  <div className="flex justify-between" style={{ height: 'calc(100vh - 380px)' }}>
                    <Menu
                      style={{ width: 220, height: '100%' }}
                      theme="dark"
                      autoOpen={true}
                      defaultOpenKeys={allParentKeys}
                      selectedKeys={selectedKeys}
                      onClickMenuItem={key => {
                        setSelectedKeys(key);
                        menuCardMap[activeMenu].subMenu.forEach(parent => {
                          if (parent.children) {
                            parent.children.forEach(child => {
                              if (child.key === key) {
                                setCardList(child.cardList);
                              }
                            });
                          } else {
                            setCardList(parent.cardList);
                          }
                        });
                      }}>
                      {menuCardMap[activeMenu].subMenu.map((item: any) => {
                        // 如果没有 children，则渲染为一级菜单
                        if (!item.children) {
                          return <Menu.Item key={item.key}>{item.title}</Menu.Item>;
                        }

                        // 否则渲染为二级菜单
                        return (
                          <Menu.SubMenu key={item.key} title={item.title}>
                            {item.children?.map((sub: any) => (
                              <Menu.Item key={sub.key}>{sub.title}</Menu.Item>
                            ))}
                          </Menu.SubMenu>
                        );
                      })}
                    </Menu>
                    <div
                      className="p-[20px] flex-1 overflow-y-scroll grid justify-center gap-[20px] hide-scrollbar"
                      style={{
                        maxHeight: 'calc(100vh - 380px)',
                        gridTemplateColumns: 'repeat(auto-fit, 245px)',
                        gridAutoRows: 'min-content',
                        justifyContent: cardList.length > 2 ? 'center' : 'left',
                      }}>
                      {cardList.map(item => (
                        <Card info={item} width={245} onCardClick={handleCardClick} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className="grid justify-center gap-[20px] hide-scrollbar overflow-y-scroll"
                      style={{ maxHeight: 'calc(100vh - 380px)', gridTemplateColumns: 'repeat(auto-fit, 300px)', gridAutoRows: 'min-content' }}>
                      {cardList.map(item => (
                        <Card info={item} width={300} onCardClick={handleCardClick} />
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
          </>
        )}
        <WelcomeBackPopup show={showWelcomeBackPopup} />
        <WorkPopup show={showWorkPopup} info={itemInfo} onPopupClick={handlePopupClick} />
      </div>
    </Spin>
  );
};

export default Home;
