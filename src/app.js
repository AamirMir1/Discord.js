import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const bot = new Client({
  // Client is the bot
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ], // Intents are basically the permissions which our bot is going to use
});

// Events
bot.on("clientReady", (c) => {
  console.log(`${c.user.tag?.split("#")[0]} is online`);
});

bot.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content?.trim()?.toLowerCase() === "hi") {
    message.reply("Hello");
  }
});

bot.login(process.env.DISCORD_TOKEN);
