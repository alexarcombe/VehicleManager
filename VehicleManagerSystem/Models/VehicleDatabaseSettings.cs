namespace VehicleManagerSystem.Models
{
    public class VehicleDatabaseSettings : IVehicleDatabaseSettings
    {
        public string VehiclesCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IVehicleDatabaseSettings
    {
        string VehiclesCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}