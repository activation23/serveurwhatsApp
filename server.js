// Importation des modules nécessaires
const { Client } = require('whatsapp-web.js');
const express = require('express');
const QRCode = require('qrcode');

const app = express();
let currentQr = ''; // Variable pour stocker le QR Code actuel

// Initialisation du client WhatsApp
const client = new Client();

// Lorsque le QR code est généré, on le stocke
client.on('qr', (qr) => {
    currentQr = qr; // Met à jour le QR Code
});

// Lorsque le client est prêt (connecté)
client.on('ready', () => {
    console.log('Client prêt et connecté !');
});

// Initialisation du client WhatsApp
client.initialize();

// Route pour afficher le QR code
app.get('/qr', async (req, res) => {
    if (currentQr) {
        // Générer le QR Code en base64
        const qrImage = await QRCode.toDataURL(currentQr);
        res.send(`
            <html>
                <head>
                    <meta http-equiv="refresh" content="5"> <!-- Recharge toutes les 5 secondes -->
                </head>
                <body>
                    <h1>Scannez le QR Code avec WhatsApp</h1>
                    <img src="${qrImage}" alt="QR Code WhatsApp">
                </body>
            </html>
        `);
    } else {
        res.send('QR Code non disponible.');
    }
});

// Lancer le serveur Express
app.listen(3000, () => {
    console.log('Serveur lancé sur http://localhost:3000/qr');
});
