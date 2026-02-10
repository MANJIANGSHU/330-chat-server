const http = require('http');
const WebSocket = require('ws');

// 1. 创建一个基础的 HTTP 服务器（这是为了让 Railway 知道我们还活着）
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is running! Please use WebSocket to connect.');
});

// 2. 创建 WebSocket 服务器并绑定到上面的 HTTP 服务器上
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log('New client connected!');
    
    // 发送欢迎消息
    ws.send('Welcome! Connection successful.');

    ws.on('message', function message(data) {
        console.log('received: %s', data);
        // 收到什么就回复什么
        ws.send('Server received: ' + data);
    });
});

// 3. 监听 Railway 分配的端口
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
