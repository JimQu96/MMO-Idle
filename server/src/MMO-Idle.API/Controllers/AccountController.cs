using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MMO_Idle.Application.DTOs;
using MMOIdle.Application.Accounts;
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
}