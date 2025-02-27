using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp.Context;

public class AppContext : DbContext
{
    private readonly IConfiguration _configuration;

    public AppContext(DbContextOptions options, IConfiguration configuration) : base(options)
    {
        _configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasMany(u => u.Messages)
            .WithOne()
            .HasForeignKey(m => m.Id)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Message>()
            .HasOne(m => m.User)
            .WithMany(u => u.Messages)
            .HasForeignKey(m => m.UserId);
            
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Message> Messages { get; set; }
}