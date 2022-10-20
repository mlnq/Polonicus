using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Polonicus_API.Models
{
    public class CreateChronicleDto
    {

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public string PublicationDate { get; set; }

        public int OutpostId { get; set; }
    }
}
