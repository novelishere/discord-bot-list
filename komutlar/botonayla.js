const {MessageEmbed, MessageActionRow, MessageButton, Permissions} = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
  
  let id = args[0]
  let msg = message.channel
  let list = db.fetch(`list_${message.guild.id}`)
  let log = client.channels.cache.get(process.env.MOD_LOG)
  let bot = db.fetch(`bot_${id}`)
  
  let perm = process.env.PERM_ROLE_ID
  if(!message.member.roles.cache.has(perm)) return msg.send(`> Üzgünüm <@${message.author.id}, **bu komut yanlız yöneticiler olarak ayarlı**`)
  if(!id) return msg.send(`> Üzgünüm <@${message.author.id}>, **bir id belirtmen gerekiyor**`)
  if(!bot) return msg.send(`> Böyle bir bot başvurmamış.`)
  if(bot.status === 'onaylandı') return msg.send(`> Bu bot zaten sistemimizde bulunuyor.`)
  
  
  db.arrayDeleteVal(`list_${message.guild.id}`, id)
  db.push(`bot_${id}`, {status: 'onaylandı'})
  
  msg.send(`> ✅ Tebrikler, botu onayladınız.`)
  log.send(`<@${bot.userId}> adlı kullanıcının botu <@${id}> onaylandı.`)

}
exports.conf = {
  aliases: ['onayla']
}
exports.help = {
  name: 'botonayla'
}