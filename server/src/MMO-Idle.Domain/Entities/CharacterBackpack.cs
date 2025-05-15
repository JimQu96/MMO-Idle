using MMOIdle.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMOIdle.Domain.Entities
{
    public class CharacterBackpack
    {
        public long Id { get; set; }
        public Guid CharacterId { get; set; }
        public long ItemId { get; set; }
        public int Quantity { get; set; } = 1;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public virtual Character Character { get; set; } = null!;
        public virtual GameItem GameItem { get; set; } = null!;
    }
}
