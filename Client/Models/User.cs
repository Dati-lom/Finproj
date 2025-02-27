using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models;

public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id {get; set;}
    
    [Required]
    public  string Username { get; set; }

    [Required]
    public  string HashedPassword { get; set; }
    
    [Required]
    public string Name { get; set; }
    
    [Required]
    public string Surname { get; set; }
    
    public bool IsAdmin { get; set; } = false;
    
    public string? Position {get; set;} = string.Empty;
    
    public string? Department {get; set;} = string.Empty;

    public ICollection<Message> Messages { get; set; } = new List<Message>();

    public override string ToString()
    {
        return "Username: " + Username + ", Password: " + HashedPassword + ", Position: " + Position;
    }
}