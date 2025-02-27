using Microsoft.EntityFrameworkCore;
using WebApp.Models;
using AppContext = WebApp.Context.AppContext;

namespace WebApp.Repositories;

public class MessageRepository : Repository<Message>, IMessageRepository
{
    public MessageRepository(AppContext context) : base(context)
    {
    }


    public async Task<IEnumerable<Message>> GetMessagesForUser(int userId)
    {
        return await _context.Messages
            .Where(m => m.UserId == userId)
            .Include(u => u.User)
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();
    }
}