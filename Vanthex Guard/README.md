# Discord Giveaway Bot

Bu gelişmiş Discord çekiliş botu, anlık katılımcı sayısı ve şans gösterimi ile çekilişleri yönetir.

## Özellikler
- Çekiliş başlatma komutu: `v!çekiliş <ödül> <süre> [kaçkişi]`
- Gizli Çekiliş Form Komutu: `v!çekiliş1` (Modal form açar, **sadece bot sahibi kullanabilir**)
- Katıl/Ayrıl butonları
- Anlık katılımcı sayısı ve şans güncellemesi
- Otomatik kazanan seçimi
- Mesaj silme komutu: `v!sil <sayı>` (1-100 arası mesaj siler)
- Kanal nuke komutu: `v!nuke` (kanalı yeniden oluşturarak tüm mesajları siler)
- Otomatik cevap sistemi: Tetikleyici mesajlara otomatik yanıt
- Otomatik cevap listesi: `v!otocevaplist` (ekle/sil butonları ile)
- Spam koruması: 5 saniye içinde 5+ mesaj gönderenleri engeller
- Otomatik rol: `v!otorol` (yeni üyelere otomatik rol verme, yönetici gerekli)
- Ceza bildirimi: Mute veya ban yendiğinde DM ile itiraz bilgisi gönderir
- Spam ayarları: `v!spam` (menü ile aç/kapat, susturma ayarı)
- Ping komutu: `v!ping` (botun pingini gösterir)- Yardım komutu: `v!yardım` (komut listesi ve kullanım)
- Koruma ayarları: `v!koruma` (anti-raid korumaları, yönetici gerekli)- Unmute komutu: `v!unmute @kullanıcı`

## Kurulum
1. `.env` dosyasına bot tokenınızı ve Groq anahtarınızı ekleyin:
   - `DISCORD_TOKEN=your_token_here`
   - `GROQ_API_KEY=your_groq_key_here`
   - `hsan_AI_ENABLED=true`
   - İsteğe bağlı model: `ELECTUS_GROQ_MODEL=llama-3.3-70b-versatile`
2. Bağımlılıkları yükleyin: `npm install`
3. Botu başlatın: `npm start`

### Müzik için ek notlar
- `v!play <URL>` komutu sadece doğrudan URL alır ve oynatır.
- Proje `ffmpeg-static` kullanır; ancak sisteminizde `yt-dlp` yüklü ve PATH'e eklenmiş olmalı. Windows için `yt-dlp` kurup PATH'e ekleyin veya uygun yolu sağlayın.
- Eğer `yt-dlp` yüklü değilse, `v!play` çalıştırıldığında hata mesajı alırsınız.

## Kullanım
- Çekiliş başlatmak için: `v!çekiliş Discord Nitro 1h 1kişi`
- Gizli form ile çekiliş kurmak için (BOT SAHİBİ SADECE): `v!çekiliş1` (Modal açılır, ödül, süre, kazanan sayısı ve kazanacak kişiler yazıp gönderebilirsiniz)
- Mesaj silmek için: `v!sil 10` (son 10 mesajı siler)
- Kanalı nuke etmek için: `v!nuke` (kanalı yeniden oluşturur)
- Otomatik cevapları listelemek için: `v!otocevaplist`
- Spam ayarlarını yönetmek için: `v!spam`
- Ping için: `v!ping`
- Yardım için: `v!yardım`
- Koruma ayarları için: `v!koruma`
- Mute için: `v!mute @user spam 5d`
- Davet istatistikleri için: `v!davet @user`
- Otomatik rol için: `v!otorol`
- Unmute için: `v!unmute @user`