const Discord = require('discord.js');
const client = new Discord.Client();
const regEx = new RegExp("discord.gg\/\w*\d*");
require('dotenv').config();

client.on('ready', () => {
  console.log('I\'m online');
});

//ping pong
client.on("message", (message) => {
  // The message to check for a Discord link
  var tmp = `${message}`;
  if (message.content.startsWith("ping")) {
    console.log(message.guild.defaultchannel);
    message.channel.send("pong!");
  }
  const server = message.guild;
  var role = server.roles.find(rl => rl.name === 'SpamAllowed');

  if(!role){
    role = server.createRole({
      name: 'SpamAllowed',
      permissions: 16384, //TODO Occhio che magari servono le ""
  })
  }

  if(!(message.member.roles.has(role.id))){
    // The message will be tested on "discord.gg/{any character or digit}"
    var containsDiscordUrl = regEx.test(tmp);

    // If the test has found a URL..
    if (containsDiscordUrl) {
      message.delete();
      message.reply("Non puoi condividere questo tipo di elemnto");
    }
  }
});

//If someone enter in the server with a discord invite link in the name, the bot ban him
client.on('guildMemberAdd', member => {
  var name=member.displayName;
  /*
  console.log(name);
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  // Do nothing if the channel wasn't found on this server
  if (!channel){
    console.log("No generals just majors");
  }
  else{
    console.log(channel);
    channel.send("Halo");

  }
  */
  //console.log(regEx.test(name));

  if(regEx.test(name)){
    console.log(regEx.test(name));
    member.ban('Go to hell'); /*.then(() => {
      // We let the message author know we were able to kick the person
      channel.send("Spammer distrutto");
    }).catch(err => {
      // An error happened
      // This is generally due to the bot not being able to kick the member,
      // either due to missing permissions or role hierarchy
      channel.reply('I was unable to kick the member');
      // Log the error
      console.error(err);
    });
    */
  }

});


// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.TOKEN);
