
//dependencias
import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

//modulos internos
import logger from './src/loaders/logger';
import router from "./src/routes/app.routes"; 
import errors from './src/middleware/errors';
import getPublic from "./src/utils/path"

const app = express()
const PORT = process.env.PORT || 666;

//middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use(express.static(getPublic()));

app.use("/api", router);
app.use(errors);

app.get('/', (req, res) => {
  logger.info("Connection")
  res.send('Backend test Claude 2.1 API')
})


app.listen(PORT, () => {
    logger.info(`Servidor corriendo en el puerto ${PORT}`);
});