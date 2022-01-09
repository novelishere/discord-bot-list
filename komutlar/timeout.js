		const fetch = require('node-fetch');
		const ms = require('ms');
const { MessageEmbed } = require('discord.js');


module.exports.run = async(client, message, args, tools) => {
		const time = args.slice(1).join(' ');

		if(!time) return message.channel.send("Lütfen bir zaman belirtin! \n`1m` - `1 Dakika` \n`1h` - `1 Saat` \n`1d` - `1 Gün` \n`1w` - `1 Hafta`");

		const user = message.mentions.users.first();
		const milliseconds = ms(time);

		if(!user) return message.channel.send('Lütfen bir kullanıcı belirtin!');
		if(!milliseconds || milliseconds < 10000 || milliseconds > 2419200000) {
			return message.channel.send('Geçersiz bir zaman girdiniz tekrar deneyin!');
		}

		const time2 = new Date(Date.now() + milliseconds).toISOString();

		await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
			method: 'PATCH',
			body: JSON.stringify({ communication_disabled_until: time2 }),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bot ${client.token}`,
			},
		});

const embed = new MessageEmbed()
  .setTitle(`Susturma İşlemi`)
  .setDescription(`<@${user.id}> Kullanıcısı \`${time.toString().replace(/(minute|min|m)/, ' Dakika').replace(/(week|w)/, ' Hafta').replace(/(days|day|d)/, ' Gün').replace(/(seconds|second|sec|s)/, ' Saniye').replace(/(hours|hour|h)/, ' Saat')}\` Susturuldu!`)
  .setColor('RANDOM')
  .setFooter(`ID: ${user.id}`)
  .setTimestamp()
message.channel.send({ embeds: [embed] });

};


exports.conf = {
  aliases: [],
  permLevel: 0,
};
exports.help = {
  name: 'timeout',
   description: 'Susturma',
  usage: 'timeout <@kullanıcı> <süre>'
};