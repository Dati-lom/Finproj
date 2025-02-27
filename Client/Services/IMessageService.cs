using WebApp.Models;
using WebApp.Util;

namespace WebApp.Services;

public interface IMessageService
{
    public Task<IEnumerable<Message>> GetAllMessages(int userId);

    public Task<ResponseMSG> SendMessage(string userName, string content,string title);

    public Task<ResponseMSG> UpdateMessageStatus(int messageId, int userId, bool isRead);

}