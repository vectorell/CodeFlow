using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace CodeFlow.Models
{
    public class EntrieContext : DbContext
    {
        public EntrieContext(DbContextOptions<EntrieContext> options) : base(options)
        {
            
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("server=localhost;user=admin;password=KvastSkaft99;database=codeflow;", ServerVersion.AutoDetect("server=localhost;user=admin;password=KvastSkaft99;database=codeflow;"));
            }
        }

        public DbSet<Entrie> EntrieItems { get; set; } = null!;
    }
}