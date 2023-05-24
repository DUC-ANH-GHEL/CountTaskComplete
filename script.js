// Ngày bắt đầu
var startDate = new Date('2023-05-20');

// Mảng chứa các câu trích dẫn động lực
var quotes = [
    "Kỷ luật - Cố lên",
    "Câu trích dẫn 2",
    "Câu trích dẫn 3",
    // Thêm các câu trích dẫn khác
];

function getQuotes() {
    // Cấu trúc Header của yêu cầu
    const headers = {
        'Authorization': 'Bearer CfVvIWPaxIQhVBBhV5TFhoW6F6sNh2oP4m52Ele4',
    };

    // Gửi yêu cầu GET đến API với Header và param language=en
    fetch('https://quotes.rest/qod?language=en', { headers })
        .then(response => response.json())
        .then(data => {
            // Xử lý kết quả trả về
            const quotes = data.contents.quotes;
            const quoteStrings = quotes.map(quote => quote.quote);
            const result = quoteStrings.join('\n');
            console.log(result); // In ra kết quả dưới dạng chuỗi
        })
        .catch(error => {
            // Xử lý lỗi (nếu có)
            console.error('Đã xảy ra lỗi:', error);
        });
}




// Lấy thẻ div calendar từ DOM
var calendar = document.getElementById('calendar');

// Tạo bộ lịch
function createCalendar() {
    var currentDate = new Date();
    var monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

    for (var i = 0; i < 12; i++) {
        var monthDiv = document.createElement('div');
        monthDiv.classList.add('calendar-month');

        var monthHeader = document.createElement('h2');
        monthHeader.innerText = monthNames[i];
        monthDiv.appendChild(monthHeader);

        var daysInMonth = new Date(startDate.getFullYear(), i + 1, 0).getDate();
        console.log("thang i", daysInMonth);
        for (var j = 1; j <= daysInMonth; j++) {
            var dayDiv = document.createElement('div');
            dayDiv.classList.add('calendar-day');
            if (i >= startDate.getMonth() && i < currentDate.getMonth()) {
                dayDiv.classList.add("past");
            }
            if (startDate.getFullYear() === currentDate.getFullYear() && i === currentDate.getMonth() && j >= startDate.getDate() && j <= currentDate.getDate()) {
                dayDiv.classList.add('past');
                // dayDiv.classList.add('past');
            }

            dayDiv.innerText = j;
            monthDiv.appendChild(dayDiv);
        }

        calendar.appendChild(monthDiv);
    }
}

// Tính số ngày đã trôi qua từ ngày bắt đầu đến ngày hiện tại
function calculateDayDiff() {
    var currentDate = new Date();
    var timeDiff = Math.abs(currentDate.getTime() - startDate.getTime());
    var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDiff;
}

// Hiển thị số ngày đã trôi qua lên giao diện
function displayDayCounter() {
    var dayDiff = calculateDayDiff();
    var dayCounter = document.getElementById('dayCounter');
    dayCounter.innerHTML = 'Số ngày đã thành công: <span class="dayDiff">' + dayDiff + '</span>';

    // Lấy phần tử chứa chữ số dayDiff
    var dayDiffElement = dayCounter.querySelector('.dayDiff');

    // Xóa các lớp CSS màu sắc hiện tại
    dayDiffElement.classList.remove('dayDiff--red', 'dayDiff--yellow', 'dayDiff--green', 'dayDiff--blue', 'dayDiff--pink');

    // Áp dụng lớp CSS màu sắc tương ứng dựa trên giá trị của dayDiff
    if (dayDiff < 10) {
        dayDiffElement.classList.add('dayDiff--red');
    } else if (dayDiff >= 10 && dayDiff <= 20) {
        dayDiffElement.classList.add('dayDiff--yellow');
    } else if (dayDiff > 20 && dayDiff <= 30) {
        dayDiffElement.classList.add('dayDiff--green');
    } else if (dayDiff > 30 && dayDiff <= 40) {
        dayDiffElement.classList.add('dayDiff--blue');
    } else {
        dayDiffElement.classList.add('dayDiff--pink');
    }
}


