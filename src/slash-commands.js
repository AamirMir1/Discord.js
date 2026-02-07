import { ApplicationCommandOptionType, REST, Routes } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const commands = [
  {
    name: "ping",
    description: "This would reply pong!",
  },
  {
    name: "embeds",
    description: "This is embed",
  },
  {
    name: "sum",
    description: "This will sum two numbers",
    options: [
      {
        name: "number1",
        type: ApplicationCommandOptionType.Number,
        description: "This type for sum",
        required: true,
        choices: [
          {
            name: "number-5",
            value: 5,
          },
          {
            name: "number-10",
            value: 10,
          },
        ],
      },
      {
        name: "number2",
        type: ApplicationCommandOptionType.Number,
        required: true,
        description: "This type for sum",
        choices: [
          {
            name: "number-20",
            value: 20,
          },
          {
            name: "number-40",
            value: 40,
          },
        ],
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully added slash commands");
  } catch (error) {
    console.error(error);
  }
})();
