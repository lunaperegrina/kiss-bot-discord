
const DISCORD_BOT_KISS_ID = process.env.DISCORD_BOT_KISS_ID;
const DISCORD_BOT_KISS_TOKEN = process.env.DISCORD_BOT_KISS_TOKEN;

const kissUrl = `https://discord.com/api/v10/applications/${DISCORD_BOT_KISS_ID}/commands`;

const kissCommands = [
  {
    name: 'elysia',
    description: 'Sobre o Elysia',
    default_member_permissions: null,
    dm_permission: true,
    type: 1 // 1 = CHAT_INPUT
  },
  {
    name: 'souls',
    description: 'Uma alminha',
    default_member_permissions: null,
    dm_permission: true,
    type: 1
  },
];

async function kissRegisterCommands() {
  const response = await fetch(kissUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bot ${DISCORD_BOT_KISS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(kissCommands)
  });

  if (response.ok) {
    console.log('✅ Comandos registrados!');
  } else {
    console.error('❌ Erro ao registrar comandos:', await response.text());
  }
}

kissRegisterCommands();
