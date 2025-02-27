using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApp.Models;
using WebApp.Services;
using WebApp.Util;

namespace WebApp.Controllers;

[Route("api/")]
public class UserController:ControllerBase
{
    private readonly IUserService _userService;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserController(IUserService userService, IHttpContextAccessor httpContextAccessor)
    {
        _userService = userService;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpGet("user")]
    [Authorize]
    public async Task<IActionResult> GetUser()
    {
        try
        {
            int id = GetCurrentUserId();
            var user = await _userService.GetUserAsync(id);
            return Ok(user);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new ResponseMSG
            {
                Status = false,
                Message = ex.Message
            });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new ResponseMSG
            {
                Status = false,
                Message = ex.Message
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ResponseMSG
            {
                Status = false,
                Message = ex.Message
            });
        }
    }

    [HttpPatch("user")]
    [Authorize]
    public async Task<IActionResult> UpdateProfile([FromBody] UserDto userDto)
    {
        Console.WriteLine(userDto);
        var userId = GetCurrentUserId();
        var user = await _userService.GetUserAsync(userId);
        user.Username = userDto.Username;
        user.Name = userDto.Name;
        user.Surname = userDto.Surname;
        user.Department = userDto.Department;
        user.Position = userDto.Position;
        
        var resp = await _userService.UpdateProfile(user);
        if (resp.Status)
        {
            return Ok(resp);
        }

        return BadRequest(resp.Message);
    }
    private int GetCurrentUserId() => int.Parse(
        _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new InvalidOperationException()
    );

}