using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace VehicleManagerSystem.Models
{
  public class Vehicle
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string id { get; set; }

    public string customerId { get; set; }

    public string name { get; set; }

    public string model { get; set; }

    public string[] tags { get; set; }

    public string speed { get; set; }

    public string latitude { get; set; }

    public string longitude { get; set; }

    public Sensor[] sensors { get; set; }

    public Comment[] comments { get; set; }

  }
}