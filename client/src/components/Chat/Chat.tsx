import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Input } from '@arco-design/web-react';
const TabPane = Tabs.TabPane;
const Chat: React.FC = () => {
  const [activeTab, setActiveTab] = useState('0');
  const tabItems = [
    {
      title: `世界`,
      key: `0`,
      content: (
        <div className="w-full h-[170px]">
          <div className="flex">
            <div className="text-[var(--sub-font-color)] shrink-0 mr-[4px]">[11:00:00]</div>
            <div>这里是要说的话...这里是要说的话...这里是要说的话...这里是要说的话...这里是要说的话...这里是要说的话...</div>
          </div>
        </div>
      ),
    },
    {
      title: `队伍`,
      key: `1`,
      content: <div></div>,
    },
  ];
  useEffect(() => {});
  return (
    <div className="w-full h-[300px] p-[12px_4px] absolute bottom-0 border-[1px_0px_0px_0px] border-solid border-[var(--hover-color)]">
      <Tabs activeTab={activeTab} onChange={setActiveTab}>
        {tabItems.map((item, index) => (
          <TabPane style={{ padding: '0 16px' }} destroyOnHide key={item.key} title={item.title}>
            {item.content}
          </TabPane>
        ))}
      </Tabs>
      <div className='w-full h-[40px] p-[0_16px]'>
        {/* 输入框 */}
        <Input className=" h-full" placeholder="聊天系统开发中，敬请期待" />
      </div>
    </div>
  );
};
export default Chat;
