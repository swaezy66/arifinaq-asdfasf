const { RichEmbed } = require ('discord.js')
exports.run = (Bot, Mesaj) => {
  
  var Kullanıcı
  if (Mesaj.mentions.users.first ()) Kullanıcı = Mesaj.mentions.users.first ()
  if (!Mesaj.mentions.users.first ()) Kullanıcı = Mesaj.author
  
  var botDenetlemesi = Kullanıcı.bot
  var botDenetlemesiSonuç
  if (botDenetlemesi == 'true') botDenetlemesiSonuç = 'botun'
  if (botDenetlemesi == 'false') botDenetlemesiSonuç = 'kullanıcının'
  
  const Avatar = Kullanıcı.displayAvatarURL // Avatarları olmayanların da avatarlarını göstermek için "displayAvatarURL" kullanıyoruz.
  
  const avatarMesajı = new RichEmbed ()
  .setColor ('#000000')
  .setAuthor (`${Mesaj.author.tag} tarafından kullanılan avatar komutu:`, Mesaj.author.displayAvatarURL)
  .setTitle (`${Kullanıcı.username} adlı kişinin avatarı:`)
  .setImage (Avatar)
  
  Mesaj.channel.send (avatarMesajı)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['pp'],
  permLevel: 0
}

exports.help = {
  name: 'avatar'
}
   