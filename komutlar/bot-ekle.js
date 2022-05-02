const {MessageEmbed, MessageActionRow, MessageButton, Permissions} = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
 
  let msg = message.channel
  
 if(message.channel.id !== process.env.CHANNEL) return msg.send(`Üzgünüm <@${message.author.id}>, **Bu kanal bot-ekle kanalı olarak ayarlanmamış, lütfen <#${process.env.CHANNEL}> kanalında kullanmaya çalışın.**`)
  
  let id = args[0]
  
  let modlog = client.channels.cache.get(process.env.MOD_LOG)
  let onayredlog = client.channels.cache.get(process.env.ONAY_RED_LOG)
  
  let user = db.fetch(`userbot_${message.author.id}`)
  let bot = db.fetch(`bot_${id}`)
  let list = db.fetch(`botlist_${message.guild.id}`)
  
  if(!id) return msg.send(`> Üzgünüm <@${message.author.id}>, **botunuzun idsini belirtmeniz gerekiyor.**`)
  if(isNaN(id)) return msg.send(`> Üzgünüm <@${message.author.id}>, **belirtmiş olduğunuz id rakamlardan oluşmuyor.**`)
  if(id.length !== 18) return msg.send(`> Üzgünüm <@${message.author.id}>, **discord idleri 18 uzunluktan oluşuyor.**`)
  
  if(bot) {
  if(bot.status === 'bekliyor') return msg.send(`> Üzgünüm <@${message.author.id}>,** bu bot zaten başvurmuş, lütfen onaylanmasını bekleyin.**`)
  if(bot.status === 'onaylandı') return msg.send(`> Üzgünüm <@${message.author.id}>, **bu bot zaten sistemimizde bulunuyor.**`)
  } else {
  if(!list) return db.set(`botlist_${message.guild.id}`, [])
  
  const buttons = new MessageActionRow()
  .addComponents(
    
    new MessageButton()
		.setURL(`https://discord.com/oauth2/authorize?client_id=${id}&guild_id=${message.guild.id}&scope=bot&permissions=0`)
		.setLabel('Davet 0 Perm')
		.setStyle('LINK'),

		new MessageButton()
		.setURL(`https://discord.com/oauth2/authorize?client_id=${id}&guild_id=${message.guild.id}&scope=bot&permissions=8`)
		.setLabel('Davet 8 Perm')
		.setStyle('LINK'),

)
  
  const embed = new MessageEmbed()
  .setColor("BLUE")
  .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
  .addField(`Ekleyen`,`<@${message.author.id}>`)
  .addField(`Bot`,`<@${id}>`)
  .addField(`Mesaja Git`,`[Link](https://discord.com/channels/${message.guild.id}/${msg.id}/${message.id})`)
  .setFooter({text: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
  
  msg.send(`> Hey <@${message.author.id}>, **başvurunuz yetkililerle iletilmiştir. Lütfen onaylanmasını bekleyiniz.**`)
  modlog.send(`<@${message.author.id}>, <@${id}> botunu sisteme ekledi.`)
  onayredlog.send({embeds: [embed], components: [buttons]})
    
   db.set(`bot_${id}`, {status: 'bekliyor', userId: message.author.id})
   db.push(`botlist_${message.guild.id}`, id)
}
}
exports.conf = {
  aliases: []
}
exports.help = {
  name: 'bot-ekle'
}