using MMOIdle.Domain.Enums;

namespace MMO_Idle.Application.DTOs;

public class CharacterDetailsDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public CharacterClass Class { get; set; }
    public int Level { get; set; }
    public int Experience { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
    public bool IsActive { get; set; }

    public List<CharacterEquipmentDto> Equipments { get; set; } = [];
    public List<CharacterSkillDto> LifeSkills { get; set; } = [];
    public List<CharacterBackpackDto> Backpacks { get; set; } = [];

}