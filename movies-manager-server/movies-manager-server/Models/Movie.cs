using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace movies_manager_server.Models
{
    public class Movie
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public int YearOfRelease { get; set; }
        public int Duration { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public List<string> actors { get; set; }
    }
}
