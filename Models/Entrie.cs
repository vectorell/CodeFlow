using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFlow.Models
{
    public class Entrie
    {
        public long Id { get; set; }
        public string? Title { get; set; }
        public string? Syntax { get; set; }
        public string? Examples { get; set; }
        public string? Description { get; set; }
        public string? Field { get; set; }
        public string? Subject { get; set; }
        public string[]? Related { get; set;}
    }
}