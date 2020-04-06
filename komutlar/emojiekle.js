const Discord = require("discord.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermissions("ADMINISTRATOR"))
    return message.channel.send(
      "⛔ Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısınız"
    );
  let link = args[0];
  let isim = args[1];
  let guild = message.guild;
  if (!link)
    return message.channel.send("Emojinin alınacağı linki girmelisin.");
  if (!isim) return message.channel.send("Emojinin ismini belirlemedin");

  let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor("Emoji Eklendi", message.guild.iconURL)
    .setDescription(` **${isim} İsmiyle Yeni Bir Emoji Oluşturuldu.**`)
    .setFooter(`Komutu kullanan yetkili : ${message.author.username}`);

  guild
    .createEmoji(`${link}`, `${isim}`)
    .then(emoji => message.channel.send(embed));
  message.react("✅").catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["addemoji", "emojioluştur", "ee"],
  permLevel: 0
};
exports.help = {
  name: "emojiekle",
  description: "Sunucuya emoji eklersiniz",
  usage: "emojiekle <link> <isim>"
};
