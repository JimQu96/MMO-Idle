import React, { useState, useEffect } from 'react';
import { state } from '../../../../store';
import { EquipmentSlotEnum } from '../../../../enums/EquipmentSlotEnum';
import EquipmentBox from '../../../EquipmentBox/EquipmentBox';
interface EquipmentSlotInfo {
  slot: EquipmentSlotEnum;
  itemId?: number;
}
const Equipments: React.FC = () => {
  const info = state.userInfo;
  useEffect(() => {
     const equipmentSlotList: EquipmentSlotInfo[] = [];
    for (const key in EquipmentSlotEnum) {
      equipmentSlotList.push({
        slot: Number(key),
        itemId: info.equipments.find(item => item.slot === Number(key))?.itemId,
      });
    }
    console.log(333,equipmentSlotList)
  },[]);
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
  const handleBoxClick = (info: any) => {
    console.log(info);
  };
  return (
    <div>
      <div className="flex justify-between">
        {/* 身体 */}
        <div>
          <EquipmentBox info={bodyList[0]} key={0} style={{ margin: '10px 74px' }} onBoxClick={handleBoxClick}></EquipmentBox>
          <div className="flex flex-wrap justify-between w-[212px] gap-[10px]">
            {bodyList.map((item, index) => {
              if (index !== 0 && index !== bodyList.length - 1) {
                return <EquipmentBox type={'equipments'} info={item} key={index} onBoxClick={handleBoxClick}></EquipmentBox>;
              }
            })}
          </div>
          <EquipmentBox info={bodyList[bodyList.length - 1]} key={bodyList.length - 1} style={{ margin: '10px 74px' }} onBoxClick={handleBoxClick}></EquipmentBox>
        </div>
        {/* 饰品 */}
        <div>
          {accessoryList.map((item, index) => {
            return <EquipmentBox type={'equipments'} info={item} key={index} style={{ margin: '10px 0' }} onBoxClick={handleBoxClick}></EquipmentBox>;
          })}
        </div>
      </div>
      {/* 工具 */}
      <div className="flex flex-wrap gap-[10px] mt-[10px]">
        {toolList.map((item, index) => {
          return <EquipmentBox type={'equipments'} info={item} key={index} onBoxClick={handleBoxClick}></EquipmentBox>;
        })}
      </div>
    </div>
  );
};
export default Equipments;
