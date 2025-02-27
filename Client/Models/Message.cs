using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models;

public class Message
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public string Title { get; set; }
    
    [Required]
    public string Content { get; set; }
    
    public bool Read { get; set; } = false;
    
    
    [ForeignKey("User")]
    public int UserId { get; set; } 
    
    public User? User { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow; 
    
}