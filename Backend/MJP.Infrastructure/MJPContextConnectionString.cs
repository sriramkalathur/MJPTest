using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class MJPContext : DbContext
    {
        public static string ConnectionString { get; set;}
    }
}
