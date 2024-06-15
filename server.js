const { spawn } = require('child_process');
const readline = require('readline');

const appsToRun = ['WebServer.js', 'AuthServer.js', 'CharacterServer.js'];
const apps = [];

// Function to spawn child processes
function spawnApp(appName) {
    const child = spawn('node', [appName]);

    const rl = readline.createInterface({
        input: child.stdout,
        output: process.stdout,
        terminal: false
    });

    // Initialize an object to store child process and readline interface
    const app = {
        child: child,
        rl: rl,
        lastLine: ''
    };

    // Push the app object to the array
    apps.push(app);

    rl.on('line', (line) => {
        app.lastLine = line;
        drawUI();
    });

    child.on('exit', (code, signal) => {
        console.log(`[${appName}] Exited with code ${code}`);
    });

    child.on('error', (err) => {
        console.error(`[${appName}] Failed to start: ${err}`);
    });
}

// Function to draw the UI
function drawUI() {
    console.clear();
    apps.forEach(app => {
        console.log(`[${app.child.spawnfile}] ${app.lastLine}`);
    });
}

// Spawn each app
appsToRun.forEach(app => spawnApp(app));

// Initial draw of UI
drawUI();
