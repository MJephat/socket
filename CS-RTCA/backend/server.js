const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const router = require("./routes/chatRoutes");
const chatRoutes = require("./routes/chatRoutes");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());  // to accept json data



app.get('/', (req, res) => {
    res.send("Api is running!")
})

app.use('/api/user', userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`server started on port ${PORT}!`.yellow.bold));