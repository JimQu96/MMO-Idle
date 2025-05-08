using MMOIdle.Domain.Entities;
using MMOIdle.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMO_Idle.Domain.Entities
{
    public class CharacterEquipment
    {
        public long Id { get; set; }
        public Guid CharacterId { get; set; }
        public required EquipmentSlot Slot { get; set; }
        public long ItemId { get; set; }
        public DateTime EquippedAt { get; set; } = DateTime.Now;

        // 导航属性（可选）
        public virtual Character? Character { get; set; }
        public virtual GameItem? Item { get; set; }
    }
}
