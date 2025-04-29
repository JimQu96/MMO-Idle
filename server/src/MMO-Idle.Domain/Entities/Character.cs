using System;
using MMOIdle.Domain.Enums;

namespace MMOIdle.Domain.Entities;

public class Character
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public CharacterClass Class { get; set; }
    public int Level { get; set; } = 1;
    public int Experience { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
    public bool IsActive { get; set; } = true;

    // Foreign key
    public Guid AccountId { get; set; }
    
    // Navigation property
    public virtual Account Account { get; set; } = null!;
} 