using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using MMOIdle.Application.Accounts.Dtos;
using MMOIdle.Domain.Entities;
using MMOIdle.Infrastructure.Persistence;

namespace MMOIdle.Application.Accounts;

public class AccountService : IAccountService
{
    private readonly GameDbContext _context;
    private readonly IJwtService _jwtService;

    public AccountService(GameDbContext context, IJwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    public async Task<AccountResponseDto> RegisterAsync(RegisterAccountDto dto)
    {
        // 检查用户名是否已存在
        if (await _context.Accounts.AnyAsync(a => a.UserName == dto.UserName))
        {
            throw new Exception("Username already exists");
        }

        // 创建新账号
        var account = new Account
        {
            UserName = dto.UserName,
            PasswordHash = HashPassword(dto.Password),
            CreatedAt = DateTime.UtcNow
        };

        _context.Accounts.Add(account);
        await _context.SaveChangesAsync();

        var token = _jwtService.GenerateToken(account);

        return new AccountResponseDto
        {
            Id = account.Id,
            UserName = account.UserName,
            CreatedAt = account.CreatedAt,
            Token = token
        };
    }

    public async Task<AccountResponseDto> LoginAsync(LoginAccountDto dto)
    {
        var account = await _context.Accounts
            .FirstOrDefaultAsync(a => a.UserName == dto.UserName);

        if (account == null || account.PasswordHash != HashPassword(dto.Password))
        {
            throw new ArgumentException("Invalid username or password");
        }

        // 更新最后登录时间
        account.LastLoginAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        var token = _jwtService.GenerateToken(account);

        return new AccountResponseDto
        {
            Id = account.Id,
            UserName = account.UserName,
            CreatedAt = account.CreatedAt,
            LastLoginAt = account.LastLoginAt,
            Token = token
        };
    }

    public async Task<List<CharacterDto>> GetCharactersByAccountIdAsync(Guid accountId)
    {
        var characters = await _context.Characters
            .Where(c => c.AccountId == accountId)
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

    private static string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(hashedBytes);
    }
} 