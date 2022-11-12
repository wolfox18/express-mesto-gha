import express from "express";
import mongoose from "mongoose";
import path from 'path';
import bodyParser from 'body-parser';
import { router as usersRouter} from "./routes/users.js";

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use('/', usersRouter);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
