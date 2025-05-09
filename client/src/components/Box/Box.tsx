import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Menu } from '@arco-design/web-react';
const Card: React.FC = (props: { style: object; info: object; onBoxClick: Function }) => {
  const { style, info, onBoxClick = () => {} } = props;
  useEffect(() => {});
  const content = (
    <Menu
      theme="dark"
      style={{ width: 100 }}
      onClickMenuItem={key => {
        console.log(key);
        onBoxClick({ ...info, type: 'put-off' });
      }}>
      <Menu.Item key="1" style={{ color: 'var(--main-font-color)' }}>
        {info.count && info.type === '装备' ? '装备' : '卸下'}
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown position="bl" trigger="click" droplist={info.owned || (info.count && info.type === '装备') ? content : ''}>
        <div
          className="relative flex shrink-0 justify-center text-center items-center w-[64px] h-[64px] border-[1px] border-solid border-[var(--third-font-color)] rounded-[2px]"
          style={{
            ...style,
            borderStyle: info.owned || info.count ? 'solid' : 'dashed',
            color: info.owned || info.count ? info.color : 'var(--third-font-color)',
            borderColor: info.owned || info.count ? info.color : 'var(--third-font-color)',
          }}
          onClick={() => {
            onBoxClick({ ...info, type: 'click' });
          }}>
          <div>{info.owned || info.name}</div>
          {info.count && <div className='absolute right-[2px] bottom-0 text-[12px]' style={{ color: 'var(--main-font-color)' }}>{info.count}</div>}
        </div>
      </Dropdown>
    </>
  );
};
export default Card;
