using MediatR;
using MMO_Idle.Application.DTOs;
using System;

namespace MMOIdle.Application.Characters.Queries
{
    public class GetCharacterDetailsQuery : IRequest<CharacterDetailsDto>
    {
        public Guid AccountId { get; set; }
        public Guid CharacterId { get; set; }

        public GetCharacterDetailsQuery(Guid accountId, Guid characterId)
        {
            AccountId = accountId;
            CharacterId = characterId;
        }
    }
}