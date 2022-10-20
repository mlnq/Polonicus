using Polonicus_API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polonicus_API
{
    public class PolonicusSeeder
    {
        private readonly PolonicusDbContext dbContext;

        public PolonicusSeeder(PolonicusDbContext _dbContext)
        {
            dbContext = _dbContext;
        }

        public void Seed()
        {
            if(dbContext.Database.CanConnect())
            {
                if (!dbContext.Roles.Any())
                {
                    var roles = GetRoles();
                    dbContext.Roles.AddRange(roles);
                    dbContext.SaveChanges();
                }

                if (!dbContext.Users.Any())
                {
                    var users = GetUsers();
                    dbContext.Users.AddRange(users);
                    dbContext.SaveChanges();
                }


                if (!dbContext.Outposts.Any())
                {
                    var outposts = GetOutposts();
                    dbContext.Outposts.AddRange(outposts);
                    dbContext.SaveChanges();
                }

            }
        }

        private IEnumerable<Role> GetRoles()
        {
            var roles = new List<Role>()
            {
                new Role(){ Name="User"},
                new Role(){ Name="Admin"}
            };

            return roles;
        }

        private IEnumerable<User> GetUsers()
        {
            var users = new List<User>()
            {
                new User()
                {
                     Email="test1@test.com",
                     FirstName="Adam",
                     LastName="Pożyczka",
                     DateOfBirth=new DateTime(1981,10,12),
                     Nationality="Polish",
                     PasswordHash="AQAAAAEAACcQAAAAEHJ8KiwoUFbdCaI859PuXycPi26eB37O9aAvHDSLKZAnD2aAJ2tBmbLy9I6CMXNG/Q=="
                },

                new User()
                {
                     Email="test@test.com",
                     FirstName="Adam",
                     LastName="Kwazimoto",
                     DateOfBirth=new DateTime(1981,10,12),
                     Nationality="Polish",
                     PasswordHash="AQAAAAEAACcQAAAAEDDVgY/aqYUKXEi7N3bV3baVuaX39MJwVxIps3BeK1Gw6HJx9khk8zccH4Pp6eBlmA=="
                },
                //21.11.2021 00:00:00
                new User()
                {
                     Email="admin@admin.com",
                     FirstName="Admin",
                     LastName="Admin",
                     DateOfBirth=new DateTime(1972,05,12),
                     Nationality="Polish",
                     PasswordHash="AQAAAAEAACcQAAAAEGmbzohHbgTpAjm+46T9LZmqcqZkVJtz3kous/WZZaHya3eWBnKQ7H36DpjQYo+oZQ=="
                     ,RoleId=2
                },
            };

            return users;
        }

        private IEnumerable<Outpost> GetOutposts()
        {
            var user = dbContext.Users.First();
            var outposts = new List<Outpost>()
            {
                new Outpost()
                {
                    UserId= user.Id,
                    Name="Przykładowa Placówka nr.1",
                    Description="Placówka integrująca polaków na terenach kresowych",
                    Population=1300,
                    Category="Historia Lokalna",
                    ContactEmail="kresyplacowka@wp.pl",

                    Chronicles = new List<Chronicle>()
                    {
                        new Chronicle()
                        {
                            Name="Wrzesniowy poranek w Grodnie",
                            Description="Lorem ipsum...",
                            PublicationDate=new DateTime(2018,12,23)
                        },
                        new Chronicle()
                        {
                            Name="Kamienny posąg nieopodal Tykocina",
                            Description="Lorem ipsum...",
                            PublicationDate= new DateTime(2018, 1, 3)
                        }
                    },
                     Address = new Address()
                    {
                        City="Kowno",
                        Street="Kaunas 13",
                        PostalCode="33-222"
                    }
                },
                new Outpost()
                {
                    UserId= user.Id,
                    Name="Przykładowa Placówka nr.2",
                    Description="Placówka integrująca polaków na terenach kresowych",
                    Population=2700,
                    Category="Historia Lokalna",
                    ContactEmail="belarus@wp.ru",


                    Chronicles = new List<Chronicle>()
                    {
                        new Chronicle()
                        {
                            Name="Wielkie księstwo litewskie",
                            Description="Lorem ipsum...",
                            PublicationDate=new DateTime(2018,12,23)
                        },
                        new Chronicle()
                        {
                            Name="Powstanie urzedu..",
                            Description="Lorem ipsum...",
                            PublicationDate= new DateTime(2019, 1, 3)
                        }
                    }

                    ,
                    Address = new Address()
                    {
                        City="Grodno",
                        Street="Musnikov 13",
                        PostalCode="70-012"
                    }
                }
            };
            return outposts;
        }
    }
}
