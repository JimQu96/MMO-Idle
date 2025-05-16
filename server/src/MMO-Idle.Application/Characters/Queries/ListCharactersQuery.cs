using MediatR;
using MMO_Idle.Application.DTOs;
using System;

namespace MMOIdle.Application.Characters.Queries
{
    public class ListCharactersQuery : IRequest<List<CharacterDto>>
    {
        public Guid AccountId { get; set; }

        public ListCharactersQuery(Guid accountId)
        {
            AccountId = accountId;
        }
    }
}