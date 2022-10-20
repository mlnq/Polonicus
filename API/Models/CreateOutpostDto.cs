using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Polonicus_API.Models
{
    public class CreateOutpostDto
    {
        [Required]
        [MaxLength(25)]
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }

        public string ContactEmail { get; set; }
        public string ContactNumber { get; set; }


        [Required]
        [MaxLength(50)]
        public string Country { get; set; }

        [Required]
        [MaxLength(50)]
        public string City { get; set; }

        public string Street { get; set; }

        public string PostalCode { get; set; }

        public string Coord_latitude { get; set; }
        public string Coord_longtiude { get; set; }


        public int UserId { get; set; }
    }
}
