const {MessageEmbed, MessageActionRow, MessageButton, Permissions} = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
 
  let id = args[0]
  
  let msg = message.channel
  let modlog = client.channels.cache.get(process.env.MOD_LOG)
  let onayredlog = client.channels.cache.get(process.env.ONAY_RED_LOG)
  
  let user = db.fetch(`userbot_${message.author.id}`)
  let bot = db.fetch(`bot_${id}`)
  
  if(!id) return msg.send(`> Üzgünüm <@${message.author.id}>, **botunuzun idsini belirtmeniz gerekiyor.**`)
  if(isNaN(id)) return msg.send(`> Üzgünüm <@${message.author.id}>, **belirtmiş olduğunuz id rakamlardan oluşmuyor.**`)
  if(id.length !== 18) return msg.send(`> Üzgünüm <@${message.author.id}>, **discord idleri 18 uzunluktan oluşuyor.**`)
  
  if(bot) {
  if(bot.status === 'bekliyor') return msg.send(`> Üzgünüm <@${message.author.id}>, bu bot zaten başvurmuş, lütfen onaylanmasını bekleyin.`)
  if(bot.status === 'onaylandı') return msg.send(`> Üzgünüm <@${message.author.id}>, bu bot zaten sistemimizde bulunuyor.`)
  } else {
  
  const buttons = new MessageActionRow()
  .addComponents(
    
    new MessageButton()
		.setURL(`https://discord.com/oauth2/authorize?client_id=${id}&guild_id=${message.guild.id}&scope=bot&permissions=0`)
		.setLabel('Davet')
		.setStyle('LINK'),

		new MessageButton()
		.setURL(`https://discord.com/oauth2/authorize?client_id=${id}&guild_id=${message.guild.id}&scope=bot&permissions=8`)
		.setLabel('Davet')
    .setEmoji(':eight: ')
		.setStyle('LINK'),

)
  
  const embed = new MessageEmbed()
  .setColor("BLUE")
  .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
  .addField(`Ekleyen`,`<@${message.author.id}>`)
  .addField(`Bot`,`<@${id}>`)
  .setFooter({text: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
  
  msg.send(`> Hey <@${message.author.id}>, başvurunuz yetkililerle iletilmiştir. Lütfen onaylanmasını bekleyiniz.`)
  modlog.send(`<@${message.author.id}>, <@${id}> botunu sisteme ekledi.`)
  onayredlog.send({embeds: [embed], components: [buttons]})
}
}
exports.conf = {
  aliases: []
}
exports.help = {
  name: 'bot-ekle'
}