const fs = require('fs');
const axios = require('axios');

const {channelID, token} = require('./auth/config.json')


axios.get(`https://discord.com/api/v9/channels/${channelID}/messages`, {
  headers: {
    'Authorization': `Bot ${token}`,
    'Host': 'discord.com',
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    const messages = response.data;
    const messageContent = messages.filter(message => message.content).map(message => message.content);
    const formattedContent = {};

    for (const message of messageContent) {
      const firstLetter = message[0].toUpperCase();
      if (!formattedContent[firstLetter]) {
        formattedContent[firstLetter] = [];
      }
      formattedContent[firstLetter].push(message.substring(3));
    }

    const csvContent = Object.entries(formattedContent).map(([letter, messages]) => `"${letter}","${messages.join(', ')}"`);
    const csvData = `Letter,Messages\n${csvContent.join('\n')}`;

    fs.writeFile('messages.csv', csvData, err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Messages written to CSV file');
    });
  })
  .catch(error => {
    console.log(error);
  });
// Read the contents of the CSV file
const fileContent = fs.readFileSync('messages.csv', 'utf-8');

// Split the file content into lines
const lines = fileContent.split('\n');

// Remove the first line (Letters, Messages)
lines.shift();

// Extract the Messages part from each line and store them in an array
const messages = [];
lines.forEach(line => {
  const parts = line.split(',');
  if (parts.length === 2) {
    let message = parts[1].trim();
    // Remove quotation marks from the first entry
    if (parts[0].includes('"')) {
      message = message.replace(/"/g, '');
    }
    if (message !== '') {
      messages.push(message);
    }
  }
});

// Pick a random entry from the messages array
const randomIndex = Math.floor(Math.random() * messages.length);
const randomMessage = messages[randomIndex];

console.log(randomMessage);

