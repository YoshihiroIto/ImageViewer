using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace ImageViewer.Model
{
    public class ImageLoader
    {
        private readonly HttpClient _httpClient;

        public ImageLoader(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public Task<ImageData> LoadAsync(string tags)
        {
            var url = MakeRequestUrl(tags);

            return _httpClient.GetFromJsonAsync<ImageData>(url);
        }

        private static string MakeRequestUrl(string tags)
            => $"https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f5da5b9adea8918bba00916e81bc1a85&tags={tags}&format=json&nojsoncallback=1";
    }
}