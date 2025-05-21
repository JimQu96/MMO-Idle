import React, { useState, useEffect } from 'react';
import { state } from '../../store';
const Card: React.FC = (props: { info: any; width: any; onCardClick: Function }) => {
  const { info, width, onCardClick = () => {} } = props;
  const [status, setStatus] = useState('1');
  const textMap: any = {
    Mining: '开采',
    Blacksmithing: '制作',
    fight: '战斗',
  };
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
      text: `立即${textMap[info.attr]}`,
    },
    '3': {
      bgColor: 'var(--hover-color)',
      color: 'var(--active-color)',
      text: `${textMap[info.attr]}中`,
    },
  };
  const { lifeSkills } = state.userInfo;
  const currentLevel = lifeSkills.find(item => item.skillType === info.attr)?.level;

  useEffect(() => {
    // console.log('卡片信息', info);
    if (currentLevel < info.level) {
      setStatus('1');
    } else if (currentLevel >= info.level) {
      setStatus('2');
    }
  }, [info]);
  return (
    <div
      className="flex justify-between h-[104px] bg-[var(--main-bg-color)] border-[1px] border-solid border-[var(--card-border-color)] rounded-[10px] p-[20px]"
      style={{ backgroundColor: statusMap[status].bgColor, width: width }}
      onClick={() => {
        onCardClick(info);
      }}>
      <div style={{ color: info.color }}>{info.name}</div>
      <div>
        <div className="mb-[20px]">
          Lv.{info.level < 10 ? '0' : ''}
          {info.level}
        </div>
        {/* 假设 status 1:等级不足，2立即开采，3开采中 */}
        <div style={{ color: statusMap[status].color }}>{statusMap[status].text}</div>
      </div>
    </div>
  );
};
export default Card;
