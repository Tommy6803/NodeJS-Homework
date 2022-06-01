const socket = io('localhost:3005');
const userCountBlock = document.querySelector('#userCount');
const userName = document.querySelector('#userName');
const chatBlock = document.querySelector('#chatBlock');
const chatText = document.querySelector('#chatText');
const sendMessage = document.querySelector('#sendMessage');

socket.on('setName', (payload) => {
    userName.innerHTML = `Имя пользователя: ${payload}`;
});

socket.on('changeUserCount', (payload) => {
    userCountBlock.innerHTML = `Количество пользователей в чате: ${payload}`;
});

socket.on('addUser', (payload) => {
    chatBlock.insertAdjacentHTML('afterbegin', `<div>Присоединился пользователь: ${payload}</div>`);
});

socket.on('leftUser', (payload) => {
    chatBlock.insertAdjacentHTML('afterbegin', `<div>Вышел из чата пользователь: ${payload}</div>`);
});

socket.on('newChatMessage', (payload) => {
    chatBlock.insertAdjacentHTML('afterbegin', `<div>${payload.user}: ${payload.text}</div>`)
});

sendMessage.addEventListener('click', () => {
    socket.emit('newMessage', chatText.value);
});
