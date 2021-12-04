const express =  require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const listRouter = require('./routes/lists');

dotenv.config();

const app = express();
const port = process.env.PORT || 9001

mongoose.connect(process.env.db_URL, {})
.then(()=> console.log("dbConnected"))
.catch((err) => console.log(err) )

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/lists", listRouter);

app.listen(port, ()=> console.log(`listening on : ${port}`));