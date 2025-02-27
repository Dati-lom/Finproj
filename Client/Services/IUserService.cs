using WebApp.Models;
using WebApp.Util;

namespace WebApp.Services;

public interface IUserService
{
    Task<User> GetUserAsync(int id);
    
    Task<ResponseMSG> UpdateProfile(User user);
}