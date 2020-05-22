using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace VehicleManagerSystem.Models
{
  public class Sensor
  {

    public string name { get; set; }

    public string value { get; set; }

  }
}