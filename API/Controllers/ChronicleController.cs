using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Polonicus_API.Models;
using Polonicus_API.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polonicus_API.Controllers
{
    
    [ApiController]
    public class ChronicleController : ControllerBase
    {
        private readonly IChronicleService chronicleService;
        private readonly ILocalImageService localImageService;

        public ChronicleController(IChronicleService _chronicleService, ILocalImageService _localImageService)
        {
            chronicleService = _chronicleService;
            localImageService = _localImageService;
        }

        [Route("api/outpost/{outpostId}/chronicle")]
        [HttpPost]
        public ActionResult Post([FromRoute] int outpostId,[FromBody] CreateChronicleDto dto)
        {
            
            var newChronicleId = chronicleService.Create(outpostId,dto);
            return Created($"/api/{outpostId}/chronicle/{newChronicleId}", new { id = newChronicleId });
        }

        //IDK
        [Route("api/outpost/{outpostId}/chronicle/{chronicleId}/photo")]
        [HttpPost]
        public async Task<ActionResult> PostFile([FromRoute] int outpostId, [FromRoute] int chronicleId,IFormFile file)
        {
            if (file != null)
            {
                string imgUrl = await localImageService.UploadFile(file);
                chronicleService.AppendImage(outpostId, chronicleId, imgUrl);

                return Ok(imgUrl);
            }

            return NoContent();
        }

        [Route("api/outpost/{outpostId}/chronicle/{chronicleId}")]
        [HttpPut]
        public async Task<ActionResult> Put([FromRoute] int outpostId, [FromRoute] int chronicleId, [FromBody] ChronicleDto dto)
        {
            chronicleService.Update(outpostId, chronicleId, dto);
            return Ok();
        }

        [Route("api/outpost/{outpostId}/chronicle")]
        [HttpGet]
        public ActionResult Get([FromRoute] int outpostId)
        {
            var chronicles = chronicleService.GetAllFromOutpost(outpostId);

            return Ok(chronicles);
        }

        //@TODO
        [Route("api/chronicles")]
        [HttpGet]
        public ActionResult GetAll()
        {
            var chronicles = chronicleService.GetAll();

            return Ok(chronicles);
        }
        //@TODO
        [Route("api/chronicles/last")]
        [HttpGet]
        public ActionResult GetLastDate()
        {
            var chronicle = chronicleService.GetLastDate();

            return Ok(chronicle);
        }

        [Route("api/outpost/{outpostId}/chronicle/{chronicleId}")]
        [HttpGet]
        public ActionResult Get([FromRoute] int outpostId, [FromRoute] int chronicleId)
        {
            var chronicle = chronicleService.GetById(outpostId,chronicleId);

            return Ok(chronicle);
        }

        [Route("api/outpost/{outpostId}/chronicle/{chronicleId}")]
        [HttpDelete]
        public ActionResult Delete([FromRoute] int outpostId, [FromRoute] int chronicleId)
        {
            string imgUrl = chronicleService.Delete(outpostId,chronicleId);
            localImageService.DeleteFile(imgUrl);

            return NoContent();
        }

       


    }
}
