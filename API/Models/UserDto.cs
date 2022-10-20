using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polonicus_API.Models
{
    public class UserDto
    {
     public string Email { get; set; }

     public string Password { get; set; }

     public string Nationality { get; set; }

     public DateTime? DateOfBirth { get; set; }

     public string FirstName { get; set; }

     public string LastName { get; set; }

     public string Token { get; set; } 

     public int RoleId { get; set; } = 1;
    }
}
