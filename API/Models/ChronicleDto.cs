using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polonicus_API.Models
{
    public class ChronicleDto
    {
        public int Id { get; set; }

        public string Name { get; set; }
        
        public string Description { get; set; }
        
        public DateTime PublicationDate { get; set; }
        
        public int OutpostId { get; set; }

    }
}
