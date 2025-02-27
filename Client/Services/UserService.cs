using System.Data.Common;
using WebApp.Models;
using WebApp.Repositories;
using WebApp.Util;

namespace WebApp.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<User?> GetUserAsync(int id)
    {
        if (id <= 0)
            throw new ArgumentException("Invalid user ID");
        try
        {
            var user = await _userRepository.GetById(id);
            
            if (user == null)
                throw new KeyNotFoundException("User not found");

            return user;
        }
        catch (DbException ex)
        {
            throw new ApplicationException("Database error occurred", ex);
        }
    }

    public async Task<ResponseMSG> UpdateProfile(User user)
    {
        var userFound = await _userRepository.GetById(user.Id);
        if (userFound == null)
        {
            return new ResponseMSG()
            {
                Status = false,
                Message = "User not found",
            };
        }
        userFound.HashedPassword = user.HashedPassword;
        userFound.Department = user.Department;
        userFound.Name = user.Name;
        userFound.Surname = user.Surname;
        userFound.Position = user.Position;
        
        await _userRepository.Update(userFound);
        
        return new ResponseMSG
        {
            Status = true,
            Message = "User updated",
        };
    }
}