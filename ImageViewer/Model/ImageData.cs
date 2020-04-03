namespace ImageViewer.Model
{
    public class ImageData
    {
        public Photos photos { get; set; }
        public string stat { get; set; }
    }

    public class Photos
    {
        public long page { get; set; }
        public long pages { get; set; }
        public long perpage { get; set; }
        public string total { get; set; }
        public Photo[] photo { get; set; }
    }

    public class Photo
    {
        public string id { get; set; }
        public string owner { get; set; }
        public string secret { get; set; }
        public string server { get; set; }
        public long farm { get; set; }
        public string title { get; set; }
        public long ispublic { get; set; }
        public long isfriend { get; set; }
        public long isfamily { get; set; }


        public string Url => $"http://farm{farm}.staticflickr.com/{server}/{id}_{secret}_q.jpg";
    }
}