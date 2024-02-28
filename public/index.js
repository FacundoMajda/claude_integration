document.querySelector('#chatForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var messageInput = document.querySelector('#messageInput');
    var message = messageInput.value.trim();
    console.log('Mensaje:', message);

    var roleSelect = document.querySelector('#roleSelect');
    var role = roleSelect.value.trim();
    console.log('Rol:', role);

    if (!role || !message) {
        console.error('El rol y el contenido del mensaje no pueden estar vacíos');
        document.querySelector('#errorContainer').textContent = 'El rol y el contenido del mensaje no pueden estar vacíos';
        return;
    }

    var data = { role: role, content: message }; 
    console.log('Data a enviar:', data);

    fetch('http://localhost:5000/api/mensaje', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(function(response) { 
        if (!response.ok) {
            console.log('Respuesta:', response);
            throw new Error('Error de red al intentar enviar el mensaje');
        }
        return response.json(); 
    })
    .then(function(data) {
        console.log('Respuesta del servidor:', data);
        var chatContent = document.querySelector('#chatContent');
        var messageElement = document.createElement('p');
        messageElement.textContent = data.content; 
        chatContent.appendChild(messageElement);

        messageInput.value = '';
    })
    .catch(function(error) {
        console.error('Error:', error);
        document.querySelector('#errorContainer').textContent = error.message;
    });
});