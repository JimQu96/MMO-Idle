using MMO_Idle.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MMOIdle.Application.Characters;

public interface ICharacterEquipmentService
{
    // 获取角色装备信息
    Task<List<EquipmentDto>> GetCharacterEquipment(Guid characterId);

    // 获取角色背包物品列表
    Task<List<BackpackItemDto>> GetCharacterBackpackItems(Guid characterId);

    // 穿戴装备
    Task EquipItem(Guid characterId, long itemId);

    // 卸下装备
    Task UnequipItem(Guid characterId, long itemId);
}