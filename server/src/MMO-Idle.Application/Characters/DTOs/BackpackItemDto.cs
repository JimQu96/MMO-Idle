using MMOIdle.Domain.Enums;

namespace MMOIdle.Application.Characters.DTOs;

public class BackpackItemDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public required ItemType Type { get; set; }
    public required ItemCategory Category { get; set; }
    public required ItemQuality Quality { get; set; }
    public string? Description { get; set; }
}