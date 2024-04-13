using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class CompanyUsers
    {
        public int CompanyUserId { get; set; }
        public int? UserId { get; set; }
        public int? CompanyId { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }
    }
}
