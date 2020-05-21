using VehicleManagerSystem.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace VehicleManagerSystem.Services
{
  public class VehicleService
  {
    private readonly IMongoCollection<Vehicle> _vehicles;

    public VehicleService(IVehicleDatabaseSettings settings)
    {
      var client = new MongoClient(settings.ConnectionString);
      var database = client.GetDatabase(settings.DatabaseName);

      _vehicles = database.GetCollection<Vehicle>(settings.VehiclesCollectionName);
    }

    public List<Vehicle> Get(string customerId) =>
        _vehicles.Find(vehicle => vehicle.customerId == customerId).ToList();

    public Vehicle GetById(string id) =>
        _vehicles.Find<Vehicle>(vehicle => vehicle.id == id).FirstOrDefault();

    public Vehicle Create(Vehicle book)
    {
      _vehicles.InsertOne(book);
      return book;
    }

    public void Update(string id, Vehicle bookIn) =>
        _vehicles.ReplaceOne(vehicle => vehicle.id == id, bookIn);

    public void Remove(Vehicle vehicleIn) =>
        _vehicles.DeleteOne(vehicle => vehicle.id == vehicleIn.id);

    public void Remove(string id) =>
        _vehicles.DeleteOne(vehicle => vehicle.id == id);
  }
}