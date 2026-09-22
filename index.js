const express = require('express');
const https = require('https');
const fs = require('fs');
const os = require('os');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const certPath = path.resolve(process.env.CERT_FILE || path.join(__dirname, '192.168.11.34+2.pem'));
const keyPath = path.resolve(process.env.KEY_FILE || path.join(__dirname, '192.168.11.34+2-key.pem'));

// プロジェクト直下（__dirname）全体を静的ファイルとして公開
app.use(express.static(__dirname));

function getLocalIpAddresses() {
    const interfaces = os.networkInterfaces();
    const addresses = [];

    Object.keys(interfaces).forEach((name) => {
        interfaces[name].forEach((iface) => {
            if (iface.family === 'IPv4' && !iface.internal) {
                addresses.push(iface.address);
            }
        });
    });

    return addresses;
}

function startHttpsServer() {
    if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
        console.error('HTTPS certificate files not found.');
        console.error('Please run the following commands:');
        console.error('  npm install -g mkcert');
        console.error('  mkcert -install');
        console.error('  mkcert <public-hostname>');
        console.error('Then set CERT_FILE and KEY_FILE to the generated files.');
        process.exit(1);
    }

    const options = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath)
    };

    https.createServer(options, app).listen(PORT, HOST, () => {
        const localIps = getLocalIpAddresses();

        console.log(`Server is running on https://${HOST}:${PORT}`);
        if (localIps.length > 0) {
            console.log('Local IP addresses:');
            localIps.forEach((ip) => {
                console.log(`- https://${ip}:${PORT}`);
            });
        } else {
            console.log('Local IP not found.');
        }
    });
}

startHttpsServer();
