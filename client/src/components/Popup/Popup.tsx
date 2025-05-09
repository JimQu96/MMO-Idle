import React, { useState, useEffect } from 'react';
import { Button, Modal } from '@arco-design/web-react';
const Popup: React.FC = (props: { show: boolean; info: object; onBoxClick: Function }) => {
  const { show, info, onBoxClick = () => {} } = props;
  const [visible, setVisible] = React.useState(false);
  useEffect(() => {
    setVisible(show);
  },[show]);

  return (
    <div>
   <Modal
        title=''
        visible={visible}
        afterClose={() => {
          console.log('关闭弹窗')
        }}
        autoFocus={false}
        focusLock={true}
        closable={false}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <div className='text-center text-[16px] text-[var(--main-font-color)] h-[234px] hide-scrollbar'>
        <div className='text-[24px] m-[10px]'>欢迎回来</div>
        <div className='text-[14px] m-[10px] text-[var(--sub-font-color)]'>离线时间：</div>
        <div className=' m-[10px]'>离线收益：</div>
        <div className=' m-[10px] text-[var(--sub-font-color)]'>经验值：<span>5000</span></div>
        <div className=' m-[10px]'>矿石：<span>2000</span></div>
        <div className=' m-[10px]'>矿石：<span>2000</span></div>
        <div className=' m-[10px]'>矿石：<span>2000</span></div>
        </div>
      </Modal>
    </div>
  );
};
export default Popup;
