const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, args) => {
  if(!message.member.roles.has("696338090947641355") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("**Üzgünüm bu komutu kullanmak için `\🔨• Ban Hammer\` yetkisine sahip olmalısınız**").then(msg => msg.delete(5000));
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  let user = args[0];
  if (!user) return message.reply('Banı kaldırılacak kişinin ID numarasını yazmalısın.').catch(console.error);
  if (reason.length < 1) return message.reply('Ban kaldırma sebebini yazmalısın.');
  message.guild.unban(user);

  const embed = new Discord.RichEmbed()
  message.channel.send(` __<@${user}>__ adlı kişinin yasağı **${message.author.username}#${message.author.discriminator}** yetkili tarafından "${reason}" sebebiyle Kaldırılmıştır.`).then(msg => msg.delete(5000));
   message.react('696508327190069348')
const sChannel = message.guild.channels.find(c=> c.id ==="696338194568052736")
  let modlog = new Discord.RichEmbed() 
  .setColor('RANDOM')
  .setDescription(`<@${user}> adlı Kullanıcının Yasağı kaldırıldı \n Kaldıran Yetkili: **${message.author.username}#${message.author.discriminator}** \n Sebebi : **"${reason}"**`)
   sChannel.send(modlog)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'unban',
  description: 'İstediğiniz kişinin banını kaldırır.',
  usage: 'unban [kullanıcı] [sebep]'
};
