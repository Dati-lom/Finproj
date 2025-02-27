using System.Globalization;

namespace WebApp.JWT;

public class JwtConfiguration
{
    public string Issuer { get; set; } = string.Empty;
    public string Secret { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
    public int expiresDays { get; set; }

    public JwtConfiguration(IConfiguration configuration)
    {
        var section = configuration.GetSection("JWT");
        Issuer = section["Issuer"];
        Secret = section["Secret"];
        Audience = section["Audience"];
        expiresDays = Convert.ToInt32(section["ExpiresDays"], CultureInfo.InvariantCulture);
        
    }
}