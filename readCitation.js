const fs = require('fs');

fs.readFile('messages.csv', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.trim().split('\n');
  const randomIndex = Math.floor(Math.random() * lines.length);
  const randomEntry = lines[randomIndex];
  
  console.log('Random Entry:', randomEntry);
});
