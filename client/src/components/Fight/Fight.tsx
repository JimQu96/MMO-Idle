import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import { state } from '../../store';
const Row = Grid.Row;
const Col = Grid.Col;
const Fight: React.FC = (props: { info: any; onBoxClick: Function }) => {
  const { info, onBoxClick = () => {} } = props;
  useEffect(() => {}, []);

  return (
    <div className="flex w-full">
      {/* 左侧 */}
      <div
        className="w-[500px] p-[20px] border-[0px_1px_0px_0px] border-solid border-[var(--hover-color)] hide-scrollbar"
        style={{ height: 'calc(100vh - 380px)' }}>
        <Button onClick={() => {}} style={{ marginRight: 10 }}>
          切换副本
        </Button>
        <Button onClick={() => {}}>立即停止</Button>
        <div className="flex justify-between mt-[20px]">
          <div>剃刀沼泽</div>
          <div>{info.name}</div>
        </div>
        <div className="mt-[20px] w-full pb-[10px] border-[0px_0px_1px_0px] border-solid border-[var(--hover-color)]">
          <div className="flex justify-between mt-[20px] pb-[10px] text-[var(--sub-font-color)] mb-[10px]">
            <div>职责</div>
            <div>职业</div>
            <div>等级</div>
            <div>ID</div>
          </div>
          <div className="flex justify-between">
            <div>坦克</div>
            <div>防御战士 </div>
            <div>Lv.{state.userInfo.level}</div>
            <div>{state.userInfo.name}</div>
          </div>
        </div>
        <div className="mt-[40px]">DPS统计</div>
        <div className="mt-[20px] w-full pb-[10px] border-[0px_0px_1px_0px] border-solid border-[var(--hover-color)]">
          <div className="flex justify-between mt-[20px] pb-[10px] text-[var(--sub-font-color)] mb-[10px]">
            <div>名次</div>
            <div>职业</div>
            <div>等级</div>
            <div>ID</div>
            <div>秒伤</div>
          </div>
          <div className="flex justify-between">
            <div>1</div>
            <div>防御战士 </div>
            <div>Lv.{state.userInfo.level}</div>
            <div>{state.userInfo.name}</div>
            <div>2000/s</div>
          </div>
        </div>
        <div className="mt-[40px] mb-[10px]">战斗播报</div>
        <div className="">
          <div>防御战士 MHN 对 BOSS 使用 盾牌猛击 造成了 10 伤害</div>
          <div>BOSS 对 防御战士 MHN 使用 尖刺攻击 造成了 20 伤害</div>
          <div>防御战士 MHN 对 BOSS 使用 盾牌猛击 落空了</div>
          <div>BOSS 对 防御战士 MHN 使用 尖刺攻击 落空了</div>
        </div>
      </div>
      {/* 右侧 */}
      <div className="flex-1 p-[20px] hide-scrollbar flex flex-col justify-between" style={{ height: 'calc(100vh - 380px)' }}>
        <Row className="grid-demo" gutter={[20, 20]}>
          {/* 怪 */}
          {info.monsterList.map((item, index) => (
            <Col span={8}>
              <div className="flex-1 border-[1px] border-solid border-[var(--main-font-color)] h-[100px] flex flex-col justify-between items-center pt-[30px]">
                <div>{item.name}</div>
                <div className="relative h-[20px] w-full bg-[var(--third-font-color)] text-center">
                  100/{item.blood}
                  <div className="absolute h-full top-0 left-0 w-[30%] bg-[var(--active-color)]"></div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div className="w-full flex justify-center m-[20px_0]">正在战斗中...</div>
        <Row className="grid-demo" gutter={[20, 20]}>
          {/* 队伍 */}
          {[1, 2, 1, 3, 1, 2].map((item, index) => (
            <Col span={8}>
              <div className="relative">
                {item === 1 ? (
                  <div className="flex-1 border-[1px] border-solid border-[var(--main-font-color)] h-[100px] flex flex-col justify-between items-center pt-[20px]">
                    <div>{state.userInfo.name}</div>
                    <div>
                      {state.userInfo.job}Lv.{state.userInfo.level}
                    </div>
                    <div className="relative h-[20px] w-full bg-[var(--third-font-color)] text-center">
                      1500/5000
                      <div className="absolute h-full top-0 left-0 w-[30%] bg-[var(--active-color)]"></div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{ borderStyle: 'dashed' }}
                    className="flex-1 border-[1px] border-solid border-[var(--main-font-color)] h-[100px] flex flex-col justify-center items-center">
                    <IconPlus />
                    <div className="mt-[10px]">站在这里</div>
                  </div>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
export default Fight;
