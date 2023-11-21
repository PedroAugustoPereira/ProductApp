import cors from 'cors';
import express from 'express';

import { sequelize } from './database';
import router from './routes';

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(router);

const PORT = process.env.SERVER_PORT || 8000;
console.log(process.env.SERVER_PORT);

app.listen(PORT, () => {
  console.log("Server Started");

  sequelize.authenticate().then(() => {
    console.log("db connection established");
  });
});
