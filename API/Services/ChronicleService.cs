using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Polonicus_API.Entities;
using Polonicus_API.Exceptions;
using Polonicus_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polonicus_API.Services
{
    public interface IChronicleService
    {
        int Create(int outpostId, CreateChronicleDto dto);
        List<ChronicleDto> GetAllFromOutpost(int outpostId);
        List<ChronicleDto> GetAll();
        string Delete(int outpostId, int chronicleId);
        ChronicleDto GetById(int outpostId, int chronicleId);
        void Update(int outpostId, int chronicleId, ChronicleDto dto);
        ChronicleDto GetLastDate();
        Task AppendImage(int outpostId, int chronicleId, string imgPath);
    }

    public class ChronicleService : IChronicleService
    {
        private readonly PolonicusDbContext dbContext;
        private readonly IMapper mapper;

        public ChronicleService(PolonicusDbContext _dbContext, IMapper _mapper)
        {
            dbContext = _dbContext;
            mapper = _mapper;
        }

        public int Create(int outpostId, CreateChronicleDto dto)
        {

            var outpost = GetOutpostById(outpostId);

            dto.OutpostId = outpost.Id;
            var chronicleEntity = mapper.Map<Chronicle>(dto);

            dbContext.Chronicles.Add(chronicleEntity);
            dbContext.SaveChanges();


            return chronicleEntity.Id;
        }

        public async Task AppendImage(int outpostId, int chronicleId, string imagePath)
        {
            var chronicle = GetChronicleById(outpostId,chronicleId);

           chronicle.ImagePath = imagePath;
           dbContext.SaveChanges();
        }

        public Outpost GetOutpostById(int outpostId)
        {
            var outpost = dbContext
                           .Outposts
                           .FirstOrDefault(o => o.Id == outpostId);

            if (outpost is null) throw new NotFoundException("outpost not found");

            return outpost;
        }

        public Chronicle GetChronicleById(int outpostId, int chronicleId)
        {
            var outpost = GetOutpostById(outpostId);

            var chronicle = dbContext
                                .Chronicles
                                .FirstOrDefault(c => (c.Id == chronicleId));

            if (chronicle is null || chronicle.OutpostId != outpostId) throw new NotFoundException("Chronicle not found");

            return chronicle;
        }

        public ChronicleDto GetById(int outpostId, int chronicleId)
        {
            var chronicle = GetChronicleById(outpostId,chronicleId);

            var chronicleDto = mapper.Map<ChronicleDto>(chronicle);

            return chronicleDto;
        }

        public List<ChronicleDto> GetAll()
        {
            var chronicles = dbContext.Chronicles;

            if (chronicles is null) throw new NotFoundException("outpost not found");

            var chroniclesDtos = mapper.Map<List<ChronicleDto>>(chronicles);

            return chroniclesDtos;
        }


        public ChronicleDto GetLastDate()
        {
            var chronicle = dbContext.Chronicles.OrderBy(c=>c.PublicationDate).First();

            if (chronicle is null) throw new NotFoundException("outpost not found");

            var chronicleDto = mapper.Map<ChronicleDto>(chronicle);

            return chronicleDto;
        }

        public List<ChronicleDto> GetAllFromOutpost(int outpostId)
        {
            var outpost = dbContext
                                       .Outposts
                                       .Include(d => d.Chronicles)
                                       .FirstOrDefault(o => o.Id == outpostId);

            if (outpost is null) throw new NotFoundException("outpost not found");

            var chroniclesDtos = mapper.Map<List<ChronicleDto>>(outpost.Chronicles);

            return chroniclesDtos;
        }

        public string Delete(int outpostId, int chronicleId)
        {
            var chronicle = GetChronicleById(outpostId,chronicleId);
            var imgUrl = chronicle.ImagePath;

            dbContext
                .Chronicles
                .Remove(chronicle);
            dbContext.SaveChanges();

            return imgUrl;
        }

        public void Update(int outpostId,int chronicleId,ChronicleDto dto)
        {
            var chronicle = GetChronicleById(outpostId,chronicleId);

            chronicle.Name= dto.Name;
            chronicle.Description = dto.Description;
            dbContext.SaveChanges();
            
        }
              
    }
}
