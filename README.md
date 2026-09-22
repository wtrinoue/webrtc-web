# Realtime communication with WebRTC

This code has the resources you need for the codelab [Realtime communication with WebRTC](https://codelabs.developers.google.com/codelabs/webrtc-web/#0).

This is a work in progress. If you find a mistake or have a suggestion, please [file an issue](https://github.com/googlecodelabs/webrtc-web/issues). Thanks!

## What you'll learn
* Get video from your webcam
* Stream video with RTCPeerConnection
* Stream data with RTCDataChannel
* Set up a signaling service to exchange messages
* Combine peer connection and signaling
* Take a photo and share it via a data channel


## What you'll need
* Chrome 47 or above.
* Web Server for Chrome, or use your own web server of choice.
* The sample code.
* A text editor.
* Basic knowledge of HTML, CSS and JavaScript, Node.JS.


## For 'step-04', 'step-05', 'step-06'

Run `npm install` before running the code.

## Root server and external access

The root `index.js` serves the project over HTTPS on port `3000`.

```bash
npm install
node index.js
```

Open `https://localhost:3000` on the server. For another device on the same
network, use the server's LAN address and allow TCP port `3000` through the
Windows firewall.

For access from the internet, the server must be reachable through a public
DNS name, the router must forward TCP port `3000` to this computer, and the
certificate must be issued for that public DNS name. The bundled certificate
is for a local `192.168.11.34` address and is not suitable for internet access.
Set a public certificate explicitly when starting the server:

```powershell
$env:CERT_FILE = 'C:\path\to\fullchain.pem'
$env:KEY_FILE = 'C:\path\to\privkey.pem'
node index.js
```

The `HOST`, `PORT`, `CERT_FILE`, and `KEY_FILE` environment variables can be
used to override the server defaults. Browsers also require camera and
microphone permission over HTTPS.