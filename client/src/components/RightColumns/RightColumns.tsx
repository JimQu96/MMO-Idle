import React, { useState, useEffect } from 'react';
import { Tabs } from '@arco-design/web-react';
import { state } from '../../store';
import BackPack from './components/Backpack/Backpack';
import Character from './components/Character/Character';
import Equipments from './components/Equipments/Equipments';
import Skills from './components/Skills/Skills';

const TabPane = Tabs.TabPane;
const Card: React.FC = () => {
  const info = state.userInfo
  const [activeTab, setActiveTab] = useState('0');
  
  const tabItems = [
    {
      title: `装备`,
      key: `0`,
      content: (
        <Equipments />
      ),
    },
    {
      title: `背包`,
      key: `1`,
      content: (
        <BackPack />
      ),
    },
    {
      title: `技能`,
      key: `2`,
      content: (
       <Skills />
      ),
    },
    {
      title: `属性`,
      key: `3`,
      content: (
       <Character />
      ),
    },
  ];
  useEffect(() => {
   
  });
  return (
    <div className="w-[400px] p-[20px_4px] shrink-0  border-[0px_0px_0px_1px] border-solid border-[var(--hover-color)]">
      <Tabs activeTab={activeTab} onChange={setActiveTab}>
        {tabItems.map((item, index) => (
          <TabPane style={{ padding: '0 16px' }} destroyOnHide key={item.key} title={item.title}>
            {item.content}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};
export default Card;
