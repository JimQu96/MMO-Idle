import { LifeSkillTypeEnum } from "../enums/LifeSkillTypeEnum";

export interface CharacterSkill {
    id: string;
    name: string;
    skillType: LifeSkillTypeEnum;
    level: number;
    experience: number;
    lastUpdated: Date;
} 