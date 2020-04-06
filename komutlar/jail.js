const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix;


var mutelirolu = "Karantina⚠️" //MUTELENDİGİ ZAMAN VERİLECEK ROLU  BURAYA YAZINIZ...

module.exports.run = async (bot, message, args) => {
if (!message.member.roles.find('id', '660525842795069443') && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu Komutu Kullanmak İçin Yetkin yok ");
  let mutekisi = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!mutekisi) return message.reply(`Bir Kullanıcı etiketleyiniz `)
  if(mutekisi.hasPermission("MANAGE_MESSAGES")) return message.reply(` Yetkili bir kişiyi Hapishaneye atamam! `)
  let muterol = message.guild.roles.find(`name`, mutelirolu);
  if(!muterol){
    try{
      muterol = await message.guild.createRole({
        name: "mutelirolu",
        color: "#0000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
 

 let guild = message.guild
  let reason = args.slice(1).join(' ');
const member = message.guild.member(mutekisi);
if (reason.length < 2 ) return message.reply('**Hapishane Sebebini Yazarmısın ?**');
  if (message.mentions.users.size < 1) return message.reply('**Kimi Hapishaneye atıcağımı Yzarmısın ?**').catch(console.error);
 if(member.hasPermission('ADMINISTRATOR')) return message.reply("__Yönetici Bir Kişi Jaile Atılamaz__").then(msg => {
    msg.delete(9000), message.delete(9000)
    });
if(member.roles.find('696338076267577364', '696338080222674944', '696338082420490330', '696338083054092332')) return message.reply("__Bu kişi Jaile atılamaz__").then(msg => {
    msg.delete(9000), message.delete(9000)
    });


  await(mutekisi.addRole(muterol.id));
mutekisi.removeRole(`696338103236821023`) //ayarlandı kayıtsız
mutekisi.removeRole(`696338102423257208`) //ayarlandı erkek
mutekisi.removeRole(`696338101831991346`) //ayarlandı kız 
mutekisi.removeRole(`696338089551069244`) //ayarlandı family
mutekisi.removeRole(`696338077643309083`) //YETKİLİ ALIM DM
mutekisi.removeRole(`696338078322655302`)
mutekisi.removeRole(`696338078591090689`) 
mutekisi.removeRole(`696338081749401600`)  
mutekisi.removeRole(`696338080927318077`)  
mutekisi.removeRole(`696338082420490330`)  
mutekisi.removeRole(`696338083054092332`)  
mutekisi.removeRole(`696338083528048691`)  
mutekisi.removeRole(`696338084362453012`)  
mutekisi.removeRole(`696338084828020767`)  
mutekisi.removeRole(`696338085549572127`)  
mutekisi.removeRole(`696338086472450050`)  
mutekisi.removeRole(`696338087101595670`)  
mutekisi.removeRole(`696338088011497503`)  
mutekisi.removeRole(`696338088867266612`)  
mutekisi.removeRole(`696338090947641355`)  
mutekisi.removeRole(`696338091576655902`)  
mutekisi.removeRole(`696338092331761705`)  
mutekisi.removeRole(`696338093296320562`)  
mutekisi.removeRole(`696338093925728317`)  
mutekisi.removeRole(`696338094806269952`)  
mutekisi.removeRole(`696338095074967614`)  //transort
mutekisi.removeRole(`696338095695462502`)  
mutekisi.removeRole(`696338096614277210`)  
mutekisi.removeRole(`696338099642564688`)  //VİP
mutekisi.removeRole(`696338104688181298`)  //VOCAL
mutekisi.removeRole(`696338104973262899`)  
mutekisi.removeRole(`696338100519174214`)  
mutekisi.removeRole(`696338105954992128`)  
mutekisi.removeRole(`696338106227490865`)  
mutekisi.removeRole(`696338108639346709`)  
mutekisi.removeRole(`696338109390127155`)  
mutekisi.removeRole(`696338110438572092`)  
mutekisi.removeRole(`696338111243878434`)  
mutekisi.removeRole(`696338111801720843`)  
mutekisi.removeRole(`696338113089241128`)  
mutekisi.removeRole(`696338115630989332`)  
mutekisi.removeRole(`696338115895230496`)  
mutekisi.removeRole(`696338116675633193`)  
mutekisi.removeRole(`696338117627478086`)  
mutekisi.removeRole(`696338118265012295`)  
mutekisi.removeRole(`696338119028375703`)  
mutekisi.removeRole(`696338119808516106`)  //TERAZİ
mutekisi.removeRole(`696338120425340978`) 
mutekisi.removeRole(`696338120806891623`) 
mutekisi.removeRole(`696338121733963846`) 
mutekisi.removeRole(`696338122371366912`) 
mutekisi.removeRole(`696338122979409960`) 
mutekisi.removeRole(`696338124724502608`) 
mutekisi.removeRole(`696338125152059463`) 
mutekisi.removeRole(`696338125902839841`) 
mutekisi.removeRole(`696338126809071646`) 
mutekisi.removeRole(`696338127526166558`) 
mutekisi.removeRole(`696338128172089344`) 
mutekisi.removeRole(`696338128583000137`) 
mutekisi.removeRole(`696338129707335731`) 
mutekisi.removeRole(`696338130676088832`) 
mutekisi.removeRole(`696338131363954778`) 
mutekisi.removeRole(`696338132110671894`) 
mutekisi.removeRole(`696338132785954887`) 
mutekisi.removeRole(`696338133389672468`) 
mutekisi.removeRole(`696338134144909413`) 
mutekisi.removeRole(`696338134937370634`) 
mutekisi.removeRole(`696338135839277086`) 
mutekisi.removeRole(`696338136338268191`) 
mutekisi.removeRole(`696338136984191038`) 
  mutekisi.addRole(`696338097826168873`) 
message.react("a:tik:696408791339499540")
  message.channel.send(`<@${mutekisi.id}> kullanıcısı  __${reason}__ sebebiyle **"Jaile"** atıldı! <a:loading:696464790943563907>`);
mutekisi.send(`__${reason}__ sebebiyle **"Jaile"** atıldınız <a:loading:696464790943563907>`)
const sChannel = message.guild.channels.find(c=> c.id ==="696338233436536852")
  let modlog = new Discord.RichEmbed() 
  .setColor('RANDOM')
  .setDescription(`<@${mutekisi.id}> adlı Hapishaneye atıldı <a:loading:696464790943563907> \n Atan Yetkili: **${message.author.username}#${message.author.discriminator}** \n Sebebi : **"${reason}"** \n`)
   sChannel.send(modlog)

  setTimeout(function(){
    mutekisi.removeRole(muterol.id);
    mutekisi.addRole(``)
    mutekisi.send(``)
 
const sChannel = message.guild.channels.find(c=> c.id ==="")
  let modlog = new Discord.RichEmbed() 
  .setColor('RANDOM')
  .setDescription(``)
   sChannel.send()


 }, ms());







}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['jail'],
    permLevel: 0
  };
  
  exports.help = {
    name: "jail",
  };