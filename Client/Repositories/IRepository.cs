using System.Net.Sockets;
using WebApp.Util;

namespace WebApp.Repositories;

public interface IRepository <T>
{
    Task<T>? GetById(int id);
    Task<ICollection<T>> GetAll();
    Task Add(T entity);
    Task Update(T entity);
    void Delete(int id);
    
}