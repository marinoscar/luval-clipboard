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

        /// <summary>
        /// A
        /// </summary>
        /// <remarks>
        /// Articles to upload image from HTML5
        /// https://stackoverflow.com/questions/10792986/saving-html-5-canvas-as-image-on-the-server-using-asp-net/10795034
        /// https://stackoverflow.com/questions/50427513/html-paste-clipboard-image-to-file-input
        /// https://stackoverflow.com/questions/13198131/how-to-save-an-html5-canvas-as-an-image-on-a-server
        /// https://mobiarch.wordpress.com/2013/09/25/upload-image-by-copy-and-paste/
        /// </remarks>
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

        public IActionResult Privacy()
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
