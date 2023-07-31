module.exports = {
  name: 'ping', 
  description: 'Répondre avec Pong!', 
  execute(message, args) { 

      message.edit(`Ma latence est de \`${message.client.ws.ping}ms\` !`)
            .then((editedMessage) => {
        setTimeout(() => {
          editedMessage.delete();
        }, 10000);
      })
    },
};