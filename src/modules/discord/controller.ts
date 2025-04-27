import { Elysia, t } from 'elysia'
import { InteractionType, InteractionResponseType } from 'discord-interactions'
import { verifyKeyMiddleware } from '../../middleware/discord'

export default new Elysia({ prefix: '/discord' })
  // .use(verifyKeyMiddleware('MY_CLIENT_PUBLIC_KEY'))
  .get('/ping', () => 'pong')
  .post('/interactions', ({ body }) => {
    if (body.type === InteractionType.APPLICATION_COMMAND) {
      switch (body.data.name) {
        case 'elysia':
          return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: '🦊 Elysia is a fast, and friendly Bun web framework'
            }
          }
        case 'miau':
          return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: '🐱 Miau'
            }
        }
        default:
          return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: 'Comando desconhecido'
            }
          }
      }
    }
  }, {
    body: t.Object({
      type: t.Number(),
      data: t.Object({
        name: t.Optional(t.String())
      })
    }),
    detail: {
      tags: ['Discord'],
      description: 'Handle Discord interactions'
    }
  })