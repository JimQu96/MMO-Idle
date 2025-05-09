using Microsoft.AspNetCore.Mvc;
using MMOIdle.Application.Characters;
using MMOIdle.Application.Characters.DTOs;

namespace MMOIdle.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CharacterEquipmentController : ControllerBase
{
    private readonly ICharacterEquipmentService _equipmentService;

    public CharacterEquipmentController(ICharacterEquipmentService equipmentService)
    {
        _equipmentService = equipmentService;
    }

    // 获取角色装备信息
    [HttpGet("{characterId}/equipment")]
    public async Task<ActionResult<List<EquipmentDto>>> GetCharacterEquipment(Guid characterId)
    {
        var equipment = await _equipmentService.GetCharacterEquipment(characterId);
        return Ok(equipment);
    }

    // 获取角色背包物品列表
    [HttpGet("{characterId}/backpack")]
    public async Task<ActionResult<List<BackpackItemDto>>> GetCharacterBackpackItems(Guid characterId)
    {
        var items = await _equipmentService.GetCharacterBackpackItems(characterId);
        return Ok(items);
    }

    // 穿戴装备
    [HttpPost("{characterId}/equip/{itemId}")]
    public async Task<IActionResult> EquipItem(Guid characterId, long itemId)
    {
        await _equipmentService.EquipItem(characterId, itemId);
        return Ok();
    }

    // 卸下装备
    [HttpPost("{characterId}/unequip/{itemId}")]
    public async Task<IActionResult> UnequipItem(Guid characterId, long itemId)
    {
        await _equipmentService.UnequipItem(characterId, itemId);
        return Ok();
    }
}