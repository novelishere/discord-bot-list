const {MessageEmbed, MessageActionRow, MessageButton, Permissions} = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
  
  let msg = message.channel
  let list = db.fetch(`botlist_${message.guild.id}`)
  let liste = list.map(novel => novel).join("\n")
  
  let perm = process.env.PERM_ROLE_ID
  if(!message.member.roles.cache.has(perm)) return msg.send(`> Üzgünüm <@${message.author.id}, **bu komut yanlız yöneticiler olarak ayarlı**`)
  
  const embed = new MessageEmbed()
  .setTitle("Onaylanmayı Bekleyen Botlar...")
  .setColor("BLUE")
  .setDescription(`>> ${liste}`)
  
}
exports.conf = {
  aliases: ['list']
}
exports.help = {
  name: 'liste'
}