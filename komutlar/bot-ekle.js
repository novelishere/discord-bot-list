const {MessageEmbed, MessageActionRow, MessageButton, Permissions} = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
 
  let msg = message.channel
  
  let id = args[0]
  if(!id) return msg.send(`> Üzgünüm <@${message.author.id}>, **botunuzun idsini belirtmeniz gerekiyor.**`)
  if(isNaN(id)) return msg.send(`> Üzgünüm <@${message.author.id}>, **belirtmiş olduğunuz`)
  
}
exports.conf = {
  aliases: []
}
exports.help = {
  name: 'bot-ekle'
}