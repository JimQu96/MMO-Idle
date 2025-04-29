using MMOIdle.Application.Accounts.Dtos;

namespace MMOIdle.Application.Accounts;

public interface IAccountService
{
    Task<AccountResponseDto> RegisterAsync(RegisterAccountDto dto);
    Task<AccountResponseDto> LoginAsync(LoginAccountDto dto);
    Task<List<CharacterDto>> GetCharactersByAccountIdAsync(Guid accountId);
} 