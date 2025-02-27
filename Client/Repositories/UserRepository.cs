using Microsoft.EntityFrameworkCore;
using WebApp.Models;
using AppContext = WebApp.Context.AppContext;

namespace WebApp.Repositories;

public class UserRepository : Repository<User>, IUserRepository
{
    
    public UserRepository(AppContext context) : base(context)
    {
    }

    public async Task<User?> GetUserByName(string userName)
    {
        return await _dbSet.FirstOrDefaultAsync(u => u.Username == userName) ?? null;
    }

    public async Task Update(User entity)
    {
        var existingUser = await _dbSet.FindAsync(entity.Id);

        _context.Entry(existingUser).CurrentValues.SetValues(entity); 
        await _context.SaveChangesAsync();
    }
}