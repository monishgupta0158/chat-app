const { Socket } = require("socket.io");



const io = require("socket.io")(8000, {
    cors: {
      origin: "http://127.0.0.1:3000", // Replace with your frontend's origin
      methods: ["GET", "POST"],
    },
  });
  



const users = {};

//if our socket is on
io.on('connection' , socket=>{

    //if NEW USERS JOINED THE CHAT 
    //THAN BROADCAST EVERYONE THE MESSAGE THAT THE NEW USER JOINED
    //AND STORES IT IN USERRS

    socket.on('new-user-joined' ,enteredName=>{

        console.log("new user"  , enteredName);

        users[socket.id] = enteredName;
        socket.broadcast.emit('user-joined' , enteredName);

    });
//IF SOMEONE IS TRYING TO SEND MESSAGE
    socket.on('send', message=>{
        socket.broadcast.emit('receive' ,{message : message , enteredName: users[socket.id]})
    });

    socket.on('disconnect' , message=>{
        socket.broadcast.emit('left' , users[socket.id]);
        delete users[socket.id];
    })
});

// console.log(`connected on port n ${port}`);
