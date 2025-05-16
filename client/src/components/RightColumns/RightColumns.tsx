import React, { useState, useEffect, useRef } from 'react';
import { Button, Tabs } from '@arco-design/web-react';
import { state } from '../../store';
import Box from '../Box/Box';
const TabPane = Tabs.TabPane;
const Card: React.FC = () => {
  const info=state.userInfo
  const [activeTab, setActiveTab] = useState('0');
  //身体
  const bodyList = [
    {
      name: '头部',
      owned: '',
      color: '',
    },
    {
      name: '肩部',
      owned: '',
      color: '',
    },
    {
      name: '胸部',
      owned: '',
      color: '',
    },
    {
      name: '背部',
      owned: '',
      color: '',
    },
    {
      name: '腕部',
      owned: '',
      color: '',
    },
    {
      name: '腰部',
      owned: '翠绿板甲腰带',
      color: 'green',
    },
    {
      name: '手部',
      owned: '',
      color: '',
    },
    {
      name: '主手',
      owned: '',
      color: '',
    },
    {
      name: '腿部',
      owned: '',
      color: '',
    },
    {
      name: '副手',
      owned: '',
      color: '',
    },
    {
      name: '脚部',
      owned: '',
      color: '',
    },
  ];
  //饰品
  const accessoryList = [
    {
      name: '项链',
      owned: '魅力项链',
      color: '',
    },
    {
      name: '戒指',
      owned: '',
      color: '',
    },
    {
      name: '戒指',
      owned: '',
      color: '',
    },
    {
      name: '饰品',
      owned: '',
      color: '',
    },
    {
      name: '饰品',
      owned: '',
      color: '',
    },
  ];

  //工具
  const toolList = [
    {
      name: '镐子',
      owned: '灰色稿子',
      color: '#999',
    },
    {
      name: '小刀',
      owned: '',
      color: '',
    },
    {
      name: '镰刀',
      owned: '',
    },
    {
      name: '鱼竿',
      owned: '',
      color: '',
    },
    {
      name: '锄头',
      owned: '',
    },
    {
      name: '锤子',
      owned: '绯红锤子',
      color: 'red',
    },
    {
      name: '凿子',
      owned: '',
      color: '',
    },
    {
      name: '针线',
      owned: '',
      color: '',
    },
    {
      name: '铲子',
      owned: '',
      color: '',
    },
    {
      name: '锅具',
      owned: '',
      color: '',
    },
  ];

  //背包里分为材料，装备
  const materialList = [
    {
      name: '灰色矿石',
      color: '#999',
      count: 100,
      type: '材料',
    },
    {
      name: '翠绿矿石',
      color: '#00B42A',
      count: 100,
      type: '材料',
    },
    {
      name: '蔚蓝矿石',
      color: '#165DFF',
      count: 100,
      type: '材料',
    },
    {
      name: '绯红矿石',
      color: '#F53F3F',
      count: 100,
      type: '材料',
    },
    {
      name: '粉甜矿石',
      color: '#F5319D',
      count: 100,
      type: '材料',
    },
    {
      name: '彩虹矿石',
      color: 'linear-gradient(270deg, #61258F 0%, #284D9C 15%, #2BA2A7 29%, #2FB562 48%, #C5AF33 67%, #D07635 81%, #F53F3F 99%)',
      count: 100,
      type: '材料',
    },
  ];
  const equipmentList = [
    {
      name: '彩虹板甲头盔',
      color: 'linear-gradient(270deg, #61258F 0%, #284D9C 15%, #2BA2A7 29%, #2FB562 48%, #C5AF33 67%, #D07635 81%, #F53F3F 99%)',
      count: 100,
      type: '装备',
    },
    {
      name: '魅力项链',
      color: '#00B42A',
      count: 100,
      type: '装备',
    },
  ];
  const handleBoxClick = (info: any) => {
    console.log(info);
  };
  const tabItems = [
    {
      title: `装备`,
      key: `0`,
      content: (
        <div>
          <div className="flex justify-between">
            {/* 身体 */}
            <div>
              <Box info={bodyList[0]} key={0} style={{ margin: '10px 74px' }} onBoxClick={handleBoxClick}></Box>
              <div className="flex flex-wrap justify-between w-[212px] gap-[10px]">
                {bodyList.map((item, index) => {
                  if (index !== 0 && index !== bodyList.length - 1) {
                    return <Box info={item} key={index} onBoxClick={handleBoxClick}></Box>;
                  }
                })}
              </div>
              <Box info={bodyList[bodyList.length - 1]} key={bodyList.length - 1} style={{ margin: '10px 74px' }} onBoxClick={handleBoxClick}></Box>
            </div>
            {/* 饰品 */}
            <div>
              {accessoryList.map((item, index) => {
                return <Box info={item} key={index} style={{ margin: '10px 0' }} onBoxClick={handleBoxClick}></Box>;
              })}
            </div>
          </div>
          {/* 工具 */}
          <div className="flex flex-wrap gap-[10px] mt-[10px]">
            {toolList.map((item, index) => {
              return <Box info={item} key={index} onBoxClick={handleBoxClick}></Box>;
            })}
          </div>
        </div>
      ),
    },
    {
      title: `背包`,
      key: `1`,
      content: (
        <>
          <div>材料</div>
          <div className="flex flex-wrap gap-[10px] mt-[10px]">
            {materialList.map((item, index) => {
              return <Box info={item} key={index} onBoxClick={handleBoxClick}></Box>;
            })}
          </div>
          <div className="mt-[10px]">装备</div>
          <div className="flex flex-wrap gap-[10px] mt-[10px]">
            {equipmentList.map((item, index) => {
              return <Box info={item} key={index} onBoxClick={handleBoxClick}></Box>;
            })}
          </div>
        </>
      ),
    },
    {
      title: `技能`,
      key: `2`,
      content: (
        <div className="text-[16px]">
          <div className="mt-[10px] flex">
            <div className="text-[var(--sub-font-color)] shrink-0">被动技能：</div>
            <div>{info.skill.passiveSkills}</div>
          </div>
          <div className="mt-[10px] flex">
            <div className="text-[var(--sub-font-color)] shrink-0">次要技能：</div>
            <div>{info.skill.minorSkills}</div>
          </div>
          <div className="mt-[10px] flex">
            <div className="text-[var(--sub-font-color)] shrink-0">主要技能：</div>
            <div>{info.skill.keySkills}</div>
          </div>
        </div>
      ),
    },
    {
      title: `属性`,
      key: `3`,
      content: (
        <div className="text-[16px]">
          <div className="mt-[10px] flex">
            <div className="text-[var(--sub-font-color)] shrink-0">职责：</div>
            <div>{info.duty}</div>
          </div>
          <div className="mt-[10px] flex">
            <div className="text-[var(--sub-font-color)] shrink-0">伤害类型：</div>
            <div>物理</div>
          </div>
          <div className="mt-[10px] flex">
            <div className="text-[var(--sub-font-color)] shrink-0">主要属性：</div>
            <div>力量</div>
          </div>
          <div className="mt-[10px] flex">
            <div className="text-[var(--sub-font-color)] shrink-0">血量：</div>
            <div>5000</div>
          </div>
          <div className="mt-[10px] flex">
            <div className="text-[var(--sub-font-color)] shrink-0">护甲：</div>
            <div>5000</div>
          </div>
          <div className="mt-[10px] flex">
            <div className="text-[var(--sub-font-color)] shrink-0">魔抗：</div>
            <div>5000</div>
          </div>
          <div className="mt-[10px] flex">
            <div className="text-[var(--sub-font-color)] shrink-0">闪避：</div>
            <div>1%</div>
          </div>
        </div>
      ),
    },
  ];
  useEffect(() => {});
  return (
    <div className="w-[400px] p-[20px_4px] shrink-0  border-[0px_0px_0px_1px] border-solid border-[var(--hover-color)]">
      <Tabs activeTab={activeTab} onChange={setActiveTab}>
        {tabItems.map((item, index) => (
          <TabPane style={{padding: '0 16px'}} destroyOnHide key={item.key} title={item.title}>
            {item.content}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};
export default Card;
