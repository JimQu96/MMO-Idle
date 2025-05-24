using MMOIdle.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MMOIdle.Domain.Enums;
using System.Text.Json;

namespace MMOIdle.Domain.Entities
{
    public class GameItem : IDisposable
    {
        public long Id { get; set; }
        public required string Name { get; set; }
        public required ItemType Type { get; set; }
        public required ItemCategory Category { get; set; }
        public required ItemQuality Quality { get; set; }
        public string? Description { get; set; }
        public JsonDocument? Attributes { get; set; }
        public int SellPrice { get; set; }
        public string? Icon { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public void Dispose() => Attributes?.Dispose();
    }
}
