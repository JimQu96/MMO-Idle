import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Menu } from '@arco-design/web-react';
const EquipmentBox: React.FC = (props: { style: object; type:string, info: object; onBoxClick: Function }) => {
  const { style, type, info, onBoxClick = () => {} } = props;
  const [clickItem, setClickItem] = useState(false);
  useEffect(() => {});
  const content = (
    <Menu
      theme="dark"
      style={{ width: 150 }}
      onClickMenuItem={key => {
        console.log(key);
        onBoxClick({ ...info, type: 'put-off' });
      }}>
      {clickItem ? (
        <Menu.Item key="1" style={{ color: 'var(--main-font-color)' }}>
          {type === 'backpack' ? '装备' : '卸下'}
        </Menu.Item>
      ) : (
        <div className="p-[12px] text-[var(--main-font-color)]">
          <div className="mb-[4px]">{info.owned}</div>
          <div className="mb-[4px]">彩虹</div>
          <div className="mb-[4px]">数量：1</div>
          <div className="mb-[4px]">部位：头部</div>
          <div className="mb-[4px]">类型：板甲</div>
          <div className="mb-[4px]">+2000血量</div>
          <div className="mb-[4px]">+100护甲</div>
          <div className="mb-[4px]">+20魔抗</div>
          <div>卖价：8000</div>
        </div>
      )}
    </Menu>
  );

  return (
    <>
      <Dropdown
        position="bl"
        trigger="hover"
        droplist={type === 'backpack' || (info.owned && type === 'equipments') ? content : ''}
        onVisibleChange={(visible: boolean) => {
          if (visible) {
            setClickItem(false);
          }
        }}>
        <div
          className="relative flex shrink-0 justify-center text-center items-center w-[64px] h-[64px] border-[1px] border-solid border-[var(--third-font-color)] rounded-[2px]"
          style={{
            ...style,
            borderStyle: info.owned || info.count ? 'solid' : 'dashed',
            color: info.owned || info.count ? info.color : 'var(--third-font-color)',
            borderColor: info.owned || info.count ? info.color : 'var(--third-font-color)',
          }}
          onClick={() => {
            console.log('click');
            setClickItem(true);
            onBoxClick({ ...info, type: 'click' });
          }}>
          <div>{info.owned || info.name}</div>
          {info.count && <div className="absolute right-[2px] bottom-0 text-[12px]">{info.count}</div>}
        </div>
      </Dropdown>
    </>
  );
};
export default EquipmentBox;
