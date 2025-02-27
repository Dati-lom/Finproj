namespace WebApp.Services;

public interface ITokenService
{
    public string GenerateToken(string id, string email);
}