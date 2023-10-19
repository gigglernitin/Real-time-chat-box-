// node server which will handle socket io connection
const io = require('socket.io')(8000)

const user = {};

io.on('connection', socket =>{
    socket.io('new-user-joined',name=>{
        console.log("New user",name)
       user[socket.id]=name;
       socket.broadcast.emit('user-joined',name); 
    });

    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id])
        delete user[socket.id];
    });
})