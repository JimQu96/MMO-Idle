import React, { useState, useEffect } from 'react';
import { state } from '../../../../store';
const Skills: React.FC = () => {
  const info = state.userInfo;
  useEffect(() => {});
  return (
    <div className="text-[16px]">
      <div className="mt-[10px] flex">
        <div className="text-[var(--sub-font-color)] shrink-0">被动技能：</div>
        {/* <div>{info.skill.passiveSkills}</div> */}
      </div>
      <div className="mt-[10px] flex">
        <div className="text-[var(--sub-font-color)] shrink-0">次要技能：</div>
        {/* <div>{info.skill.minorSkills}</div> */}
      </div>
      <div className="mt-[10px] flex">
        <div className="text-[var(--sub-font-color)] shrink-0">主要技能：</div>
        {/* <div>{info.skill.keySkills}</div> */}
      </div>
    </div>
  );
};
export default Skills;
