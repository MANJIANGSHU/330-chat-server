const WebSocket = require('ws');

// 获取端口 (这就是你一直想加的那段逻辑)
const PORT = process.env.PORT || 8080;

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ port: PORT }, () => {
  // 这就是你给我的教程里的那句 console.log
  console.log(`Server is running on port ${PORT}`);
});

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  // 当收到手机发来的消息时
  ws.on('message', function message(data) {
    console.log('received: %s', data);
    // 把消息原样发回去 (回声)
    ws.send(data);
  });
  
  // 发送一条欢迎消息 (为了证明连上了)
  ws.send('connected'); 
});
