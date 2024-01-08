using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFlow.Models
{
    public class Entrie
    {
        public long Id { get; set; }
        
        [Required(ErrorMessage = "Titel är obligatoriskt.")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Titeln måste vara mellan 3 och 50 tecken långt.")]
        public string? Title { get; set; }

        public string? Syntax { get; set; }
        public string? Examples { get; set; }

        [Required(ErrorMessage = "Beskrivning är obligatoriskt.")]
        [StringLength(150, MinimumLength = 3, ErrorMessage = "Beskrivningen måste vara mellan 3 och 150 tecken långt.")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Ämne är obligatoriskt.")]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "Ämne måste vara mellan 3 och 20 tecken långt.")]
        public string? Field { get; set; }
        
        public string? Subject { get; set; }
        public string[]? Related { get; set;}
    }
}