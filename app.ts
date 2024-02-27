
//dependencias
import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

//modulos internos
import logger from './loaders/logger';
import router from "./routes/app.routes"; 
import errors from './middleware/errors';

const app = express()
const PORT = process.env.PORT || 666;

//middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));


app.use("/api", router);
app.use(errors);

app.get('/', (req, res) => {
  logger.info("Connection")
  res.send('Backend test Claude 2.1 API')
})

app.listen(PORT, () => {
    logger.info(`Servidor corriendo en el puerto ${PORT}`);
});