// Hiển thị một popup với câu trích dẫn động lực ngẫu nhiên
function displayQuotePopup() {
    var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    // var randomQuote = getQuotes();
    // alert(randomQuote);
    return randomQuote;
}

// Sự kiện khi trang web được tải
window.onload = function () {
    createCalendar();
    displayDayCounter();
    displayQuotePopup();
};
// Kiểm tra xem trình duyệt có hỗ trợ Web Notifications không
if ("Notification" in window) {
    // Kiểm tra xem người dùng đã cho phép hiển thị thông báo hay chưa
    if (Notification.permission === "granted") {
        // Đặt lịch hiển thị thông báo vào 9 PM hàng ngày
        scheduleNotification();
    } else if (Notification.permission !== "denied") {
        // Yêu cầu quyền hiển thị thông báo nếu chưa được cấp
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                scheduleNotification();
            }
        });
    }
}

// Kiểm tra xem ngày mai có phải là ngày 19 hay không
function checkDay() {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return tomorrow.getDate() === 19;
}

// Mảng chứa các thông báo tương ứng với từng giờ
var notificationMessages = [
    "Nhỏ mắt", // Thông báo cho giờ 9 AM
    "Nhỏ mắt", // Thông báo cho giờ 12 PM
    "Nhỏ mắt", // Thông báo cho giờ 3 PM
    "Nhỏ mắt ", // Thông báo cho giờ 6 PM
    "Nhỏ mắt và 2 tiếng listening english nào, hãy cố gắng lên, kiên trì lên, english sẽ cho m những điều tuyệt vời", // Thống báo cho 20 giờ
    // displayQuotePopup(), // Thông báo cho 22 giờ
    "Đã được "+ calculateDayDiff() +" ngày rồi hãy tiếp tục cố gắng nào.",
    "Đi ngủ thôi nào, hôm nay bạn đã rất cố gắng rồi, chúc ngủ ngon 🥱"
    // Thêm các thông báo khác cho các giờ khác
];

// Hàm đặt lịch hiển thị thông báo cho nhiều giờ trong ngày
function scheduleNotification() {
    var now = new Date();

    // Mảng chứa các giờ trong ngày để đặt thông báo
    var notificationHours = [9, 11, 15, 17, 20, 22, 0]; // Thay đổi giờ tại đây

    // Lặp qua mảng giờ và đặt lịch thông báo cho mỗi giờ cụ thể
    notificationHours.forEach((hour, index) => {
            var notificationTime = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                hour, // Giờ được lấy từ mảng notificationHours
                0, // Phút là 0
                0 // Giây là 0
            );
        if (now > notificationTime) {
            // Nếu hiện tại đã quá thời gian hiển thị thông báo, đặt lịch cho ngày hôm sau
            notificationTime.setDate(notificationTime.getDate() + 1);
        }

        var timeUntilNotification = notificationTime.getTime() - now.getTime();

        // Đặt timeout để hiển thị thông báo khi đến thời gian
        setTimeout(function () {
            var checkSalaryDay = checkDay();
            if (checkSalaryDay) {
                showNotification("Ngày mai nhận lương rồi");
            } else {
                var message = notificationMessages[index];
                showNotification(message);
            }
        }, timeUntilNotification);
    });
}


// Hàm hiển thị thông báo
function showNotification(message) {
    var notification = new Notification("Thông báo", {
        body: message,
    });

    // Xử lý sự kiện khi người dùng nhấn vào thông báo
    notification.onclick = function () {
        // Mở trang web hoặc thực hiện hành động khi nhấp vào thông báo
        window.focus(); // Ví dụ: đặt trang web làm fócus
        notification.close(); // Đóng thông báo sau khi được nhấp vào
    };
}

