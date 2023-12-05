import StatsD from 'hot-shots';
 
const statsd = new StatsD();
 
// Middleware for tracking API calls and sending custom metrics
const ApitrackFun = (req, res, next) => {
  // Your API logic here
 
  // Track the API call by incrementing a custom metric
  const apiName = req.path; // You can adjust this to track the specific API
  statsd.increment(`api.${apiName}.calls`);
 
  next();
};
 
export default ApitrackFun;