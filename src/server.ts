import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();

import { errorHandler } from './middlewares/error.middleware';
import routes from './routes';

import { connectDB } from './configs/database';
import { ApiError } from './utils/api.error';
import { apiResponse } from './utils/api.response';
import { config } from './configs/config';
import { initializeWorker } from './worker/evaluation.worker';

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api/health', (req, res) => {

  apiResponse(res, {
    message: 'Server is running..',
  });
});

app.use("/api", routes)

app.use((req, res, next) => {
  next(new ApiError(404, 'Route not found'));
});


app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  initializeWorker();
  const PORT = config.port;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer().catch(console.error);