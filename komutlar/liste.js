const {MessageEmbed, MessageActionRow, MessageButton, Permissions} = require('discord.js')
const db = require('orio.db')

exports.run = async(client, message, args) => {
  
  let msg = message.channel
  let list = db.fetch(`list_${message.guild.id}`)
  let bot = db.fetch(`bot_${list}`)
  if(bot) {
    var durum = '✅'
  } else {
    var durum = '❌'
  }
  let liste = list.map(x => `> ${durum} **${x}**`).join(`\n`)
  
  let perm = process.env.PERM_ROLE_ID
  if(!message.member.roles.cache.has(perm)) return msg.send(`> Üzgünüm <@${message.author.id}, **bu komut yanlız yöneticiler olarak ayarlı**`)
  
  const embed = new MessageEmbed()
  .setTitle("Onaylanmayı Bekleyen Botlar...")
  .setColor("BLUE")
  .setDescription(`${liste}`)
  .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
  
  msg.send({embeds: [embed]})
  
}
exports.conf = {
  aliases: ['list']
}
exports.help = {
  name: 'liste'
}