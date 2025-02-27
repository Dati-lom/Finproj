using WebApp.Models;

namespace WebApp.Repositories;

public interface IMessageRepository : IRepository<Message>
{
    public Task<IEnumerable<Message>> GetMessagesForUser(int userId);
}