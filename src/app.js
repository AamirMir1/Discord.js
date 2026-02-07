import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
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
  if (interaction.commandName === "embeds") {
    const exampleEmbed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Lucifer's Title")
      .setURL("https://discord.js.org/")
      .setAuthor({
        name: "Lucifer is the author",
        iconURL: "https://i.imgur.com/AfFp7pu.png",
        url: "https://discord.js.org",
      })
      .setDescription("Hated By Many Defeated By None")
      .setThumbnail("https://i.imgur.com/AfFp7pu.png")
      .addFields(
        { name: "Regular", value: "Some value here" },
        { name: "\u200B", value: "\u200B" },
        { name: "Inline field title", value: "Some value here", inline: true },
        { name: "Inline field title", value: "Some value here", inline: true },
      )
      .addFields({
        name: "Inline field title",
        value: "Some value here",
        inline: true,
      })
      .setImage("https://i.imgur.com/AfFp7pu.png")
      .setTimestamp()
      .setFooter({
        text: "Some footer text here",
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });

    interaction.channel.send({ embeds: [exampleEmbed] });
  }
});
bot.login(process.env.DISCORD_TOKEN);
