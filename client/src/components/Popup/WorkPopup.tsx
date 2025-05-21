import React, { useState, useEffect } from 'react';
import { Button, Modal } from '@arco-design/web-react';
import { LifeSkillDescriptions } from '/src/enums/LifeSkillDescriptions';
const Popup: React.FC = (props: { show: boolean; info: object; onPopupClick: Function }) => {
  const { show, info, onPopupClick = () => {} } = props;
  const [visible, setVisible] = React.useState(false);
  useEffect(() => {
    console.log('弹窗', info);
    setVisible(show);
  }, [show]);

  return (
    <div>
      <Modal
      style={{width:'fit-content'}}
        title=""
        visible={visible}
        afterClose={() => {
          console.log('关闭弹窗');
        }}
        autoFocus={false}
        focusLock={true}
        closable={false}
        onCancel={() => onPopupClick(false)}
        footer={null}>
        <div className="text-center text-[16px] text-[var(--sub-font-color)]  hide-scrollbar">
          <div className="text-[20px] mb-[10px]">{info.name}</div>
          <div className="m-[10px]">品类</div>
          <div className="m-[10px] flex items-center">
            <div className="w-[48px]">等级：</div>
            <div className="text-[var(--main-font-color)]">
              Lv.{info.level < 10 ? '0' : ''}
              {info.level}
            </div>
          </div>
          <div className="m-[10px] flex items-center">
            <div className="w-[48px]">经验：</div>
            <div className="text-[var(--main-font-color)]">1 EXP</div>
          </div>
          {info.type==='锻造'&&(
            <div className="m-[10px] flex items-center">
            <div className="w-[48px]">消耗：</div>
            <div className="text-[var(--main-font-color)]">
                <div className="mb-[10px]">灰败矿石*1，</div>
            </div>
          </div>
          )}
          <div className="m-[10px] flex">
            <div className="w-[48px]">产出：</div>
            <div className="text-[var(--main-font-color)]">
                <div className="mb-[10px]">灰败矿石*1，</div>
                <div className="mb-[10px]">灰败矿石*1，</div>
                <div className="">灰败矿石*1</div>
            </div>
          </div>
          <div className="m-[10px] flex items-center">
            <div className="w-[48px]">时间：</div>
            <div className="text-[var(--main-font-color)]">10 S</div>
          </div>
         {/* 锻造有个材料不足的情况，结合消耗和背包材料数量判断 */}
          <div className="mt-[20px]" style={{color:info.currentLevel >= info.level ?'var(--active-color)':'var(--sub-font-color)'}}>{info.currentLevel >= info.level ? `立即${info.type}`: '等级不足'}</div>
        </div>
      </Modal>
    </div>
  );
};
export default Popup;
