using MediatR;
using MMOIdle.Domain.Enums;
using System;

namespace MMOIdle.Application.Characters.Commands
{
    public class AddCharacterCommand : IRequest
    {
        public Guid AccountId { get; set; }
        public string CharacterName { get; set; }
        public CharacterClass Class { get; set; }

        public AddCharacterCommand(Guid accountId, string characterName, CharacterClass characterClass)
        {
            AccountId = accountId;
            CharacterName = characterName;
            Class = characterClass;
            
        }
    }
}