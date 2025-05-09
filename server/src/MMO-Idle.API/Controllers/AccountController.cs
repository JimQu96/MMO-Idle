using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MMOIdle.Application.Accounts;
using MMOIdle.Application.Accounts.Dtos;
using System.Security.Claims;

namespace MMOIdle.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly IAccountService _accountService;

    public AccountController(IAccountService accountService)
    {
        _accountService = accountService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AccountResponseDto>> Register(RegisterAccountDto dto)
    {
        var result = await _accountService.RegisterAsync(dto);
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AccountResponseDto>> Login(LoginAccountDto dto)
    {

        var result = await _accountService.LoginAsync(dto);
        return Ok(result);

    }

    [Authorize]
    [HttpGet("characters")]
    public async Task<ActionResult<List<CharacterDto>>> GetCharacters()
    {
        // 从token中获取用户ID
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out Guid accountId))
        {
            return Unauthorized(new { message = "Invalid token or user ID not found" });
        }

        var characters = await _accountService.GetCharactersByAccountIdAsync(accountId);
        return Ok(characters);

    }
}