
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

//Check if bot is online
client.on('ready', () => {
  console.log('I\'m online');
});

// Create an event listener for new guild members
client.on('message', message => {
  //client.channels(messege);

  //console.log(message.channel.TextChannel);
  const channel = client.channels.find(ch => ch.id == message);
  const guild = client.guilds.find(gu => gu.id == message);
  if(guild!==null){
    console.log(guild.name);
    var collection = guild.channels.clone();
    console.log(collection.lenght);
    /*
    for(var i=0; i<array.lenght;i++){
      console.log(array[i].name);
    }
    */
  }
  else if(channel!==null){
    console.log(channel.name);
  }
  else {

  }

  //console.log(channel);

  //400672709119442948
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.TOKEN);
