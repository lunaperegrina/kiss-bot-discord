import { Elysia } from 'elysia'
import { verifyKey } from 'discord-interactions'

export const verifyKeyMiddleware = (publicKey: string) => {
  return new Elysia({ name: 'discord-verify-key' })
    .onRequest(async ({ request, set }) => {
      const signature = request.headers.get('X-Signature-Ed25519')
      const timestamp = request.headers.get('X-Signature-Timestamp')
      const rawBody = await request.text()

      if (!signature || !timestamp) {
        set.status = 401
        return 'Unauthorized'
      }

      console.log("signature", signature)
      console.log("timestamp", timestamp)
      console.log("rawBody", rawBody)
      console.log("publicKey", publicKey)

      const isValid = await verifyKey(rawBody, signature, timestamp, publicKey)
      if (!isValid) {
        set.status = 401
        return 'Invalid request signature'
      }

      console.log("isValid", isValid)
      // Store the raw body for later use
      request.json = () => JSON.parse(rawBody)
    })
}