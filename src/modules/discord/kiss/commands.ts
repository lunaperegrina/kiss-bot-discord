
const DISCORD_BOT_SOULS_ID = process.env.DISCORD_BOT_SOULS_ID;
const DISCORD_BOT_SOULS_TOKEN = process.env.DISCORD_BOT_SOULS_TOKEN;

const soulsUrl = `https://discord.com/api/v10/applications/${DISCORD_BOT_SOULS_ID}/commands`;

const soulsCommands = [
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
];

async function soulsRegisterCommands() {
  const response = await fetch(soulsUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bot ${DISCORD_BOT_SOULS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(soulsCommands)
  });

  if (response.ok) {
    console.log('✅ Comandos registrados!');
  } else {
    console.error('❌ Erro ao registrar comandos:', await response.text());
  }
}

soulsRegisterCommands();
