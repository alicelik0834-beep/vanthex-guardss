### Step 1: Set Up Your Discord Bot

1. **Create a Discord Application**:
   - Go to the [Discord Developer Portal](https://discord.com/developers/applications).
   - Click on "New Application" and give it a name.
   - Navigate to the "Bot" tab and click "Add Bot".

2. **Get Your Bot Token**:
   - Under the "Bot" tab, you will find the "Token". Click "Copy" to save it for later.

3. **Invite Your Bot to Your Server**:
   - Go to the "OAuth2" tab.
   - Under "Scopes", select `bot`.
   - Under "Bot Permissions", select `Connect`, `Speak`, and `Read Messages`.
   - Copy the generated URL and paste it into your browser to invite the bot to your server.

### Step 2: Install Dependencies

Make sure you have Node.js installed. Then, create a new directory for your bot and run the following commands in your terminal:

```bash
mkdir discord-music-bot
cd discord-music-bot
npm init -y
npm install discord.js @discordjs/voice @discordjs/rest discord-api-types @discordjs/builders ytdl-core
```

### Step 3: Create the Bot Code

Create a file named `bot.js` and add the following code:

```javascript
const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const PREFIX = 'v!';
const player = createAudioPlayer();
let currentSong = null;
let loop = false;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'play') {
        const songUrl = args[0];
        if (!songUrl) {
            return message.channel.send('Please provide a YouTube URL.');
        }

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send('You need to be in a voice channel to play music!');
        }

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        const resource = createAudioResource(ytdl(songUrl, { filter: 'audioonly' }));
        player.play(resource);
        connection.subscribe(player);

        currentSong = songUrl;
        message.channel.send(`Now playing: ${songUrl}`);

        player.on(AudioPlayerStatus.Idle, () => {
            if (loop) {
                player.play(createAudioResource(ytdl(currentSong, { filter: 'audioonly' })));
            }
        });

    } else if (command === 'loop') {
        loop = !loop;
        message.channel.send(`Looping is now ${loop ? 'enabled' : 'disabled'}.`);
    }
});

client.login('YOUR_BOT_TOKEN');
```

### Step 4: Run Your Bot

Replace `YOUR_BOT_TOKEN` in the code with your actual bot token. Then, run your bot using the following command:

```bash
node bot.js
```

### Step 5: Using the Bot

- To play a song, use the command: `v!play <YouTube_URL>`.
- To enable or disable looping, use the command: `v!play loop`.

### Notes

1. **YouTube URLs**: Make sure to provide a valid YouTube URL when using the `v!play` command.
2. **Permissions**: Ensure your bot has the necessary permissions to connect and speak in the voice channel.
3. **Error Handling**: You may want to add error handling for various scenarios (e.g., invalid URLs, connection issues).

This is a basic implementation. You can expand it with more features like a queue system, pause/resume functionality, and more.