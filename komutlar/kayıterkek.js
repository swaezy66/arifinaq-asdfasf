const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  if (
    !message.member.roles.has("696338093296320562") &&
    !message.member.hasPermission("ADMINISTRATOR")
  )
    return message.channel.sendEmbed(
      new Discord.RichEmbed()
        .setDescription(
          "Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!"
        )
        .setColor("Black")
    );
  let kullanıcı = message.mentions.users.first();
  if (!kullanıcı)
    return message.channel.sendEmbed(
      new Discord.RichEmbed()
        .setDescription("Bir üye etiketlemelisin!")
        .setColor("Black")
    );
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first();
  let member = message.guild.member(kullanıcı);
  let isim = args[1];
  if (!isim)
    return message.channel
      .send("Lütfen bir isim girin!")
      .then(m => m.delete(5000));
  let yas = args[2];
  if (!yas) return message.channel.send("Lütfen bir yaş girin!");
  await member.setNickname(`❅ ${isim} | ${yas}`);
  member.addRole("696338102423257208"); //erkek1
  member.removeRole("696338103236821023"); //kayıtsız
  member.removeRole("696338101831991346"); //kadın1
  message.react("696408791339499540");
  const kanal = message.guild.channels.find(c => c.id == "696338204999024661");
  const embed1 = new Discord.RichEmbed()
    .addField(
      `Andrømeda ❅`,
      `<a:maviyildiz:696408790819405846>  ${member.user} **Hoşgeldin , Seninle Beraber** \`${member.guild.memberCount}\` **Üyeye Ulaştık.**\n <a:maviyildiz:696408790819405846>  **Sunucumuzun** \`Kurallarına\` <#696338170798931999> **Odasından Bakabilirsin.**`
    )
    .setColor("BLACK")
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp();
  let embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .addField(
      `Andrømeda ❅`,
      `<a:maviyildiz:696408790819405846> ${member.user} **adlı üyeye** <@&696338102423257208> **rolünü verip ismini**  \`❅ ${isim} | ${yas}\` **olarak ayarladım!**`
    )
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp();
  return message.channel.send(embed).then(kanal.send(embed1));
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["e", "ek"],
  kategori: "Yetkili Komutları",
  permLevel: 0
};
exports.help = {
  name: "erkek",
  description: "Sunucuya kaydolmaya ne dersin ?",
  usage: "kayıt isim yaş"
};
