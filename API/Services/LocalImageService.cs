using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Polonicus_API.Exceptions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Polonicus_API.Services
{
    public interface ILocalImageService
    {
        public Task<string> UploadFile(IFormFile file);
        public Task DeleteFile(string path);
    }

    public class LocalImageService: ILocalImageService
    {
        private readonly IWebHostEnvironment _env;
        private readonly string photoUrl;
        private readonly string rootUrl;

        public LocalImageService(IWebHostEnvironment environment)
        {
            _env = environment;
            photoUrl = Path.Combine(_env.WebRootPath, @"api\PhotoStorage");
            rootUrl = _env.WebRootPath;
        }


        public async Task<string> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0) throw new NotFoundException("File doesn't exits");

            var imageName = file.FileName;
            var guid = Guid.NewGuid().ToString();
            var fileName = String.Concat(guid,";Title_",imageName);

            var path = Path.Combine(photoUrl, fileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

             return $@"{fileName}";
        }


        public async Task DeleteFile(string path)
        {
            /*  string filePath = Path.Join(rootUrl, path);*/
            var fullPath = Path.Join(photoUrl, path);
            File.Delete(fullPath);
        }

    }
}
