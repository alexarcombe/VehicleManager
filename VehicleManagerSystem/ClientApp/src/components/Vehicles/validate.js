export default (values) => {
  const errors = {};
  if (values.name.length <= 3) {
    errors.name = 'Name has to be more than 3 characters.';
  }
  if (values.speed < 0) {
    errors.speed = "Speed can't be negative.";
  }
  if (values.latitude < -90 || values.latitude > 90) {
    errors.latitude = 'Between -90 and 90.';
  }
  if (values.longitude < -180 || values.longitude > 180) {
    errors.longitude = 'Between -100 and 180.';
  }
  return errors;
};
