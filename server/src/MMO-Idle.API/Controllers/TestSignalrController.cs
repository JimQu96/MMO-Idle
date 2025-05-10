using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using MMOIdle.API.Hubs;

namespace MMOIdle.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestSignalrController : ControllerBase
{
    private readonly IHubContext<GameHub> _hubContext;

    public TestSignalrController(IHubContext<GameHub> hubContext)
    {
        _hubContext = hubContext;
    }

    [HttpPost("ReceiveMessage")]
    public async Task<IActionResult> Send([FromBody] ChatMessageDto message)
    {
        await _hubContext.Clients.All.SendAsync("ReceiveMessage", message.User, message.Content);
        return Ok();
    }
}

public class ChatMessageDto
{
    public string User { get; set; }
    public string Content { get; set; }
}