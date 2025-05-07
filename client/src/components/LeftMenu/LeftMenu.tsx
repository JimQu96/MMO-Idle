import { Menu } from '@arco-design/web-react';
import style from './index.module.css';
import mineIcon from '../../assets/mine.svg';
import forgeIcon from '../../assets/forge.svg';
import dungeonscon from '../../assets/dungeons.svg';

interface MenuItem {
  key: string;
  title: string;
  icon?: React.ReactNode;
  children?: SubMenuItem[];
}

interface SubMenuItem {
  key: string;
  title: string;
  image: string; // 图片路径或URL
}

const LeftMenu: React.FC = (props:{onMenuClick: Function}) => {
  const { onMenuClick = () => {} } = props;
  const menuItems: MenuItem[] = [
    {
      key: '1',
      title: '生活技能',
      children: [
        {
          key: '1-1',
          title: '采矿',
          image: mineIcon,
        },
        {
          key: '1-2',
          title: '锻造',
          image: forgeIcon,
        },
      ],
    },
    {
      key: '2',
      title: '副本',
      children: [
        {
          key: '2-1',
          title: '地下城',
          image: dungeonscon,
        },
      ],
    },
  ];
  const allParentKeys = menuItems.map(item => item.key);
  const CustomMenuItem = ({ title, image }: SubMenuItem) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} onClick={()=>{
      onMenuClick(title)
    }}>
      <img
        src={image}
        alt={title}
        style={{
          width: 22,
          height: 22,
          borderRadius: 4,
          objectFit: 'cover',
        }}
      />
      <span>{title}</span>
    </div>
  );
  return (
    <div className={style.leftMenu}>
      <Menu
        style={{ height: '100%' }}
        theme="dark"
        autoOpen={true}
        defaultOpenKeys={allParentKeys}
        defaultSelectedKeys={['0_1']}>
        {menuItems.map(item => (
          <Menu.SubMenu
            key={item.key}
            title={
              <span>
                {item.icon}
                {item.title}
              </span>
            }>
            {item.children?.map(sub => (
              <Menu.Item key={sub.key}>
                <CustomMenuItem {...sub} />
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ))}
      </Menu>
    </div>
  );
};

export default LeftMenu;
