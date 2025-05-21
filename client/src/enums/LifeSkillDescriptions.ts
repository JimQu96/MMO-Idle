
import { LifeSkillTypeEnum } from './LifeSkillTypeEnum';
export const LifeSkillDescriptions: Record<LifeSkillTypeEnum, { code: string; name: string }> = {
  [LifeSkillTypeEnum.Mining]: { code: 'Mining', name: '采矿' },
  [LifeSkillTypeEnum.Hunting]: { code: 'Hunting', name: '狩猎' },
  [LifeSkillTypeEnum.Gathering]: { code: 'Gathering', name: '采摘' },
  [LifeSkillTypeEnum.Fishing]: { code: 'Fishing', name: '钓鱼' },
  [LifeSkillTypeEnum.Farming]: { code: 'Farming', name: '种田' },
  [LifeSkillTypeEnum.Blacksmithing]: { code: 'Blacksmithing', name: '锻造' },
  [LifeSkillTypeEnum.Crafting]: { code: 'Crafting', name: '制作' },
  [LifeSkillTypeEnum.Tailoring]: { code: 'Tailoring', name: '裁缝' },
  [LifeSkillTypeEnum.Cooking]: { code: 'Cooking', name: '烹饪' },
  [LifeSkillTypeEnum.Alchemy]: { code: 'Alchemy', name: '制药' },
};
