import { EquipmentSlotEnum } from "../enums/EquipmentSlotEnum";

export interface CharacterEquipment {
    id: string;
    name: string;
    slot: EquipmentSlotEnum;
    itemId: number;
    equippedAt: Date;
} 