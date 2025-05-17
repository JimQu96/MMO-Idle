import { CharacterClassEnum } from '../enums/CharacterClassEnum';
import { CharacterEquipment } from './CharacterEquipment';
import { CharacterSkill } from './CharacterSkill';
import { CharacterBackpack } from './CharacterBackpack';

export interface CharacterDetails {
    id: string;
    name: string;
    class: CharacterClassEnum;
    level: number;
    experience: number;
    createdAt: Date;
    lastLoginAt: Date | null;
    isActive: boolean;
    equipments: CharacterEquipment[];
    lifeSkills: CharacterSkill[];
    backpacks: CharacterBackpack[];
} 