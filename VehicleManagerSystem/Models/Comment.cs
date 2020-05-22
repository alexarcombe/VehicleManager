using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace VehicleManagerSystem.Models
{
  public class Comment
  {

    public string by { get; set; }

    public string comment { get; set; }

    public string date { get; set; }

  }
}