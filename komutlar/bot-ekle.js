const {MessageEmbed, MessageActionRow, MessageButton, Permissions} = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
 
  let msg = message.channel
  let modlog = client.channels.cache.get(process.env.MOD_LOG)
  let onayredlog = client.channels.cache.get(process.env.ONAY_RED_LOG)
  
  let user = db.fetch(`userbot_${message.author.id}_${id}`)
  let bot = db.fetch(`bot_${id}`)
  
  let id = args[0]
  if(!id) return msg.send(`> Üzgünüm <@${message.author.id}>, **botunuzun idsini belirtmeniz gerekiyor.**`)
  if(isNaN(id)) return msg.send(`> Üzgünüm <@${message.author.id}>, **belirtmiş olduğunuz id rakamlardan oluşmuyor.**`)
  if(id.length !== 18) return msg.send(`> Üzgünüm <@${message.author.id}>, **discord idleri 18 uzunluktan oluşuyor.**`)
  
  if(bot.status === 'bekliyor') return msg.send("> Üzgünüm <@${mess")
  
}
exports.conf = {
  aliases: []
}
exports.help = {
  name: 'bot-ekle'
}