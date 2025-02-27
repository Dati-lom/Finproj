using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using Microsoft.VisualBasic.CompilerServices;
using WebApp.Models;
using WebApp.Repositories;
using WebApp.Util;

namespace WebApp.Services;

public class LoginService: ILoginService
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenService _tokenService;
    
    

    public LoginService(IUserRepository userRepository, ITokenService tokenService)
    {
        _userRepository = userRepository;
        _tokenService = tokenService;
    }

    public async Task<ResponseMSG> RegisterUser(RegistrationDto loginDto)
    {
        var user = await _userRepository.GetUserByName(loginDto.Username);
        if (user != null)
        {
            return new ResponseMSG()
            {
                Status = false,
                Message = "UserName already in use",
            };
        }
        var newUser = new User
        {
            Username = loginDto.Username,
            HashedPassword = HashPassword(new LoginDto
            {
                Password = loginDto.Password,
                Username = loginDto.Username
            }),
            Name = loginDto.Name,
            Surname = loginDto.Surname,
        };

        _userRepository.Add(newUser);
        return new ResponseMSG
        {
            Status = true,
            Message = "User created",
        };
    }

    public async Task<ResponseMSG> Login(LoginDto loginDto)
    {
        var user = await _userRepository.GetUserByName(loginDto.Username);
        var hash = HashPassword(loginDto);
        if (user == null || hash != user.HashedPassword)
        {
            return new ResponseMSG
            {
                Status = false,
                Message = "Username or password is incorrect",
            };
        }
        var token = _tokenService.GenerateToken(user.Id.ToString(), user.Username);
        Console.WriteLine(token);

        return new ResponseMSG()
        {
            Status = true,
            Token = token,
            Message = "Token generated",
        };

    }

    public Task<ResponseMSG> Logout()
    {
        throw new NotImplementedException();
    }

    private string HashPassword(LoginDto loginDto)
    {
        byte[] passwordSalt = Encoding.UTF8.GetBytes(loginDto.Username);
        string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: loginDto.Password, 
            salt: passwordSalt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount:100000,
            numBytesRequested: 256/8
        ));
        return hashed;
    }
}