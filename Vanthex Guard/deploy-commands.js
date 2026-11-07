require("dotenv").config();
const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("play")
    .setDescription("YouTube linki ile müzik çalar.")
    .addStringOption(o => o.setName("query").setDescription("YouTube URL").setRequired(true)),

  new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Müziği duraklatır."),

  new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Şu anki çalan şarkıyı gösterir."),
].map(c => c.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Komutlar yükleniyor...");
    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log("Komutlar yüklendi ✅", data);
  } catch (err) {
    console.error("Hata:", err);
  }
})();
  