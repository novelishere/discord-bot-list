const {MessageEmbed, Permissions} = require('discord.js')
const db = require('orio.db')

exports.run = async (client, message, args) => {
 
  const {guild, channel, author} = message
  if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return channel.send(`> **Üzgünüm <@${author.id}>, bu komutu kullanmak için __Yetkili Olman__ gerekiyor.**`)
  
  const embed = new MessageEmbed()
  .setTitle("Ayarlar")
  .setColor("BLUE")
  .setFooter({text: author.tag, iconURL: author.displayAvatarURL({dynamic: true})})
  
}
exports.conf = {
  aliases: ['settings', 'config']
}

exports.help = {
  name: 'ayarlar'
}