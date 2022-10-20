using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polonicus_API.Entities
{
    public class Outpost
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Population { get; set; }
        public string Category { get; set; }
        public string ContactEmail { get; set; }
        public string ContactNumber { get; set; }

        public int AddressId { get; set; }
        public virtual Address Address { get; set; }

        public virtual List<Chronicle> Chronicles { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

    }
}
