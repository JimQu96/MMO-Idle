using MediatR;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MMOIdle.Infrastructure.Persistence;
using MMO_Idle.Application.DTOs;

namespace MMOIdle.Application.Characters.Queries
{
    public class ListCharactersQueryHandler : IRequestHandler<ListCharactersQuery, List<CharacterDto>>
    {
        private readonly GameDbContext _context;

        public ListCharactersQueryHandler(GameDbContext context)
        {
            _context = context;
        }

        public async Task<List<CharacterDto>> Handle(ListCharactersQuery request, CancellationToken cancellationToken)
        {
            var characters = await _context.Characters
                .Where(c => c.AccountId == request.AccountId)
                .Select(c => new CharacterDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Class = c.Class,
                    Level = c.Level,
                    Experience = c.Experience,
                    CreatedAt = c.CreatedAt,
                    LastLoginAt = c.LastLoginAt,
                    IsActive = c.IsActive
                })
                .ToListAsync();

            return characters;
        }
    }
}