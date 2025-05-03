import { Elysia, t } from 'elysia'
import { InteractionType, InteractionResponseType } from 'discord-interactions'
import { verifyKeyMiddleware } from '../../../middleware/discord'

export default new Elysia({ prefix: '/kiss' })
  .use(verifyKeyMiddleware(process.env.DISCORD_BOT_KISS_PUBLIC_KEY as string))
  .get('/ping', () => 'pong')
  .post('/interactions', ({ body }) => {
    // 1. Responde ao PING do Discord com PONG (OBRIGATÓRIO)
    if (body.type === InteractionType.PING) {
      return { type: InteractionResponseType.PONG }; // Resposta { type: 1 }
    }

    // 2. Restante da lógica para comandos
    if (body.type === InteractionType.APPLICATION_COMMAND) {
      switch (body.data?.name) {
        case 'elysia':
          return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: '🦊 Elysia is a fast, and friendly Bun web framework' }
          };
        case 'miau':
          return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: '🐱 Miau' }
          };
        case 'kiss':
          const targetUser = body.data.options?.find(option => option.name === 'user')?.value;

          return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `💋 <@${targetUser}> recebeu um beijinho! \nhttps://media.giphy.com/media/KH1CTZtw1iP3W/giphy.gif`,
            }
          };
        case 'somewone-kiss-somewone':
          const targetUser1 = body.data.options?.find(option => option.name === 'user')?.value;
          const targetUser2 = body.data.options?.find(option => option.name === 'user2')?.value;

          return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `💋 <@${targetUser1}> e <@${targetUser2}> se beijaram!`,
              embeds: [
                {
                  image: {
                    url: 'https://media.giphy.com/media/KH1CTZtw1iP3W/giphy.gif' // Um GIF de beijo!
                  }
                }
              ]
            }
          };
        default:
          return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: 'Comando desconhecido' }
          };
      }
    }
  }, {
    body: t.Object({
      type: t.Number(),
      data: t.Optional(t.Object({
        name: t.Optional(t.String()),
        options: t.Optional(t.Array(t.Object({
          name: t.String(),
          value: t.String()
        })))
      }))
    })
  })