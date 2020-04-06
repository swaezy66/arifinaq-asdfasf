const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
var önEk = ayarlar.prefix;
var prefix = ayarlar.prefix;

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

///////////// KOMUTLAR BAŞ

// OTO ROL
client.on("guildMemberAdd", async member => {
  const logChannel = member.guild.channels.find(
    channel => channel.id === "696338241166770236"
  );
  const embed = new Discord.RichEmbed()
    .setColor("RED")
    .addField(
      `Andrømeda ❅`,
      `${member} adlı üye sunucumuza katıldı!\nGelen üyeye <@&696338103236821023> rolünü verdim. \nSunucumuz artık \`${member.guild.memberCount}\` üyeye sahip!`
    );
  logChannel.send(embed);
}); // Developed by Andromeda



////////



////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////

client.on("userUpdate", async (oldUser, newUser) => {
  var tag3 = "❅";
  let sunucu = client.guilds.find(e => e.id === `696337215663374399`);
  let rol = sunucu.roles.find(a => a.id === `696338089551069244`);
  let uye = sunucu.members.get(newUser.id);
  if (newUser.username.includes(tag3) && !oldUser.username.includes(tag3)) {
    uye.addRole("696338089551069244");
    let embed = new Discord.RichEmbed()
      .setColor(`GREEN`)
      .setDescription(
        ` <@${newUser.id}> **adlı üye** "❅" **tagımızı aldığı için** <@&696338089551069244> **rolü verildi!**`
      );
    client.channels.get(`696338203736539166`).send(embed);
  }
});

