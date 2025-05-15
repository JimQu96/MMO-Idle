using MMOIdle.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMO_Idle.Application.DTOs
{
    public class AddCharacterRequestDto
    {
        public required string CharacterName { get; set; }
        public CharacterClass Class { get; set; }
    }
}
