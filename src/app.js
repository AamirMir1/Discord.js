import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
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

const roles = [
  {
    id: "1469864974330368035",
    label: "Red",
  },
  {
    id: "1469865438203871335",
    label: "Blue",
  },
  {
    id: "1469865567711396023",
    label: "Green",
  },
];
bot.on("clientReady", (c) => {
  const row = new ActionRowBuilder();

  roles.forEach((role) => {
    row.components.push(
      new ButtonBuilder()
        .setCustomId(role.id)
        .setLabel(role.label)
        .setStyle(
          role.label === "Red"
            ? ButtonStyle.Danger
            : role.label === "Green"
              ? ButtonStyle.Success
              : role.label === "Blue"
                ? ButtonStyle.Primary
                : ButtonStyle.Primary,
        ),
    );
  });

  const channel = c.channels.cache.get("1468619678753489003");
  channel.send({
    content: "Add or remove a roll",
    components: [row],
  });
});

bot.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content?.trim()?.toLowerCase() === "hi") {
    message.reply("Hello");
  }
});

bot.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
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
          {
            name: "Inline field title",
            value: "Some value here",
            inline: true,
          },
          {
            name: "Inline field title",
            value: "Some value here",
            inline: true,
          },
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
  }

  if (interaction.isButton()) {
    await interaction.deferReply({ flags: "Ephemeral" });

    const role = interaction.guild.roles.cache.get(interaction.customId);

    if (!role) return interaction.editReply("Role doesn't exist");

    const isHas = interaction.member.roles.cache.has(role.id);

    if (isHas) {
      await interaction.member.roles.remove(role.id);

      return interaction.editReply(`${role.name} role removed`);
    } else {
      await interaction.member.roles.remove([
        ...interaction.member.roles.cache.keys(),
      ]);
      await interaction.member.roles.add(role.id);

      return interaction.editReply(`${role.name} role added`);
    }
  }
});
bot.login(process.env.DISCORD_TOKEN);
