using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Polonicus_API.Entities;
using Polonicus_API.Exceptions;
using Polonicus_API.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Polonicus_API.Services
{
    public interface IAccountService
    {
        void RegisterUserDto(RegisterUserDto dto);
        public UserDto LoginUser(LoginDto dto);
        public UserDto GetLoggedInUser(ClaimsPrincipal principal);
        public List<UserDto> GetAllUsers();
        public void UpgradeUser(string emailAdress);
        public void DowngradeUser(string emailAdress);
    }
    public class AccountService : IAccountService
    {
        private readonly PolonicusDbContext dbContext;
        private readonly IPasswordHasher<User> passwordHasher;
        private readonly AuthenticationSettings authentication;
        private readonly IMapper mapper;


        public AccountService(PolonicusDbContext _dbContext, IPasswordHasher<User> _passwordHasher, AuthenticationSettings _authentication, IMapper _mapper)
        {
            dbContext = _dbContext;
            passwordHasher = _passwordHasher;
            authentication = _authentication;
            mapper = _mapper;

        }

        public List<UserDto> GetAllUsers()
        {
            var users = dbContext.Users;

            var userDtos = mapper.Map<List<UserDto>>(users); 

            return userDtos;
        }

        public UserDto GetLoggedInUser(ClaimsPrincipal principal)
        {

            string userId =  principal.FindFirstValue(ClaimTypes.NameIdentifier);
            int id = int.Parse(userId);

            var user = dbContext.Users
                         .FirstOrDefault(u => u.Id == id);

            var userDto = mapper.Map<UserDto>(user);

            return userDto;
        }

        public void RegisterUserDto(RegisterUserDto dto)
        {

            var exisitingEmail = dbContext.Users.Any(u => u.Email == dto.Email);

            if (exisitingEmail) throw new BadRequestException($"Podany email {dto.Email} już istnieje");

            var newUser = new User()
            {
                Email = dto.Email,
                DateOfBirth = dto.DateOfBirth,
                Nationality = dto.Nationality,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                RoleId = 1
            };

            var hashedPassword = passwordHasher.HashPassword(newUser, dto.Password);
            newUser.PasswordHash = hashedPassword;

            dbContext.Users.Add(newUser);
            dbContext.SaveChanges();
        }

        public UserDto LoginUser(LoginDto dto)
        {
            var user = dbContext
                .Users
                .Include(u=>u.Role)
                .FirstOrDefault(u => u.Email == dto.Email);

            if (user is null) throw new BadRequestException("Invalid password or email adress");


            var result = passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);

            if(result == PasswordVerificationResult.Failed)
            {
                throw new BadRequestException("Invalid password or email adress");
            }

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.Name,$"{user.FirstName}, {user.LastName}"),
                new Claim(ClaimTypes.Role,user.Role.Name),
            };

            //klucz priv
            var expiration = DateTime.Now.AddDays(authentication.JwtExpirationDays);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authentication.JwtKey));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                authentication.JwtIssuer,
                authentication.JwtIssuer,
                claims,
                expires: expiration,
                signingCredentials: credentials
                );

            var tokenHandler = new JwtSecurityTokenHandler();

            UserDto loggedUser = mapper.Map<UserDto>(user);
            loggedUser.Token = tokenHandler.WriteToken(token);

            dbContext.SaveChanges();

            return loggedUser;
        }

        public void UpgradeUser(string emailAdress)
        {
            var user =dbContext.Users
                .FirstOrDefault(u => u.Email == emailAdress);
            user.RoleId = 2;
            dbContext.SaveChanges();
        }

        public void DowngradeUser(string emailAdress)
        {
            var user = dbContext.Users
                .FirstOrDefault(u => u.Email == emailAdress);
            user.RoleId = 1;
            dbContext.SaveChanges();
        }
        /*  public LoginDto GetToken(LoginDto dto)
          {
              var user = dbContext
                  .Users
                  .Include(u => u.Role)
                  .FirstOrDefault(u => u.Email == dto.Email);

              if (user is null) throw new BadRequestException("Invalid password or email adress");

              var result = passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);

              if (result == PasswordVerificationResult.Failed)
              {
                  throw new BadRequestException("Invalid password or email adress");
              }

              var claims = new List<Claim>()
              {
                  new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                  new Claim(ClaimTypes.Name,$"{user.FirstName}, {user.LastName}"),
                  new Claim(ClaimTypes.Role,user.Role.Name),
              };

              //klucz priv
              var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authentication.JwtKey));

              var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
              var expiration = DateTime.Now.AddDays(authentication.JwtExpirationDays);

              var token = new JwtSecurityToken(
                  authentication.JwtIssuer,
                  authentication.JwtIssuer,
                  claims,
                  expires: expiration,
                  signingCredentials: credentials
                  );

              var tokenHandler = new JwtSecurityTokenHandler();

              return tokenHandler.WriteToken(token);
          }*/


    }
}
