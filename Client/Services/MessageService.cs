using WebApp.Models;
using WebApp.Repositories;
using WebApp.Util;

namespace WebApp.Services;

public class MessageService: IMessageService
{
    private readonly IMessageRepository _messageRepository;
    private readonly IUserRepository _userRepository;

    public MessageService( IMessageRepository messageRepository, IUserRepository userRepository)
    {
        _messageRepository = messageRepository;
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<Message>> GetAllMessages(int userId)
    {
            return await _messageRepository.GetMessagesForUser(userId);
    }
    

    public async Task<ResponseMSG> SendMessage(string username, string content, string title)
    {
        
        try
        {
            var user = await _userRepository.GetUserByName(username);
            if (user == null)
            {
                return new ResponseMSG
                {
                    Status = false,
                    Message = "user not found",
                };
            }
            var message = new Message
            {
                Title = title,
                Content = content,
                UserId = user.Id,
                Read = false,
                CreatedAt = DateTime.UtcNow
            };

            _messageRepository.Add(message);

            return new ResponseMSG()
            {
                Status = true,
                Message = "Message added: " + message,
            };
        }
        catch (Exception ex)
        {
            return new ResponseMSG()
            {
                Status = false,
                Message = ex.Message,
            };
        }
    }

    public async Task<ResponseMSG> UpdateMessageStatus(int messageId, int userId, bool isRead)
    {
        try
        {
            var message = await  _messageRepository.GetById(messageId);

            if (message == null)
                return new ResponseMSG()
                {
                    Status = false,
                    Message = "Message not found",
                };

            if (message.UserId != userId)
                return new ResponseMSG()
                {
                    Status = false,
                    Message = "User not found",
                };

            message.Read = isRead;
            _messageRepository.Update(message);

            return new ResponseMSG()
            {
                Status = true,
                Message = "Message updated",
            };
        }
        catch (Exception ex)
        {
            return new ResponseMSG()
            {
                Status = false,
                Message = ex.Message,
            };
        }
    }
}