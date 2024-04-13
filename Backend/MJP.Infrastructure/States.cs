using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class States
    {
        public States()
        {
            Companies = new HashSet<Companies>();
        }

        public int StateId { get; set; }
        public string StateName { get; set; }
        public string DisplayName { get; set; }
        public string LastUpdatdBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        public virtual ICollection<Companies> Companies { get; set; }
    }
}
