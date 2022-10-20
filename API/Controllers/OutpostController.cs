using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Polonicus_API.Entities;
using Polonicus_API.Models;
using Polonicus_API.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polonicus_API.Controllers
{
    [Route("api/outpost")]
    [ApiController]

    //[Authorize]
    public class OutpostController : ControllerBase
    {
        private readonly IOutpostService outpostService;

        public OutpostController(IOutpostService _outpostService)
        {
            outpostService = _outpostService;
        }
        [Authorize]
        [HttpPost]
        public ActionResult Post([FromBody] CreateOutpostDto dto)
        {
            var id = outpostService.Create(dto, HttpContext.User);

            return Created($"/api/outpost/{id}", new { id = id });
        }

        [Route("all")]
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<IEnumerable<OutpostDto>> GetAll()
        {
            var outposts = outpostService.GetAll();

            return Ok(outposts);
        }

        [HttpGet]
        public ActionResult<IEnumerable<OutpostDto>> GetAllUserOutpost()
        {
            var outposts = outpostService.GetAllUserOutpost(HttpContext.User);
            
            return Ok(outposts);
        }

        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Outpost>> Get([FromRoute] int id)
        {
            var outpost = outpostService.GetById(id);

            return Ok(outpost);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete([FromRoute] int id)
        {
            outpostService.Delete(id);

            return NoContent();
        }

        [HttpPut("{id}")]
        public ActionResult Put([FromRoute] int id,[FromBody] OutpostDto dto)
        {
            outpostService.Update(id,dto);
            return Ok();
        }


    }
}
