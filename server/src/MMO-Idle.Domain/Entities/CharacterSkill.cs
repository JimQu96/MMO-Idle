using MMOIdle.Domain.Entities;
using MMOIdle.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMOIdle.Domain.Entities
{
    public class CharacterSkill
    {
        public long Id { get; set; }
        public Guid CharacterId { get; set; }
        public LifeSkillType SkillType { get; set; }
        public int Level { get; set; } = 1;
        public int Experience { get; set; } = 0;
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
        public virtual Character? Character { get; set; }
    }

}
