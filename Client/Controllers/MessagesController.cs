using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.JSInterop;
using WebApp.Services;
using WebApp.Util;

namespace WebApp.Controllers;
[ApiController]
[Authorize]
[Route("api/messages")]
public class MessagesController : ControllerBase
{
    private readonly IMessageService _messageService;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public MessagesController(IMessageService messageService, IHttpContextAccessor httpContextAccessor)
    {
        _messageService = messageService;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpGet]
    public async Task<IActionResult> GetMessages()
    {
        Console.WriteLine("GetMessages");
        var userId = GetCurrentUserId();
        Console.WriteLine($"userId: {userId}");
        try
        {
            var result = await _messageService.GetAllMessages(userId);
            return Ok(result);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500);
        }
    }
    
    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateMessageStatus(int id, [FromBody] MessageStatusUpdateDto dto)
    {
        try
        {
            var userId = GetCurrentUserId();
            var message = await _messageService.UpdateMessageStatus(id, userId, dto.IsRead);
            return Ok(message);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { error = ex.Message });
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }
    
    [HttpPost("{username}")]
    public async Task<IActionResult> SendMessage([FromBody] MessageDto dto, string username)
    {
        try
        {
            var message = await _messageService.SendMessage(username, dto.Content, dto.Title);
            return Ok(message);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
    
    
    
    private int GetCurrentUserId() => int.Parse(
        _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new InvalidOperationException()
    );

    private IActionResult HandleResponse(ResponseMSG result) => 
        result.Status ? Ok(result) : BadRequest(result);

    public record MessageDto([Required][MaxLength(1000)] string Content, [Required] string Title);
    public record MessageStatusUpdateDto(bool IsRead);
}