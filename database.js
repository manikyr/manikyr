// database.js

// Инициализация базы данных
function initializeDatabase() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([
            { id: 1, phone: "+7 (999) 123-45-67", name: "Админ", password: "admin123", role: "admin" }
        ]));
    }
    if (!localStorage.getItem('bookings')) {
        localStorage.setItem('bookings', JSON.stringify([]));
    }
    if (!localStorage.getItem('notifications')) {
        localStorage.setItem('notifications', JSON.stringify([]));
    }
    if (!localStorage.getItem('availableDates')) {
        const year = new Date().getFullYear();
        const datesArray = [];
        for (let day = 14; day <= 19; day++) {
            const dateStr = `${year}-07-${day < 10 ? '0'+day : day}`;
            datesArray.push({
                date: dateStr,
                times: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
            });
        }
        localStorage.setItem('availableDates', JSON.stringify(datesArray));
    }
}

// Пользователи
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function addUser(user) {
    const users = getUsers();
    user.id = Date.now();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return user;
}

function getUserByPhone(phone) {
    return getUsers().find(u => u.phone === phone);
}

function updateUser(updatedUser) {
    const users = getUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
        users[index] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }
    return false;
}

function deleteUser(userId) {
    const users = getUsers();
    const updatedUsers = users.filter(u => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
}

// Бронирования
function getBookings() {
    return JSON.parse(localStorage.getItem('bookings')) || [];
}

function addBooking(booking) {
    const bookings = getBookings();
    booking.id = Date.now();
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return booking;
}

function updateBooking(updatedBooking) {
    const bookings = getBookings();
    const index = bookings.findIndex(b => b.id === updatedBooking.id);
    if (index !== -1) {
        bookings[index] = updatedBooking;
        localStorage.setItem('bookings', JSON.stringify(bookings));
        return true;
    }
    return false;
}

function deleteBooking(bookingId) {
    const bookings = getBookings();
    const updatedBookings = bookings.filter(b => b.id !== bookingId);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
}

// Уведомления
function getNotifications() {
    return JSON.parse(localStorage.getItem('notifications')) || [];
}

function addNotification(notification) {
    const notifications = getNotifications();
    notification.id = Date.now();
    notifications.push(notification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

function markNotificationAsRead(phone) {
    const notifications = getNotifications();
    const updatedNotifications = notifications.map(n => n.phone === phone ? { ...n, read: true } : n);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
}

// Доступные даты
function getAvailableDates() {
    return JSON.parse(localStorage.getItem('availableDates')) || [];
}

function addAvailableDate(date) {
    const availableDates = getAvailableDates();
    const dateExists = availableDates.some(d => d.date === date.date);
    if (!dateExists) {
        availableDates.push(date);
        availableDates.sort((a, b) => new Date(a.date) - new Date(b.date));
        localStorage.setItem('availableDates', JSON.stringify(availableDates));
    }
}

function updateAvailableDate(dateStr, updatedDate) {
    const availableDates = getAvailableDates();
    const index = availableDates.findIndex(d => d.date === dateStr);
    if (index !== -1) {
        availableDates[index] = updatedDate;
        localStorage.setItem('availableDates', JSON.stringify(availableDates));
    }
}

function deleteAvailableDate(dateStr) {
    const availableDates = getAvailableDates();
    const updatedDates = availableDates.filter(d => d.date !== dateStr);
    localStorage.setItem('availableDates', JSON.stringify(updatedDates));
}

// Экспорт функций
export {
    initializeDatabase,
    getUsers,
    addUser,
    getUserByPhone,
    updateUser,
    deleteUser,
    getBookings,
    addBooking,
    updateBooking,
    deleteBooking,
    getNotifications,
    addNotification,
    markNotificationAsRead,
    getAvailableDates,
    addAvailableDate,
    updateAvailableDate,
    deleteAvailableDate
};