const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  if (!message.member.roles.has("696338095074967614") && !message.member.hasPermission('ADMINISTRATOR'))
    return message.channel
      .send(
        "**Üzgünüm bu komutu kullanmak için `✈ | Transport` yetkisine sahip olmalısınız**"
      )
      .then(msg => msg.delete(5000));
  if (!message.member.voiceChannel) {
    return message.channel.send("**Ses kanalında olman lazım!**");
  }
  let kullanıcı = message.mentions.users.first();
  if (!kullanıcı)
    return message.channel.send("**__Kullanıcıyı etiketlemelisin.__**");
  let rol = message.mentions.roles.first();
  let member = message.guild.member(kullanıcı);
  if (!member.voiceChannel)
    return message.channel
      .send("**__Etiketlenen kullanıcı bir ses kanalında değil__**")
      .then(m => m.delete(5000));
  const voiceChannel = message.member.voiceChannel.id;
  if (!voiceChannel) return;
  member.setVoiceChannel(voiceChannel);
  message.react("696508327190069348");
  const voiceChannel1 = message.member.voiceChannel.name;
  let embed = new Discord.RichEmbed()
    .setAuthor(
      "Odaya Çekme!",
      `https://cdn.discordapp.com/icons/678562327414439946/a_688ccb3cb46c4a7ee266edd6785d0c60.gif`
    )
    .setColor("#000000")
    .setDescription(
      message.author +
        " **Tarafından** " +
        kullanıcı +
        " **Kullanıcısı** `" +
        voiceChannel1 +
        "`** Sesli Kanalına Çekildi.**"
    )
    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`);
  message.channel.send(embed).then(m => m.delete(10000));
  await client.channels.get("696584958168268830").send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
};
exports.help = {
  name: "çek",
  description: " ",
  usage: " "
};
