
namespace MMO_Idle.Application.DTOs;

public class CharacterBackpackDto
{
    public long Id { get; set; }
    public Guid CharacterId { get; set; }
    public long ItemId { get; set; }
    public int Quantity { get; set; } = 1;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}