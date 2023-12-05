import Express from 'express';
import assignmentRoutes from "./routes/assignmentRoutes.js";
import userRouter from './routes/userRoutes.js';
import healthRoutes from './routes/healthRoutes.js'
import { bootstrap } from './services/userService.js';
import ApitrackFun from './services/metrics.js';

const app = Express();
const PORT = 3001;
app.use(ApitrackFun);
app.use(Express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization,x-access-token');
    next();
  });
  
  app.use(userRouter);
  app.use(assignmentRoutes);
  app.use(healthRoutes);
  
  app.listen(PORT,()=>{
    console.log("Server is running on",PORT);
})

bootstrap()
export default app;