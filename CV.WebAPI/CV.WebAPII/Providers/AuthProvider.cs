using CV.DAL.CodeFirst;
using CV.WebAPII.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace CV.WebAPII.Providers
{
    public class AuthProvider
    {
        public UserInfo getAuth(string token)
        {
            SSO.IdentityClient client = new SSO.IdentityClient();
            SSO.AuthResponse ui = client.Auth(token);

            return new UserInfo
            {
                Email = ui.Email,
                FirstName = ui.FirstName,
                LastName = ui.LastName,
                Roles = ui.Roles.ToList(),
                UserId = ui.UserId,
                Username = ui.Username
            };
        }
  
    }
}