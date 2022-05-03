const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });
const ayarlar = require('./ayarlar.json');
const fs = require('fs');
const db = require('orio.db');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[NOVEL] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
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

client.on('guildMemberRemove', async member => {
  
if(process.env.BAN === 'true') {
  
  let log = client.channels.cache.get(process.env.MOD_LOG)
  
  let user = db.fetch(`userbot_${member.user.id}`)
  if(!user) return;
  let bot = db.fetch(`bot_${user.botId}`)
  if(bot.status === 'onaylandı') {
      
    
  let bott = member.guild.users.cache.get(user.botId)
  bott.ban({reason: 'Sahibi Çıktı'})
    
 log.send(`<@${member.user.id} sunucudan çıktığı için <@${user.botId}> botunu banladım`)
  
  }
  
  } else {
    return;
  }
  
});

client.on('guildMemberAdd', async member => {
  
  if(process.env.OTO_ONAY === 'true') {
    
    let bot = db.fetch(`bot_${member.user.id}`)
    if(bot) {
      
      db.set(`bot_${member.user.id}`, {status: 'onaylandı'})
      client.channels.cache.get(process.env.MOD_LOG).send(`<@${bot.userId}> adlı kullanıcının botu <@${member.user.id}> onaylandı.`)
      
    }
    
  }
  
});

client.on('ready', () => {
  console.log("--------------------------------------------------------------------")
  console.log(`Atlas Code & Winter Code: ${client.user.tag}, Token girişi başarılı.`)
  console.log("--------------------------------------------------------------------")
  
  client.user.setPresence({ activities: [{ name: 'Made By. Novel#3000' }], status: 'online' });
  
});

client.on('ready', () => {
  if(!process.env.MOD_LOG) {
   console.log("MOD_LOG: Ayarlı değil, lütfen .env üzerinden gerekli yerleri düzenleyin!")
  }
  
  if(!process.env.ONAY_RED_LOG) {
   console.log("ONAY_RED_LOG: Ayarlı değil, lütfen .env üzerinden gerekli yerleri düzenleyin!") 
  }
  
  if(!process.env.CHANNEL) {
    console.log("CHANNEL: Ayarlı değil, lütfen .env üzerinden gerekli yerleri düzenleyin!")
  }
  
  if(!process.env.PERM_ROLE_ID) {
    console.log("PERM_ROLE_ID: Ayarlı değil, lütfen .env üzerinden gerekli yerleri düzenleyin!")
  }
  
  if(!process.env.OTO_ONAY) {
    console.log("OTO_ONAY Ayarlı değil, lütfen .env üzerinden gerekli yerleri düzenleyin!")
  }
  
  if(!process.env.BAN) {
    console.log("BAN: Ayarlı değil, lütfen .env üzerinden gerekli yerleri düzenleyin!")
  }
    console.log("--------------------------------------------------------------------")
});




client.login(process.env.TOKEN);
