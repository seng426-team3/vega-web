import user from './auth/UserManager.js';
import auth from './auth/AuthenticationManager.js';
import fileUploader from './controller/FileUploadController.js';
import adminPanel from './controller/AdminPanelController.js'
import vault from './controller/VaultController.js';
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import news from './controller/NewsController.js';
import contactus from './controller/ContactUsController.js';
import helmet from 'helmet';

const app = express();
const port = 8000;
const env = config();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));
app.disable('x-powered-by');

if (process.env.NODE_ENV === 'development') {
  var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));
}

app.get('/', (req, res) => {
  res.send('Hello World!')
});


app.use("/api/login", auth);
app.use("/api/signup", user);
app.use("/api/venus", fileUploader);
app.use("/api/venus/vault", vault);
app.use("/api/venus/news", news)
app.use("/api/venus/contactus", contactus)
app.use("/api/venus/admin", adminPanel)

app.listen(port, () => {
  console.log(process.env.API_URL);
  console.log(`Example app listening on port ${port}!`)
});