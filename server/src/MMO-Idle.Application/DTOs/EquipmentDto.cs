using MMOIdle.Domain.Enums;

namespace MMO_Idle.Application.DTOs;

public class EquipmentDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public EquipmentSlot Slot { get; set; }
}