using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polonicus_API.Entities
{
    public class Chronicle
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime PublicationDate { get; set; }

        public int OutpostId { get; set; }
        public virtual Outpost Outpost { get; set; }

    }
}
