const socket = io() // => establece la conección

const input = document.querySelector('input')
document.querySelector('button').addEventListener('click', () => {
socket.emit('newProduct', input.value)
})

socket.on('newProducts', data => { // -> de esta manera el socket está escuchando al servidor (que está en app.js)
    document.querySelector('p').innerText - data;
})

