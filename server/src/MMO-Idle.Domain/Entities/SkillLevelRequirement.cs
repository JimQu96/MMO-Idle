using MMOIdle.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMOIdle.Domain.Entities
{
    public class SkillLevelRequirement
    {
        public long Id { get; set; }
        public LifeSkillType? SkillType { get; set; }
        public int Level { get; set; } = 1;
        public int RequiredExperience { get; set; } = 5;
    }
}
