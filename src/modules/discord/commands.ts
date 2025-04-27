
const DISCORD_BOT_ID = process.env.DISCORD_BOT_ID;
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

const url = `https://discord.com/api/v10/applications/${DISCORD_BOT_ID}/commands`;

const commands = [
  {
    name: 'elysia',
    description: 'Sobre o Elysia',
    default_member_permissions: null,
    dm_permission: true,
    type: 1 // 1 = CHAT_INPUT
  },
  {
    name: 'miau',
    description: 'Um gatinho',
    default_member_permissions: null,
    dm_permission: true,
    type: 1
  },
  {
    name: 'kiss',
    description: 'Give someone a kiss',
    type: 1, // CHAT_INPUT
    options: [
      {
        name: 'user',
        description: 'The user to kiss',
        type: 6, // 6 = USER
        required: true,
      }
    ],
    dm_permission: true, // Se quiser funcionar em DM (opcional aqui)
  },
  {
    name: 'somewone-kiss-somewone',
    description: 'Give someone a kiss',
    type: 1, // CHAT_INPUT
    options: [
      {
        name: 'user',
        description: 'The user to kiss',
        type: 6, // 6 = USER
        required: true,
      },
      {
        name: 'user2',
        description: 'The user to kiss',
        type: 6, // 6 = USER
        required: true,
      }
    ],
    dm_permission: true, // Se quiser funcionar em DM (opcional aqui)
  }
];

console.log("DISCORD_BOT_TOKEN", DISCORD_BOT_TOKEN)
console.log("DISCORD_BOT_ID", DISCORD_BOT_ID)

async function registerCommands() {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commands)
  });

  if (response.ok) {
    console.log('✅ Comandos registrados!');
  } else {
    console.error('❌ Erro ao registrar comandos:', await response.text());
  }
}

registerCommands();
