using MMOIdle.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMO_Idle.Application.DTOs
{
    public class StartActionMessageDto
    {
        public long ActionId { get; set; }
        public bool HasMaxCount { get; set; }
        public int MaxCount { get; set; }
        public bool ShouldClearQueue { get; set; }
    }
}
