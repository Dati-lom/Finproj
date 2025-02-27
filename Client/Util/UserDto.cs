namespace WebApp.Util;

public class UserDto
{
    public  string Username { get; set; }
    
    public  string Name { get; set; }
    
    public  string Surname { get; set; }
    public string? Position {get; set;} = string.Empty;
    
    public string? Department {get; set;} = string.Empty;
    
}