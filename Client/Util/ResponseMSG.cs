namespace WebApp.Util;

public class ResponseMSG
{
    public bool Status { get; set; }
    public string Message { get; set; } = string.Empty;
    
    public string? Token { get; set; } = string.Empty;
}