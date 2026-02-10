const WebSocket = require('ws');

// 1. 创建 WebSocket 服务器
// 注意：这里我们不创建 HTTP 服务器了，直接用最原始的方式，减少干扰
const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

console.log(`Server started`);

wss.on('connection', function connection(ws) {
  // 连上后，服务器保持沉默，不发 Welcome 消息
  // 避免因为发了文本消息导致对方解析失败
  console.log('Client connected');

  ws.on('message', function message(data) {
    // 收到什么，就原封不动发回去（Echo）
    // 或者广播给其他人（取决于你的需求，这里先做回声测试）
    console.log('received: %s', data);
    ws.send(data);
  });
});
