using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using WebApp.Services;
using WebApp.Util;

namespace WebApp.Controllers;

[Route("api/")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly ILoginService _loginService;

    public AuthController(ILoginService loginService)
    {
        _loginService = loginService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto request)
    {
        var response = await _loginService.Login(request);
        if (!response.Status)
        {
            return BadRequest(response.Message);
        }
        return Ok(response.Token);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegistrationDto request)
    {
        var res = await _loginService.RegisterUser(request);
        if (!res.Status)
        {
            return BadRequest(res.Message);
        }
        return Ok(res.Message);
    }

    [HttpGet("auth-check")]
    public async Task<IActionResult> AuthCheck()
    {
        throw new NotImplementedException();
    }

}