using WebApp.Models;

namespace WebApp.Repositories;

public interface IUserRepository : IRepository<User>
{
    Task<User?> GetUserByName(string userName);
}