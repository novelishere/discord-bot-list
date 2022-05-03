BotList Botunu Nasıl Kurabilirsiniz?
====================================

### x Ayarlı değil, lütfen .env üzerinden gerekli yerleri düzenleyin!

Eğer bu hatayı alıyor iseniz .env dosyasındaki gerekli yerleri düzenlememişsinizdir. Düzenlemesi Zorunlu Olan Yerler;

• **TOKEN**

• **MOD_LOG**

• **ONAY_RED_LOG**

• **CHANNEL**

• **PERM_ROLE_ID**

• **OTO_ONAY**

• **BAN**

# TOKEN
• **TOKEN** yazan yerin hemen karşısına [Discord Developers](https://discord.com/developers/applications)dan bir token alıp yerleştirin.
# MOD_LOG
• **MOD_LOG** yazan yerin hemen karşısına logların hangi kanala gideceğinini istiyorsanız o kanalın idsini yerleştirin.
# ONAY_RED_LOG
• **ONAY_RED_LOG** yazan yerin hemen karşısına yetkililer için ayarlanmış log kanalının idsini yerleştirin.
# CHANNEL
• **CHANNEL** yazan yerin karşısına `<prefix>bot-ekle` komutunun kullanılacak kanal idsini yerleştirin.
# PERM_ROLE_ID
• **PERM_ROLE_ID** yazan yerin karşısına `<prefix>onayla`,`<prefix>liste`,`<prefix>reddet` komutlarını kullanabilecek kişilere özel bir rol oluşturun ve o rolün idsini yerleştirin.
# OTO_ONAY
• **OTO_ONAY** yazan yerin karşısına **true** yazarsanız otomatik onaylatma sistemi açılır. Örnek;
 diyelim ki x kullanıcısını botunu ekletti