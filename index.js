const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');
const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};


const client = new Client({
    checkUpdate: false
});

  client.on('ready', async () => {
    console.log(`Connecté ${client.user.username}!`);

  });

  client.on('messageCreate', async (message) => {

      const prefix = config.prefix;
  

    if (message.author.id !== client.user.id) {
      return;
    }

    if (!message.content.startsWith(prefix)) {
      return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands[commandName];

    if (!command) {
      return;
    }

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.edit('Une erreur est survenue lors de l\'exécution de cette commande.');
    }
  });

  client.login(config.token);

mongoose
  .connect("MONGO8URL", options)
  .then(() => {
    console.log("La connexion à la base de données a réussi avec succès");
  })
  .catch((err) => {
    console.log(err);
  });

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commands = {};

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands[command.name] = command;
  console.log(`Commande chargée : ${command.name}`);
}
process.on('unhandledRejection', (reason, promise) => {
  console.log('----- Unhandled Rejection at -----');
  console.log(promise);
  console.log('----- Reason -----');
  console.log(reason);
});
