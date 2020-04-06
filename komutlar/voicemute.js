const Discord = require("discord.js");
const ms = require("ms");

exports.run = (client, message, args) => {
  if (!message.member.roles.has("696338092331761705") && !message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send(
      "**Bunu Yapmak için Yetkin Yok.<@&696338092331761705> rolünü alarak komudu kullanabilrsin.**"
    );

  let log = message.guild.channels.find(c => c.id === "696338196514209822");

  if (!log) return;
  let kullanici = message.mentions.members.first();
  let süre = args[1];

  if (!süre) return message.reply("**Susturma Süresini Belirtmelisin.**");
  if (!kullanici)
    return message.channel.send("** Kimi Susturacağını Belirtmelisin!**");

  kullanici
    .setMute(
      true,
      `Susturan yetkili: ${message.author.tag} - Susturma süresi: ${süre}sustur`
    )
    .then(() =>
      message.channel.send(
        ` ${kullanici} \`${süre}\`** Ses Kanallarında Susturuldu.**`
      )
    );
  const embed = new Discord.RichEmbed()
    .setTitle(`__Ses Mute Log__`)
    .setColor("RED")
    .setTimestamp()
    .addField(` Susturulan Kullanıcı`, `${kullanici} | __${kullanici.id}__`)
    .addField(` Susturulma Süresi`, `**__${süre}__**`)
    .addField(
      ` Susturan Yetkili`,
      `<@${message.author.id}> | __${message.author.id}__`
    )
    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`);
  log.send(embed).catch(console.error);
  setTimeout(() => {
    kullanici.setMute(false, `**Susturulma Süresi Dolduğu İçin Susturması Açıldı.**`);
    message.channel.send(
      `**  ${kullanici} Susturulma Süresi Doldu Ve Susturulması Açıldı.**`
    );
  }, ms(süre));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["vmute"],
  permLevel: 0
};

exports.help = {
  name: "sesmute",
  description: "Seslideki Birinin Mikrofonunu Kapatır",
  usage: "sesmute"
};
