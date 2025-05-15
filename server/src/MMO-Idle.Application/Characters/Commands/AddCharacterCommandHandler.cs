using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MMOIdle.Infrastructure.Persistence;
using MMOIdle.Domain.Entities;
using MMOIdle.Domain.Enums;

namespace MMOIdle.Application.Characters.Commands
{
    public class AddCharacterCommandHandler : IRequestHandler<AddCharacterCommand>
    {
        private readonly GameDbContext _context;

        public AddCharacterCommandHandler(GameDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(AddCharacterCommand request, CancellationToken cancellationToken)
        {
            if (_context.Characters.Any(x => x.Name == request.CharacterName))
            {
                throw new InvalidOperationException("重复的角色名");
            }
            // 验证角色名只能由汉字，字母，数字组成
            if (!System.Text.RegularExpressions.Regex.IsMatch(request.CharacterName, @"^[\u4e00-\u9fa5a-zA-Z0-9]+$"))
            {
                throw new InvalidOperationException("不合法的角色名");
            }
            // TBD 角色名长度验证

            var character = new Character
            {
                AccountId = request.AccountId,
                Name = request.CharacterName,
                Class = request.Class,
                Level = 1,
                Experience = 0,
                CreatedAt = DateTime.UtcNow,
                LastLoginAt = DateTime.UtcNow,
                IsActive = true,
            };
            _context.Characters.Add(character);

            // 初始化技能等级
            foreach (LifeSkillType lifeSkillType in Enum.GetValues(typeof(LifeSkillType)))
            {
                _context.CharacterSkills.Add(new CharacterSkill
                {
                    SkillType = lifeSkillType,
                    CharacterId = character.Id,
                    Level = 1,
                    Experience = 0,
                    LastUpdated = DateTime.UtcNow,
                });
            }
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}