using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using luval.clipboard.Models;
using Microsoft.AspNetCore.Http;
using luval.clipboard.Hubs;
using Microsoft.AspNetCore.SignalR;
using System.IO;
using System.Net;

namespace luval.clipboard.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public HomeController(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost("SendMessage")]
        public async Task<IActionResult> SendMessage(ClipboardMessage msg, IFormFile ImageData)
        {
            System.Diagnostics.Debug.WriteLine(msg.Message);
            if(ImageData != null)
            {
                using (var bytes = new MemoryStream())
                {
                    using (var buffer = ImageData.OpenReadStream())
                    {
                        buffer.CopyTo(bytes);
                        msg.ImageData = bytes.ToArray();
                        msg.ImageHeaders = "data:" + ImageData.ContentType + ";base64,";
                    }
                }
            }
            await _hubContext.Clients.All.SendAsync(msg.Group, msg);
            return new OkResult();
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult TermsOfService()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
