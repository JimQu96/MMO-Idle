import { Menu } from '@arco-design/web-react';
import style from './index.module.css';
import { IconApps, IconBug } from '@arco-design/web-react/icon';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const LeftMenu: React.FC = () => {
  return (
    <div className={style.leftMenu}>
      <Menu
        style={{ height: '100%' }}
        theme="dark"
        autoOpen={true}
        // defaultOpenKeys={['0']}
        defaultSelectedKeys={['0_1']}>
        <SubMenu
          key="0"
          title={
            <>
              <IconApps /> 生活技能
            </>
          }>
          <MenuItem key="0_0">采矿</MenuItem>
          <MenuItem key="0_1">锻造</MenuItem>
        </SubMenu>
        <SubMenu
          key="1"
          title={
            <>
              <IconBug /> 副本
            </>
          }>
          <MenuItem key="1_0">地下堡</MenuItem>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default LeftMenu;
