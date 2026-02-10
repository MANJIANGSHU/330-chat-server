const WebSocket = require('ws');

// 获取 Railway 分配的端口，如果没有则使用 8080
const port = process.env.PORT || 8080;

// 创建服务器
const wss = new WebSocket.Server({ port: port }, () => {
    console.log(`Server started on port ${port}`);
});

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function message(data) {
    console.log('received: %s', data);
    // 当收到消息时，发回给客户端（这里是个简单的回声测试）
    ws.send('Server received: ' + data);
  });
  
  ws.send('Welcome to the Railway server!');
});
