import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import LeftMenu from '../../components/LeftMenu/LeftMenu';
import Card from '../../components/Card/Card';
import RightColumns from '../../components/RightColumns/RightColumns';
import { mineList } from '../../components/constant';
import Chat from '../../components/Chat/Chat';

const Home: React.FC = () => {
  useEffect(() => {});
  return (
    <div className="">
      <Navbar />
      <div className="flex justify-between">
        <LeftMenu />
        <div className="p-[20px] flex-1 relative">
          {/* 主内容区域 */}
          <div className="flex flex-wrap gap-20">
            {mineList.map(item => (
              <Card info={item} />
            ))}
          </div>
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
