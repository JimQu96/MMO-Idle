using MMOIdle.Domain.Enums;
using System.Text.Json;

namespace MMO_Idle.Application.DTOs;

public class GameItemDto
{
    public long Id { get; set; }
    public required string Name { get; set; }
    public required ItemType Type { get; set; }
    public required ItemCategory Category { get; set; }
    public required ItemQuality Quality { get; set; }
    public string? Description { get; set; }
    public JsonDocument? Attributes { get; set; }
    public int SellPrice { get; set; }

    public void Dispose() => Attributes?.Dispose();
}