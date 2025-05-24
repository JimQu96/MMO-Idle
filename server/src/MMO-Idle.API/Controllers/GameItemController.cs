using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MMOIdle.Application.GameItems.Queries;
using MMO_Idle.Application.DTOs;

namespace MMOIdle.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class GameItemController : ControllerBase
{
    private readonly IMediator _mediator;

    public GameItemController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("list")]
    public async Task<ActionResult<List<GameItemDto>>> ListGameItems()
    {
        var query = new ListGameItemsQuery();
        var items = await _mediator.Send(query);
        return Ok(items);
    }
}