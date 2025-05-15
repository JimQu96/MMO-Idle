using MMOIdle.Domain.Enums;

namespace MMO_Idle.Application.DTOs;

public class CharacterEquipmentDto
{
    public long Id { get; set; }
    public required EquipmentSlot Slot { get; set; }
    public long ItemId { get; set; }
    public DateTime EquippedAt { get; set; } = DateTime.Now;
}