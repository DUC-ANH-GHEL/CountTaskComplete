const WebSocket = require('ws');

// Tạo máy chủ WebSocket
const wss = new WebSocket.Server({ port: 8080 });

// Xử lý sự kiện khi có kết nối mới
wss.on('connection', function (socket) {
    console.log('Kết nối mới được thiết lập');

    // Xử lý sự kiện khi nhận được tin nhắn từ client
    socket.on('message', function (message) {
        console.log('Nhận tin nhắn:', message);

        // Gửi tin nhắn đến tất cả các client khác
        wss.clients.forEach(function (client) {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Xử lý sự kiện khi kết nối bị đóng
    socket.on('close', function () {
        console.log('Kết nối đã bị đóng');
    });

    // Xử lý sự kiện khi xảy ra lỗi kết nối
    socket.on('error', function (error) {
        console.log('Lỗi kết nối:', error);
    });
});
wss.on('listening', function () {
    console.log('Server is running on port 8000');
});

wss.on('error', function (error) {
    console.log('Server error:', error);
});

// Bắt đầu lắng nghe kết nối từ client
wss.on('listening', function () {
    console.log('Server is running on port 8000');
});

wss.on('error', function (error) {
    console.log('Server error:', error);
});
