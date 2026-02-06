import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();
const commands = [
  {
    name: "ping",
    description: "This would reply pong!",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
