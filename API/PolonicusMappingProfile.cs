using AutoMapper;
using Polonicus_API.Entities;
using Polonicus_API.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Polonicus_API
{
    public class PolonicusMappingProfile : Profile
    {
        public PolonicusMappingProfile()
        {
            CreateMap<Outpost, OutpostDto>()
                .ForMember(m => m.Country, c => c.MapFrom(s => s.Address.Country))
                .ForMember(m => m.City, c => c.MapFrom(s => s.Address.City))
                .ForMember(m => m.Street, c => c.MapFrom(s => s.Address.Street))
                .ForMember(m => m.Coord_latitude, c => c.MapFrom(s => s.Address.Coord_latitude))
                .ForMember(m => m.Coord_longtiude, c => c.MapFrom(s => s.Address.Coord_longtiude))
                .ForMember(m => m.PostalCode, c => c.MapFrom(s => s.Address.PostalCode));

            CreateMap<CreateOutpostDto, Outpost>()
                .ForMember(o => o.Address,
                    c => c.MapFrom(dto => new Address()
                    { Country = dto.Country, 
                      City = dto.City, 
                      Street = dto.Street, 
                      PostalCode = dto.PostalCode , 
                      Coord_latitude=dto.Coord_latitude, 
                      Coord_longtiude=dto.Coord_longtiude})); 


            CreateMap<Chronicle, ChronicleDto>();
            CreateMap<CreateChronicleDto, Chronicle>()
                .ForMember(
                    m => m.PublicationDate, 
                    p => p.MapFrom(s => DateTime.Parse(s.PublicationDate,CultureInfo.InvariantCulture))
                );
            //s.PublicationDate,"yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture
            CreateMap<OutpostDto, Outpost>();

            CreateMap<User, UserDto>();
                
        }
    }
}
