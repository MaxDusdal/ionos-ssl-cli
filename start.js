const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const prompt = require('prompt-sync')();
const fs = require('fs');

const IONOS_URL = 'https://api.hosting.ionos.com/ssl';
var IONOS_PREFIX;
var IONOS_SECRET;

function initialize() {
    IONOS_PREFIX = process.env.IONOS_PREFIX;
    IONOS_SECRET = process.env.IONOS_SECRET;

    if (!IONOS_PREFIX || !IONOS_SECRET) {
        console.log('No Creds found.');
        promptForCredentials();
    }

    console.log('Initialization complete.');
}

function promptForCredentials() {
    var x = true;
    while (x) {
        if (!IONOS_PREFIX) {
            console.log('Please provide your IONOS API Prefix.');
            const IONOS_PREFIX = prompt.hide('IONOS API Prefix: ');
            if (!IONOS_PREFIX) {
                console.log('IONOS API Prefix is required.');
                continue;
            }
        }
        if (!IONOS_SECRET) {
            console.log('Please provide your IONOS API Secret.');
            const IONOS_SECRET = prompt('IONOS API Secret: ');
            if (!IONOS_SECRET) {
                console.log('IONOS API Secret is required.');
                continue;
            }
        }
    }
}

async function testIonosConnection() {
    await axios
        .get(IONOS_URL + '/v1/certificates/', {
            headers: {
                'X-API-Key': IONOS_PREFIX + '.' + IONOS_SECRET,
            },
        })
        .then((response) => {
            console.log(response.data.certificates[0].caCertificates);
        })
        .catch((error) => {
            console.log(error);
        });
}

initialize();
testIonosConnection();
