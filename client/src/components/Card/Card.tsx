import React, { useState, useEffect } from 'react';
const Card: React.FC = (props: { status: string; info: object; type: string; onCardClick: Function }) => {
  const { status = '1', info, type, onCardClick = () => {} } = props;
  //假设 status 1:等级不足，2立即开采，3开采中
  const statusMap: any = {
    '1': {
      bgColor: 'var(--main-bg-color)',
      color: 'var(--sub-font-color)',
      text: '等级不足',
    },
    '2': {
      bgColor: 'var(--main-bg-color)',
      color: 'var(--main-font-color)',
      text: '立即开采',
    },
    '3': {
      bgColor: 'var(--hover-color)',
      color: 'var(--active-color)',
      text: '开采中',
    },
  };
  useEffect(() => {});
  return (
    <div
      className="flex justify-between w-[300px] h-[104px] bg-[var(--main-bg-color)] border-[1px] border-solid border-[var(--card-border-color)] rounded-[10px] p-[20px]"
      style={{ backgroundColor: statusMap[status].bgColor }}
      onClick={() => {
        if (status === '2') {
          onCardClick(info);
        }
      }}>
      <div>
        {info.name}
        {type === '采矿' ? '矿石' : type}
      </div>
      <div>
        <div className="mb-[20px]">{info.level}</div>
        {/* 假设 status 1:等级不足，2立即开采，3开采中 */}
        <div style={{ color: statusMap[status].color }}>{statusMap[status].text}</div>
      </div>
    </div>
  );
};
export default Card;
