const Discord = require('discord.js');
const client = new Discord.Client();
const discordLink = new RegExp("discord.gg\/\w*\d*");
const twitchLink = new RegExp("twitch.tv\/\w*\d*");
var bannedLinks = [discordLink, twitchLink];
require('dotenv').config();

client.on('ready', () => {
  console.log('I\'m online');
});

//ping pong
client.on("message", (message) => {
  // The message to check for a Discord link
  var msg = `${message}`;
  /*
  if (message.content.startsWith("ping")) {
    console.log(message.guild.defaultchannel);
    message.channel.send("pong!");
  }
  */
  const server = message.guild;
  var role = server.roles.find(rl => rl.name === 'SpamAllowed');

  if(!role){
    role = server.createRole({
      name: 'SpamAllowed',
      permissions: 16384, //TODO Occhio che magari servono le ""
  })
  }

  if(!(message.member.roles.has(role.id))&&checkBannedUrl(msg)){
    // If the test has found a URL..
    message.delete();
    message.reply("Non puoi condividere questo tipo di elemnto");
  }
});

//If someone enter in the server with a discord invite link in the name, the bot ban him
client.on('guildMemberAdd', member => {
  var message;
  var name=member.displayName;
  if(checkBannedUrl(name)){
    var channels = member.guild.channels.forEach(channel => {
      //var message = channel.fetchMessage(channel.lastMessageID);
      if(channel.type==="text"){
        message = channel.fetchMessages({ limit: 10 })
          .then(messages => console.log(`Received ${messages.size} messages`));
        //console.log(channel.lastMessageID);
      }
    });
    member.kick('Banned by spamKiller');
  }

});

function checkBannedUrl(msg){ //// The message will be tested on "discord.gg/{any character or digit}"
  var containsBannedUrl=false;
  var i=0;
  while(!containsBannedUrl&&i<bannedLinks.length){
    containsBannedUrl = bannedLinks[i].test(msg);
    i++;
  }
  return containsBannedUrl;
}


// Discord TOKEN
client.login(process.env.TOKEN);