client.on("userUpdate", async (oldUser, newUser) => {
  var tag3 = "❅";
  let sunucu = client.guilds.find(e => e.id === `696337215663374399`);
  let rol = sunucu.roles.find(a => a.id === `696338089551069244`);
  let uye = sunucu.members.get(oldUser.id);
  if (oldUser.username.includes(tag3) && !newUser.username.includes(tag3)) {
    uye.removeRole("696338089551069244");

    let embed = new Discord.RichEmbed()
      .setColor(`RED`)
      .setDescription(
        ` <@${oldUser.id}> **adlı üye** "❅" **tagımızı çıkardığı için** <@&696338089551069244> **rolü alındı!**`
      );
    client.channels.get(`696338203736539166`).send(embed);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("message", message => {
  if (message.content == `${prefix}boostlayanlar`) {
    let BoostEmbed = new Discord.RichEmbed()
      .setTitle("Sunucuyu Boostlayanlar:")
      .setDescription(
        message.guild.roles
          .get("679429107494289417")
          .members.map(m => m.user.tag)
          .join("\n")
      );
    message.channel.send(BoostEmbed);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("message", msg => {
  if (msg.content.toLowerCase() === "tag") {
    //		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {

    msg.channel.send("❅");
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("message", msg => {
  if (msg.content.toLowerCase() === "link") {
    if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
      msg.channel.sendMessage("https://discord.gg/VAtN3uu");
    } else {
      msg.channel.sendMessage("https://discord.gg/VAtN3uu");
    }
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("message", m => {
  if (m.channel.id !== "678575282764120064") {
    //buraya o kanalın ID'si yazılacak.
    return;
  }
  if (m.member.hasPermission("ADMINISTRATOR")) return;
  if (m.user.bot == true) return;
  if (m.attachments.size < 1) {
    m.delete();
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("message", message => {
  if (message.channel.type === "dm") {
    if (message.author.bot) return;
    const dmlog = new Discord.RichEmbed()
      .setTitle(`${client.user.username}'a Özelden Mesaj Gönderildi!`)
      .setColor("RANDOM")
      .addField("Mesajı Gönderen", ` \`\`\` ${message.author.tag} \`\`\` `)
      .addField("Mesajı Gönderenin ID", ` \`\`\`${message.author.id}\`\`\` `)
      .addField(`Gönderilen Mesaj`, message.content)
      .setThumbnail(message.author.avatarURL);
    client.channels.get("696338241166770236").send(dmlog);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////// ALTI ELLEME

require("./util/eventLoader")(client);

client.login(ayarlar.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});
//////////////////////


client.on("guildMemberAdd", member => {
  if (member.user.username.includes("≽")) {
    let a = member.guild.roles.find(x => x.id === "696338103236821023");
    let b = member.guild.roles.find(z => z.id === "696338097826168873");
    let c= member.guild.roles.find(z => z.id === "696338114297331735");
    member.addRole(b);
    member.removeRole(a);
      member.removeRole(c);
    member.send(
      "**__Sunucumuzun Yasaklı Tagında Bulunuyorsunuz, O yüzden JAİLLENDİN KARDEŞİM.__**"
    );
  }
});

////-hg--

client.on("guildMemberAdd", async member => {
  var kanal = member.guild.channels.get("696338166252044288");
  let user = client.users.get(member.id);
  

  let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(
      `<a:diskotopu:696421702128893973> **Hoşgeldin, ${member} Seninle Birlikte ${
        member.guild.memberCount
      } Kişiyiz!**

<a:morelmas:696408787917078588> **Kaydının yapılması için sesli odaya gelip ses vermen gerekli.**

<a:maviyildiz:696408790819405846> **<@&696338093296320562> Rolündeki yetkililer seninle ilgilenecektir.**

<a:elmas:696652120299929621> **Kayıt sorumluları robot olmadığından emin olup kaydınızı alacaktır. Lütfen beklemede kalın.**

 <a:ucgen:696421700295852044>  **Tagımızı Alarak Bize Destek Olabilirsiniz.** TAG : **❅** `
    )
    .setImage(``);

  kanal.send(embed);
  member.addRole("696338103236821023")
});

/////mesajlog


	client.on("messageDelete", async (message, channel) => {
if(message.author.bot || message.channel.type === "dm") return;
  
  if (message.author.bot) return;
  
  var user = message.author;
  
  let sChannel2 = message.guild.channels.find(c => c.id === "696338239115755550")
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Mesaj silindi.`, message.author.avatarURL)
  .addField("Kullanıcı Tag", message.author.tag, true)
  .addField("Kanal Adı", message.channel.name, true)
  .addField("Silinen Mesaj", "```" + message.content + "```")
  .setThumbnail(message.author.avatarURL)
  .setFooter(`Bilgilendirme  • bügün saat ${message.createdAt.getHours()+3}:${message.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannel2.send(embed);
  
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
if(newMessage.author.bot || newMessage.channel.type === "dm") return;
  let sChannel3 = newMessage.guild.channels.find(c => c.id === "696338239115755550")
  if (oldMessage.content == newMessage.content) return;
  let embed = new Discord.RichEmbed()
  .setColor("BLUE")
  .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL)
  .addField("Kullanıcı", newMessage.author)
  .addField("Eski Mesaj", oldMessage.content, true)
  .addField("Yeni Mesaj", newMessage.content, true)
  .addField("Kanal Adı", newMessage.channel.name, true)
  .setThumbnail(newMessage.author.avatarURL)
  .setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours()+3}:${newMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannel3.send(embed)
});




// VOİCE ONLİNE
client.on('message',async message => {
  if(message.content.startsWith(prefix + "vo")) {
    let asdd = client.channels.get(`683686355686916132`)
  if(!message.guild.member(message.author).hasPermissions('MANAGE_CHANNELS')) return message.reply('Yeterli yetkide değilsin.!');
  if(!message.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return message.reply('Yeterli yetkide değilim.!');
            message.react('683425097746612228')
//  message.guild.createChannel(`Voice [${message.guild.members.filter(m => m.voiceChannel).size}]` , 'voice').then(c => {
      asdd.setName(`Starting.. [${message.guild.members.filter(m => m.voiceChannel).size}]` , 'voice').then(c => {
    console.log(`Voice online channel setup for guild: \n ${message.guild.name}`);
    c.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
    setInterval(() => {
      c.setName(`⭐️・Andrømeda [${message.guild.members.filter(m => m.voiceChannel).size}]`)
    },1400);
  });
  }
});

client.login(ayarlar.token);


///--ODA

client.on("ready", async message => {
  const channel = client.channels.get("696338167237705828");
  if (!channel) return console.error("Kanal 'ID' girilmemiş.");
  channel
    .join()
    .then(connection => {
      console.log("Başarıyla bağlanıldı.");
    })
    .catch(e => {
      console.error(e);
    });
});