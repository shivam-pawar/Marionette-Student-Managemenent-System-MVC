using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SMS_MVC_App.Models;
using System.Collections.Generic;
using System.Security.Claims;

namespace SMS_MVC_App.Controllers
{
    public class LoginController : Controller
    {
        readonly UserDataAccessLayer udal = new UserDataAccessLayer();
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public async System.Threading.Tasks.Task<ActionResult> LoginAsync(HUser user, string ReturnUrl)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim("Name", user.Username),
                new Claim(ClaimTypes.Role, "Administrator")
            };
            var claimsIdentity = new ClaimsIdentity(
            claims, CookieAuthenticationDefaults.AuthenticationScheme);


            if (IsValid(user))
            {
                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity));
                
                return Redirect(ReturnUrl);
            }

            else
            {
                return View(user);
            }
        }
        public async System.Threading.Tasks.Task<ActionResult> LogoutAsync()
        {
            await HttpContext.SignOutAsync(
            CookieAuthenticationDefaults.AuthenticationScheme);
            return Redirect("/Home/Index");
        }
        private bool IsValid(HUser user)
        {
            return udal.GetAuthUser(user);
        }
    }
}