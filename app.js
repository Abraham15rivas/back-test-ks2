//==================================================
//              DEPENDENCIES
//==================================================
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

//==================================================
//              Modules
//==================================================
import routes from './routes/index.js';
import { syncModel } from './config/database/connection.js'
import { config, corsOptionsDelegate } from './config/app/index.js'

//==================================================
//              API - RestFul
//==================================================
const app = express();
const HTTP_PORT = process.env.HTTP_PORT;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptionsDelegate))
app.use(helmet());
app.disable('x-powered-by');
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'"],
      fontSrc: ["'self'"]
    },
  })
);

app.use('/api/v1', routes);
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

/* Run Serve */
app.listen(HTTP_PORT, async () => {
  await syncModel(config.listOfModelsToSync)
  console.log('listening on port 3000');
})