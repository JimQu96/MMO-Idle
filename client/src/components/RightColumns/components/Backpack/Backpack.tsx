import React, { useState, useEffect, useRef } from 'react';
import { state } from '../../../../store';
import EquipmentBox from '../../../EquipmentBox/EquipmentBox';

interface EquipmentSlotInfo {
  slot: EquipmentSlotEnum;
  itemId?: number;
}
const Backpack: React.FC = () => {
  const backpacks = state.userInfo.backpacks
 

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
  ];
  const equipmentList = [
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
  useEffect(() => {});
  return (
    <div>
      <div>材料</div>
          <div className="flex flex-wrap gap-[10px] mt-[10px]">
            {materialList.map((item, index) => {
              return <EquipmentBox type={'backpack'} info={item} key={index} onBoxClick={handleBoxClick}></EquipmentBox>;
            })}
          </div>
          <div className="mt-[10px]">装备</div>
          <div className="flex flex-wrap gap-[10px] mt-[10px]">
            {equipmentList.map((item, index) => {
              return <EquipmentBox type={'backpack'} info={item} key={index} onBoxClick={handleBoxClick}></EquipmentBox>;
            })}
          </div>
    </div>
  );
};
export default Backpack;
