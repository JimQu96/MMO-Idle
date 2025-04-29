using MMOIdle.Domain.Entities;

namespace MMOIdle.Application.Accounts;

public interface IJwtService
{
    string GenerateToken(Account account);
} 