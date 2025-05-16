using MMO_Idle.Application.DTOs;

namespace MMOIdle.Application.Accounts;

public interface IAccountService
{
    Task<AccountResponseDto> RegisterAsync(RegisterAccountDto dto);
    Task<AccountResponseDto> LoginAsync(LoginAccountDto dto);
} 