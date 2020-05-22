using VehicleManagerSystem.Models;
using VehicleManagerSystem.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace VehicleManagerSystem.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class VehiclesController : ControllerBase
  {

    private readonly VehicleService _vehicleService;

    public VehiclesController(VehicleService vehicleService)
    {
      _vehicleService = vehicleService;
    }

    [HttpGet("{customerId}")]
    public ActionResult<List<Vehicle>> Get(string customerId) =>
        _vehicleService.Get(customerId);

    // [HttpGet("{id:length(24)}", Name = "GetVehicle")]
    // public ActionResult<Vehicle> Get(string id)
    // {
    //     var vehicle = _vehicleService.Get(id);

    //     if (vehicle == null)
    //     {
    //         return NotFound();
    //     }

    //     return vehicle;
    // }

    [HttpPost]
    public ActionResult<Vehicle> Create(Vehicle vehicle)
    {
      return _vehicleService.Create(vehicle);
    }

    [HttpPut("{id:length(24)}")]
    public ActionResult<Vehicle> Update(string id, Vehicle vehicleIn)
    {
      var vehicle = _vehicleService.Get(id);

      if (vehicle == null)
      {
        return NotFound();
      }

      _vehicleService.Update(id, vehicleIn);

      return vehicleIn;
    }

    [HttpDelete("{id:length(24)}")]
    public IActionResult Delete(string id)
    {
      var vehicle = _vehicleService.Get(id);

      if (vehicle == null)
      {
        return NotFound();
      }

      _vehicleService.Remove(id);

      return NoContent();
    }
  }
}
