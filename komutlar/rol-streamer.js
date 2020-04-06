const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {

    const emoji = client.emojis.find("name", "tik");
    const emoji2 = client.emojis.find("name" , "uyari")
  
if (!message.member.roles.has('696338093296320562') && !message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send(`Bu komudu kullanabilmek için gerekli yetkiye sahip değilsiniz!`).then(msg => msg.delete(5000));

  let kişi = message.mentions.users.first()
  if (!kişi) return message.react(emoji2)
  let member = message.guild.member(kişi)

  if(!member.roles.has(`696338100519174214`)) {
    member.addRole(`696338100519174214`)
    let kayıt = new Discord.RichEmbed()
    .setColor("BLACK")
   .addField(`Andrømeda ❅`, `${kişi} **adlı üyeye** <@&696338100519174214> **rolü verildi!**`)
   .setFooter(`Komutu kullanan yetkili : ${message.author.username}`) 
    return message.channel.send(kayıt).then(msg => msg.delete(5000)).then(() => message.react(emoji));
  } else {
    member.removeRole(`696338100519174214`)
    let kayıt = new Discord.RichEmbed()
    .setColor("BLACK")
    .addField(`Andrømeda ❅`, `${kişi} **adlı üyeden** <@&696338100519174214> **rolü alındı!**`)
    .setFooter(`Komutu kullanan yetkili : ${message.author.username}`) 
    return message.channel.send(kayıt).then(msg => msg.delete(5000)).then(() => message.react(emoji));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['streamer'],
  permLevel: 0
};

exports.help = {
  name: 'streamer',
};