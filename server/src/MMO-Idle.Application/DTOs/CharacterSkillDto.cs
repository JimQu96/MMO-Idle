using MMOIdle.Domain.Enums;

namespace MMO_Idle.Application.DTOs;

public class CharacterSkillDto
{
    public long Id { get; set; }
    public LifeSkillType SkillType { get; set; }
    public int Level { get; set; } = 1;
    public int Experience { get; set; } = 0;
    public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
}