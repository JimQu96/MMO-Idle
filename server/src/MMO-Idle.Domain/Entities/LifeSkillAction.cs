using MMOIdle.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMO_Idle.Domain.Entities
{
    public class LifeSkillAction
    {
        public long Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public LifeSkillType Type { get; set; }
        public int DurationSeconds { get; set; }
        public int RequiredLevel { get; set; }
        public Dictionary<long, int>? ResourceCost { get; set; }
        public Dictionary<long, int>? ResourceYield { get; set; }
        public int ExperienceGain { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
    }
}
