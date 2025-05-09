import React, { useState, useEffect } from 'react';
import { state } from '../../store';
const Card: React.FC = (props: { info: any; onCardClick: Function }) => {
  const { info, onCardClick = () => {} } = props;
  const [status, setStatus] = useState('1');
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
    console.log('卡片信息', info);
    const currentLevel = state.userInfo[info.attr].level;

  useEffect(() => {
    console.log('卡片信息', info);
    if (currentLevel < info.level) {
      setStatus('1');
    } else if (currentLevel >= info.level) {
      setStatus('2');
    }
  }, [info]);
  return (
    <div
      className="flex justify-between w-[300px] h-[104px] bg-[var(--main-bg-color)] border-[1px] border-solid border-[var(--card-border-color)] rounded-[10px] p-[20px]"
      style={{ backgroundColor: statusMap[status].bgColor }}
      onClick={() => {
        if (status === '2') {
          onCardClick(info);
        }
      }}>
      <div>{info.name}</div>
      <div>
        <div className="mb-[20px]">Lv.{info.level<10?'0':''}{info.level}</div>
        {/* 假设 status 1:等级不足，2立即开采，3开采中 */}
        <div style={{ color: statusMap[status].color }}>{statusMap[status].text}</div>
      </div>
    </div>
  );
};
export default Card;
