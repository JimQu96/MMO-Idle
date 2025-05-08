import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Menu } from '@arco-design/web-react';
const Popup: React.FC = (props: { show: boolean; info: object; onBoxClick: Function }) => {
  const { show, info, onBoxClick = () => {} } = props;
  useEffect(() => {},[show]);

  return (
    <div>
    </div>
  );
};
export default Popup;
