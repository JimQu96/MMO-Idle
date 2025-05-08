using MMOIdle.Domain.Entities;
using MMOIdle.Application.Characters.DTOs;
using MMOIdle.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using MMO_Idle.Domain.Entities;
using MMOIdle.Domain.Enums;

namespace MMOIdle.Application.Characters;

public class CharacterEquipmentService : ICharacterEquipmentService
{
    private readonly GameDbContext _dbContext;
    private static readonly Dictionary<ItemCategory, List<EquipmentSlot>> ItemCategorySlotMapping = new()
    {
        { ItemCategory.Pickaxe, new List<EquipmentSlot> { EquipmentSlot.Pickaxe } },
        { ItemCategory.Hammer, new List<EquipmentSlot> { EquipmentSlot.Hammer } },
        { ItemCategory.OneHandedSword, new List<EquipmentSlot> { EquipmentSlot.MainHand, EquipmentSlot.OffHand } },
        { ItemCategory.Shield, new List<EquipmentSlot> { EquipmentSlot.OffHand } },
        { ItemCategory.Head, new List<EquipmentSlot> { EquipmentSlot.Head } },
        { ItemCategory.Shoulder, new List<EquipmentSlot> { EquipmentSlot.Shoulder } },
        { ItemCategory.Chest, new List<EquipmentSlot> { EquipmentSlot.Chest } },
        { ItemCategory.Wrist, new List<EquipmentSlot> { EquipmentSlot.Wrist } },
        { ItemCategory.Waist, new List<EquipmentSlot> { EquipmentSlot.Waist } },
        { ItemCategory.Hands, new List<EquipmentSlot> { EquipmentSlot.Hands } },
        { ItemCategory.Legs, new List<EquipmentSlot> { EquipmentSlot.Legs } },
        { ItemCategory.Feet, new List<EquipmentSlot> { EquipmentSlot.Feet } }
    };

    public CharacterEquipmentService(GameDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // 获取角色装备信息
    public async Task<List<EquipmentDto>> GetCharacterEquipment(Guid characterId)
    {
        var equipment = await _dbContext.CharacterEquipments
            .Where(e => e.CharacterId == characterId)
            .Select(e => new EquipmentDto
            {
                Id = e.ItemId,
                Name = e.Item!.Name,
                Slot = e.Slot,
            })
            .ToListAsync();

        return equipment;
    }

    // 获取角色背包物品列表
    public async Task<List<BackpackItemDto>> GetCharacterBackpackItems(Guid characterId)
    {
        var items = await _dbContext.CharacterBackpacks
            .Where(b => b.CharacterId == characterId)
            .Select(b => new BackpackItemDto
            {
                Id = b.GameItem.Id,
                Name = b.GameItem.Name,
                Quantity = b.Quantity,
                Category = b.GameItem.Category,
                Type = b.GameItem.Type,
                Quality = b.GameItem.Quality,
                Description = b.GameItem.Description,
            })
            .ToListAsync();

        return items;
    }

    // 穿戴装备
    public async Task EquipItem(Guid characterId, long itemId)
    {
        var backpackItem = await _dbContext.CharacterBackpacks
            .FirstOrDefaultAsync(b => b.CharacterId == characterId && b.ItemId == itemId);

        if (backpackItem == null || backpackItem.Quantity <= 0)
        {
            return;
        }

        var gameItem = await _dbContext.GameItems.FindAsync(itemId);
        if (gameItem == null)
        {
            return;
        }

        if (!ItemCategorySlotMapping.TryGetValue(gameItem.Category, out var validSlots))
        {
            return;
        }

        // 查找空槽位
        var equippedItems = await _dbContext.CharacterEquipments
            .Where(e => e.CharacterId == characterId && validSlots.Contains(e.Slot))
            .ToListAsync();

        EquipmentSlot? targetSlot = null;
        foreach (var slot in validSlots)
        {
            if (!equippedItems.Any(e => e.Slot == slot))
            {
                targetSlot = slot;
                break;
            }
        }

        // 如果没有空槽位，替换槽位 1（这里假设第一个有效槽位为槽位 1）
        if (!targetSlot.HasValue && equippedItems.Count > 0)
        {
            var itemToReplace = equippedItems.First();
            _dbContext.CharacterEquipments.Remove(itemToReplace);

            // 将被替换的物品放回背包
            var existingBackpackItem = await _dbContext.CharacterBackpacks
                .FirstOrDefaultAsync(b => b.CharacterId == characterId && b.ItemId == itemToReplace.ItemId);

            if (existingBackpackItem != null)
            {
                existingBackpackItem.Quantity += 1;
            }
            else
            {
                _dbContext.CharacterBackpacks.Add(new CharacterBackpack
                {
                    CharacterId = characterId,
                    ItemId = itemToReplace.ItemId,
                    Quantity = 1
                });
            }

            targetSlot = itemToReplace.Slot;
        }

        if (targetSlot.HasValue)
        {
            backpackItem.Quantity -= 1;

            var newEquipment = new CharacterEquipment
            {
                CharacterId = characterId,
                ItemId = itemId,
                EquippedAt = DateTime.UtcNow,
                Slot = targetSlot.Value
            };

            _dbContext.CharacterEquipments.Add(newEquipment);
            await _dbContext.SaveChangesAsync();
        }
    }

    // 卸下装备
    public async Task UnequipItem(Guid characterId, long itemId)
    {
        // 实现卸下装备的业务逻辑
        // 例如：从装备列表移除物品，添加到背包
        var characterEquipment = await _dbContext.CharacterEquipments
            .FirstOrDefaultAsync(e => e.CharacterId == characterId && e.ItemId == itemId);

        if (characterEquipment != null)
        {
            _dbContext.CharacterEquipments.Remove(characterEquipment);
            
            // 判断当前背包有没有同样的装备，如果有数量+1，如果没有新建一条
            var existingBackpackItem = await _dbContext.CharacterBackpacks
               .FirstOrDefaultAsync(b => b.CharacterId == characterId && b.ItemId == characterEquipment.ItemId);

            if (existingBackpackItem != null)
            {
                existingBackpackItem.Quantity += 1;
            }
            else
            {
                var newBackpackItem = new CharacterBackpack
                {
                    CharacterId = characterId,
                    ItemId = characterEquipment.ItemId,
                };
                _dbContext.CharacterBackpacks.Add(newBackpackItem);
            }
            
            await _dbContext.SaveChangesAsync();
        }
    }
}