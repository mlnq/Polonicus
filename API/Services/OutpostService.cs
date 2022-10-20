using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Polonicus_API.Entities;
using Polonicus_API.Exceptions;
using Polonicus_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Polonicus_API.Services
{
    public interface IOutpostService
    {
        public List<OutpostDto> GetAll();
        public OutpostDto GetById(int id);
        public int Create(CreateOutpostDto dto, ClaimsPrincipal principal);
        public void Delete(int id);
        public void Update(int id, OutpostDto dto);
        public List<OutpostDto> GetAllUserOutpost(ClaimsPrincipal principal);

    }

    public class OutpostService: IOutpostService
    {
        private readonly PolonicusDbContext dbContext;
        private readonly IMapper mapper;
        private readonly ILogger<OutpostService> logger;


        public OutpostService(PolonicusDbContext _dbContext, IMapper _mapper, ILogger<OutpostService> _logger)
        {
            dbContext = _dbContext;
            mapper = _mapper;
            logger = _logger;
        }
        
        public OutpostDto GetById(int id)
        {
            var outpost = dbContext
                .Outposts
                .Include(o => o.Address)
                .Include(o => o.Chronicles)
                .FirstOrDefault(o => o.Id == id);

           var outpostDto = mapper.Map<OutpostDto>(outpost);

            if (outpost is null)
            {
                throw new NotFoundException("Outpost not found");
            }
            return outpostDto;
        }

        public int Create(CreateOutpostDto dto, ClaimsPrincipal principal)
        {
            string userIdClaim = principal.FindFirstValue(ClaimTypes.NameIdentifier);
            int userId = int.Parse(userIdClaim);

            var outpost = mapper.Map<Outpost>(dto);
            outpost.UserId = userId;

            dbContext.Outposts.Add(outpost);
            dbContext.SaveChanges();

            return outpost.Id;
        }

        public void Delete(int id)
        {
            logger.LogError($"Outpost with id: {id} DELETE action invoked");
            
            var outpost = dbContext
                .Outposts
                .FirstOrDefault(o => o.Id == id);

            dbContext.Outposts.Remove(outpost);
            dbContext.SaveChanges();
        }

             public List<OutpostDto> GetAllUserOutpost(ClaimsPrincipal principal)
        {
            string userIdClaim = principal.FindFirstValue(ClaimTypes.NameIdentifier);
            int userId = int.Parse(userIdClaim);

            var outposts = dbContext
                .Outposts
                .Include(o => o.Address)
                .Include(o => o.Chronicles)
                .Include(o => o.User)
                .Where(u=>u.UserId ==userId)
                .ToList();


            var outpostDto = mapper.Map<List<OutpostDto>>(outposts);

            return outpostDto;
        }

        public List<OutpostDto> GetAll()
        {
            var outposts = dbContext
                .Outposts
                .Include(o => o.Address)
                .Include(o => o.Chronicles)
                .ToList();

            var outpostDto = mapper.Map<List<OutpostDto>>(outposts);

            return outpostDto;
        }

        public void Update(int id, OutpostDto dto)
        {
            var outpost = dbContext.Outposts.Include(o=> o.Address).FirstOrDefault(e => e.Id == id);

            //var outpostEdit = mapper.Map<Outpost>(dto);

            outpost.Name = dto.Name;
            outpost.Description = dto.Description;

            /*outpost = outpostEdit;*/

            dbContext.SaveChanges();
        }

    }
}
