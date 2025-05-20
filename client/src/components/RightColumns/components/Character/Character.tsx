import React, { useState, useEffect } from 'react';
import { state } from '../../../../store';
const Character: React.FC = () => {
  const info = state.userInfo;
  useEffect(() => {});
  return (
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
  );
};
export default Character;
