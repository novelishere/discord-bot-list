const {MessageEmbed, Permissions} = require('discord.js')
const db = require('orio.db')

exports.run = async (client, message, args) => {
 
  const {guild, channel, author} = message
  if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return channel.send(`> **Üzgünüm <@${author.id}>, bu komutu kullanmak için __Yetkili Olman__ gerekiyor.**`)
  
  
  let log = process.env.MOD_LOG || '❌ Ayarlanmamış'
  let onayred = process.env.ONAY_RED_LOG || '❌ Ayarlanmamış.'
  let kanal = process.env.CHANNEL || '❌ Ayarlanmamış'
  let rol = process.env.PERM_ROLE_ID || '❌ Ayarlanmamış'
  let ban = process.env.BAN || '❌ Aktif Değil.'
  let otoonay = process.env.OTO_ONAY || '❌ Aktif Değil.'
  
  const embed = new MessageEmbed()
  .setTitle("Ayarlar")
  .setColor("BLUE")
  .setFooter({text: author.tag, iconURL: author.displayAvatarURL({dynamic: true})})
  .addField("",``)
  
}
exports.conf = {
  aliases: ['settings', 'config']
}

exports.help = {
  name: 'ayarlar'
}