using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polonicus_API.Models
{
    public class OutpostDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        
        public string Country { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string PostalCode { get; set; }
        public string Coord_latitude { get; set; }
        public string Coord_longtiude { get; set; }

        public List<ChronicleDto> Chronicles{ get; set; }

    }
}
