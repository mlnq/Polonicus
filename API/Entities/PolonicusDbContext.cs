using Microsoft.EntityFrameworkCore;
using Polonicus_API.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polonicus_API.Entities
{
    public class PolonicusDbContext : DbContext
    {
        private string _connectionString = "Data Source=ACER-MM99\\SQLEXPRESS;Initial Catalog=PolonicusDb;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";


        public DbSet<Outpost> Outposts { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Chronicle> Chronicles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        //custom ustawienia dla bazy danych np, obowiazkowa nazwa itp.

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(u => u.Email)
                .IsRequired();
            
            modelBuilder.Entity<Role>()
                .Property(u => u.Name)
                .IsRequired();


            modelBuilder.Entity<Outpost>()
                .Property(o => o.Name)
                .IsRequired()
                .HasMaxLength(25);

            modelBuilder.Entity<Chronicle>()
                .Property(ch => ch.Name)
                .IsRequired();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

    }
}
