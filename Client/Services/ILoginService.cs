using WebApp.Util;

namespace WebApp.Services;

public interface ILoginService
{
    Task<ResponseMSG> RegisterUser(RegistrationDto loginDto);
    Task<ResponseMSG> Login(LoginDto loginDto);
    Task<ResponseMSG> Logout();
}