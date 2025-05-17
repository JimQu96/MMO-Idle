import { Menu, Progress } from '@arco-design/web-react';
import style from './index.module.css';
import mineIcon from '../../assets/mine.svg';
import forgeIcon from '../../assets/forge.svg';
import dungeonscon from '../../assets/dungeons.svg';
import { state } from '../../store';
import { classMap } from '../../constants/constant';
import { LifeSkillTypeEnum } from '../../enums/LifeSkillTypeEnum';

interface MenuItem {
  key: LifeSkillTypeEnum;
  title: string;
  image: string; // 图片路径或URL
  attr: string;
  disabled: boolean;
}

const LeftMenu: React.FC = (props: { onMenuClick: Function }) => {
  const { onMenuClick = () => {} } = props;
  const menuItems: MenuItem[] = [
    {
      key: LifeSkillTypeEnum.Mining,
      title: state.userInfo.name,
      image: '',
      attr: 'disable',
      disabled: true,
    },
    {
      key: '2',
      title: `${classMap[state.userInfo.class]}Lv.${state.userInfo.level}`,
      image: mineIcon,
      disabled: true,
      attr: 'mine',
    },
    {
      key: '3',
      title: '生活技能',
      image: '',
      attr: 'disable',
      disabled: true,
    },
    {
      key: '4',
      title: `采矿Lv.${state.userInfo.mine?.level < 10 ? '0' : ''}${state.userInfo.mine?.level}`,
      image: mineIcon,
      attr: 'mine',
      disabled: false,
    },
    {
      key: '5',
      title: `锻造Lv.${state.userInfo.forge?.level < 10 ? '0' : ''}${state.userInfo.forge?.level}`,
      image: forgeIcon,
      attr: 'forge',
      disabled: false,
    },
    {
      key: '6',
      title: '副本',
      image: '',
      attr: 'disable',
      disabled: true,
    },
    {
      key: '7',
      title: '地下城',
      image: dungeonscon,
      attr: 'fight',
      disabled: false,
    },
  ];
  const allParentKeys = menuItems.map(item => item.key);
  const CustomMenuItem = ({ attr, title, image }: MenuItem) => (
    <div
      onClick={() => {
        if (attr !== 'disable') {
          onMenuClick(attr);
        }
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {image && (
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
        )}
        <span style={{ color: attr === 'disable' ? 'var(--sub-font-color)' : 'var(--main-font-color)' }}>{title}</span>
      </div>
      {attr !== 'disable' && (
        <div className="relative w-full h-[6px] bg-[var(--third-font-color)] rounded-b-[2px] mb-[10px]">
          <div className='absolute h-full top-0 left-0 w-[30px] bg-[var(--active-color)]'></div>
        </div>
      )}
    </div>
  );
  return (
    <div className={style.leftMenu}>
      <Menu style={{ height: '100%' }} theme="dark" autoOpen={true} defaultOpenKeys={allParentKeys} defaultSelectedKeys={['4']}>
        {menuItems.map(item => (
          <Menu.Item key={item.key} disabled={item.disabled} style={{cursor:item.disabled?'auto':'pointer'}}>
            <CustomMenuItem {...item} />
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default LeftMenu;
