using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MMOIdle.Application.Characters.Queries;
using MMOIdle.Application.Characters.Commands;
using System.Security.Claims;
using MMO_Idle.Application.DTOs;

namespace MMOIdle.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CharacterController : ControllerBase
{
    private readonly IMediator _mediator;

    public CharacterController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("list")]
    public async Task<ActionResult<List<CharacterDto>>> ListCharacters()
    {
        // 从token中获取用户ID
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out Guid accountId))
        {
            return Unauthorized(new { message = "Invalid token or user ID not found" });
        }

        var query = new ListCharactersQuery(accountId);
        var characters = await _mediator.Send(query);
        return Ok(characters);
    }

    [HttpGet("{characterId}/details")]
    public async Task<ActionResult<CharacterDetailsDto>> ListCharacters(Guid characterId)
    {
        // 从token中获取用户ID
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out Guid accountId))
        {
            return Unauthorized(new { message = "Invalid token or user ID not found" });
        }

        var query = new GetCharacterDetailsQuery(accountId, characterId);
        var characters = await _mediator.Send(query);
        return Ok(characters);
    }



    [HttpPost("add")]
    public async Task<ActionResult<List<CharacterDto>>> AddCharacter([FromBody] AddCharacterRequestDto addCharacterRequestDto)
    {
        // 从token中获取用户ID
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out Guid accountId))
        {
            return Unauthorized(new { message = "Invalid token or user ID not found" });
        }

        var command = new AddCharacterCommand(accountId, addCharacterRequestDto.CharacterName, addCharacterRequestDto.Class);
        var characters = await _mediator.Send(command);
        return Ok(characters);
    }
}