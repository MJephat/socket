const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const router = require("./routes/chatRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoute = require("./routes/messageRoute");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());  // to accept json data



app.get('/', (req, res) => {
    res.send("Api is running!")
})

app.use('/api/user', userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoute);


app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 8080;

const server =  app.listen(PORT, console.log(`server started on port ${PORT}!`.yellow.bold));
const io = require("socket.io")(server, {
//   pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});


io.on ("connection", (socket) =>{
    console.log("connected to socket.io");


     socket.on("setup", (userData) => {
       socket.join(userData._id);
       console.log(userData._id);
       socket.emit("connected");

     });

     socket.on("join chat", (room) =>{
        socket.join(room);
        console.log("joined chat room" + room);
     });

     socket.on("new message", (newMessageRecieved) => {
       var chat = newMessageRecieved.chat;

       if (!chat.users) return console.log("chat.users not defined");

       chat.users.forEach((user) => {
         if (user._id == newMessageRecieved.sender._id) return;

         socket.in(user._id).emit("message recieved", newMessageRecieved);
       });
     });

});