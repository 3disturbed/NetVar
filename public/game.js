var AuthURI = "http://127.0.0.1:5000";

// Show register form
document.getElementById('showRegister').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
});

// Show login form
document.getElementById('showLogin').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

// Handle login
document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    alert('Logging in as ' + username);

    // Authenticate user
    const response = await fetch(`./auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    console.log(response);
    const data = await response.json();
    if (response.ok) {
        const token = data.token;
        // Connect to Relay Server for character selection
        const relayResponse = await fetch(`${AuthURI}/selectCharacter`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        });

        const relayData = await relayResponse.json();
        if (relayResponse.ok) {
            connectToReplicationServer(relayData.replicationServerUrl, token);
        }
    } else {
        alert(data.message);
    }
});

// Handle registration
document.getElementById('register').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    alert('Registering as ' + username);

    // Register user
    const response = await fetch(`./auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert('Registration successful. Please check your email to confirm.');
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    } else {
        alert(data.message);
    }
});

function connectToReplicationServer(url, token) {
    const ws = new WebSocket(url);

    ws.onopen = () => {
        ws.send(JSON.stringify({ type: 'init', token }));
    };

    ws.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.type === 'characters') {
            displayCharacterSelection(data.characters, ws);
        }
    };
}

function displayCharacterSelection(characters, ws) {
    const characterSelect = document.getElementById('characterSelect');
    const characterList = document.getElementById('characterList');

    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    characterSelect.style.display = 'block';

    characterList.innerHTML = '';
    characters.forEach(character => {
        const div = document.createElement('div');
        div.textContent = character.name;
        div.addEventListener('click', () => {
            selectCharacter(character.id, ws);
        });
        characterList.appendChild(div);
    });
}

function selectCharacter(characterId, ws) {
    ws.send(JSON.stringify({ type: 'selectCharacter', characterId }));
    ws.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.type === 'connected') {
            startGame();
        }
    };
}

function startGame() {
    document.getElementById('characterSelect').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';
    // Initialize your game here
}
