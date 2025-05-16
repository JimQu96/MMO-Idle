using MediatR;
using System;
using System.Collections.Generic;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using MMOIdle.Infrastructure.Persistence;
using MMO_Idle.Application.DTOs;

namespace MMOIdle.Application.Characters.Queries
{
    public class GetCharacterDetailsQueryHandler : IRequestHandler<GetCharacterDetailsQuery, CharacterDetailsDto>
    {
        private readonly GameDbContext _context;

        public GetCharacterDetailsQueryHandler(GameDbContext context)
        {
            _context = context;
        }

        public async Task<CharacterDetailsDto> Handle(GetCharacterDetailsQuery request, CancellationToken cancellationToken)
        {

            var query = _context.Characters
                .Include(x => x.CharacterSkills)
                .Include(x => x.CharacterBackpacks)
                .Include(x => x.CharacterEquipments)
                .Where(x => x.AccountId == request.AccountId && x.Id == request.CharacterId);

            var character = await _context.Characters
                .Include(x => x.CharacterSkills)
                .Include(x => x.CharacterBackpacks)
                .Include(x => x.CharacterEquipments)
                .FirstOrDefaultAsync(x => x.AccountId == request.AccountId && x.Id == request.CharacterId, cancellationToken: cancellationToken);

            if (character == null)
            {
                throw new ArgumentException("账号下不存在当前角色");
            }


            return new CharacterDetailsDto
            {
                Id = character.Id,
                Name = character.Name,
                Class = character.Class,
                Level = character.Level,
                Experience = character.Experience,
                CreatedAt = character.CreatedAt,
                LastLoginAt = character.LastLoginAt,
                IsActive = character.IsActive,
                Equipments = character.CharacterEquipments.Select(x => new CharacterEquipmentDto
                {
                    Id = x.Id,
                    Slot = x.Slot,
                    ItemId = x.ItemId,
                    EquippedAt = x.EquippedAt,
                }).ToList(),
                LifeSkills = character.CharacterSkills.Select(x => new CharacterSkillDto
                {
                    Id = x.Id,
                    SkillType = x.SkillType,
                    Level = x.Level,
                    Experience = x.Experience,
                    LastUpdated = x.LastUpdated,
                }).ToList(),
                Backpacks = character.CharacterBackpacks.Select(x => new CharacterBackpackDto
                {
                    Id = x.Id,
                    CharacterId = x.CharacterId,
                    ItemId = x.ItemId,
                    Quantity = x.Quantity,
                    CreatedAt = x.CreatedAt,
                    UpdatedAt = x.UpdatedAt,
                }).ToList()
            };
        }
    }
}