const socket = io('localhost:3005');
const userCountBlock = document.querySelector('#userCount');

socket.on('changeUserCount', (data) => {
    userCountBlock.innerHTML = `Пользователей на странице: ${data}`;
});