const util = require('util') ;
const express = require('express');
const app = express() ;
const bodyParser = require('body-parser') ;

const testJson = require('./test/test.json');

const rest = require('./rest');
const Pool = require('./pool') ;
const pool = new Pool();

      
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile );

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        
    } else {
        next();
    }
});

app.use(bodyParser.json({limit: '10mb'})) ;
app.use(bodyParser.urlencoded({limit: '10mb', extended: true })) ;

rest(app, pool) ;


const server = app.listen(7000, function(){
    console.log("Express's started on port 7000");
});


const io = require('socket.io').listen(server, {
    log: false
    ,origins: '*:*'
    ,pingInterval: 3000
    ,pingTimeout: 5000
});

io.sockets.on('connection', (socket, opt) =>{
    util.log('>>>>>',socket.id);
    let socketId = socket.id ;
    socket.emit('message', {
        msg : 'Welcome!![' + socket.id +']'
        ,socketId : socketId
        // ,socketId : socket.id
    }); 

    util.log("connection>>", socketId, socket.handshake.query) ;

    socket.on('join', (roomId, fn)=>{
        socket.join(roomId, ()=>{
            util.log('join', roomId, Object.keys(socket.rooms));
            if (fn)
                fn();
        });
    });

    socket.on('leave', (roomId, fn)=>{
        socket.leave(roomId, () => {
            if (fn)
                fn();
        });
    });

    socket.on('rooms', (fn)=>{
        util.log('rooms=>', socket.rooms)
            if (fn)
                fn(Object.keys(socket.rooms));
    });

    // data => {room:'roomid', msg:'msg contents'}
    socket.on('message', (data, fn) =>{
        util.log('message>>', data, Object.keys(socket.rooms));
        
        
        if (fn)
         fn(data.msg);
        
        socket.broadcast.to(data.room).emit('message', data) ;
        // socket.broadcast.to(data.room).emit('message', {room: data.room, msg:data.msg}) ;
        // util.log('data.romm =>', data.room);
    });

    socket.on('message-for-one', (data,fn)=>{
        util.log('message-for-one>>', data, Object.keys(socket.rooms));
        
        if (fn)
         fn(data.msg);
        
        socket.to(data.socketid).emit('message', data) ;
    });

    socket.on('disconnecting', (data)=>{
        util.log('disconnecting>>',socket.id, Object.keys(socket.rooms));
    });

    socket.on('disconnect', (data)=>{
        util.log('disconnect>>',socket.id, Object.keys(socket.rooms));
    });
});