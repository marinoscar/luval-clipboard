using luval.clipboard.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace luval.clipboard.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task SendClipboard(ClipboardMessage message)
        {
            await Clients.All.SendAsync(message.Group, message);
        }
    }
}
