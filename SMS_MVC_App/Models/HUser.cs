using System;
using System.ComponentModel;

namespace SMS_MVC_App.Models
{
    public class HUser
    {
        [DisplayName("Username:")]
        public string Username { get; set; }
        [DisplayName("Password:")]

        public string Password { get; set; }
    }
}