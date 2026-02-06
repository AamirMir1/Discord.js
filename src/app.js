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

bot.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    interaction.reply("Pong!");
  }
  if (interaction.commandName === "sum") {
    const number1 = interaction.options.get("number1")?.value;
    const number2 = interaction.options.get("number2")?.value;

    interaction.reply(`${number1 + number2} is the sum of your numbers`);
  }
});
bot.login(process.env.DISCORD_TOKEN);
