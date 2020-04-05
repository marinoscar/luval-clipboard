using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace luval.clipboard.Models
{
    public class ClipboardMessage
    {
        public string Group { get; set; }
        public string Message { get; set; }
        public byte[] ImageData { get; set; }
        public string ImageHeaders { get; set; }
    }
}
