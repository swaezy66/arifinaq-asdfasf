  const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  if (!message.member.roles.has('696338093296320562') && !message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send(`Bu komudu kullanabilmek için gerekli yetkiye sahip değilsiniz!`).then(msg => msg.delete(5000));
  const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    var toplamEtiketliUyeler = message.guild.members.filter(member => member.user.username.includes("❅")).size
    let count = 0;
    let boostcuk = '687005225655205900'
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
      const emoji = client.emojis.find(emoji => emoji.name === "tik")
      const emoji3 = client.emojis.find(emoji => emoji.name === "kirmiziyildiz");
  let boost = message.guild.members.filter(r=>r.roles.has(boostcuk)).size
  const tuborgembed = new Discord.RichEmbed()
  .setColor("black")
        .setDescription(`${emoji3} *Sunucuda* ***${message.guild.memberCount}*** *kişi bulunmaktadır.*\n\n${emoji3} *Sunucuda* ***${message.guild.members.filter(m => m.presence.status !== "offline").size}*** *aktif kişi bulunmaktadır.*\n\n${emoji3} *Ses kanallarında* ***${count}*** *kişi bulunmaktadır.*\n\n${emoji3} *Taglı üyede* ***${toplamEtiketliUyeler}*** *kişi bulunmaktadır.*\n\n${emoji3} *Sunucuyu boostlayan* ***${boost}*** *kişi bulunmaktadır*`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/696338204999024661/696511892453326872/andromedaa.gif`)
        .setTimestamp()
        .setFooter(`Komutu kullanan kullanıcı : ${message.author.username}`) 
 
  message.channel.sendEmbed(tuborgembed)
  message.react(emoji)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['info'],
  permLevel: 0
};

exports.help = {
  name: 'say',
  description: 'kullanıcıyı susturur.',
  usage: 'say'
}; 