import { Menu } from '@arco-design/web-react';
import style from './index.module.css';
import { IconApps, IconBug } from '@arco-design/web-react/icon';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const LeftMenu: React.FC = () => {
  return (
    <div className={style.leftMenu}>
      <Menu
        hasCollapseButton
        defaultOpenKeys={['0']}
        defaultSelectedKeys={['0_1']}
      >
        <SubMenu
          key='0'
          title={
            <>
              <IconApps /> Navigation 1
            </>
          }
        >
          <MenuItem key='0_0'>Menu 1</MenuItem>
          <MenuItem key='0_1'>Menu 2</MenuItem>
        </SubMenu>
        <SubMenu
          key='1'
          title={
            <>
              <IconBug /> Navigation 2
            </>
          }
        >
          <MenuItem key='1_0'>Menu 1</MenuItem>
          <MenuItem key='1_1'>Menu 2</MenuItem>
          <MenuItem key='1_2'>Menu 3</MenuItem>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default LeftMenu;
