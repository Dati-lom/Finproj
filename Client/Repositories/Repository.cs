using Microsoft.EntityFrameworkCore;
using WebApp.Util;
using AppContext = WebApp.Context.AppContext;

namespace WebApp.Repositories;

public class Repository <T> : IRepository <T> where T : class
{
    protected readonly AppContext _context;
    protected readonly DbSet<T> _dbSet;

    public Repository(AppContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }   

    public async Task<T> GetById(int id)
    {
        return (await _dbSet.FindAsync(id))!;
    }

    public async Task<ICollection<T>> GetAll()
    {
        return await Task.FromResult<ICollection<T>>(_dbSet.ToList());
    }

    public async void Delete(int id)
    {
         _dbSet.Remove((await _dbSet.FindAsync(id))!);
        await _context.SaveChangesAsync();
    }

    public async Task Update(T entity)
    {
        _dbSet.Attach(entity);
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }


    public async Task Add(T entity)
    {
        await _dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();
    }
}