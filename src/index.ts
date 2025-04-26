import { Elysia, t } from "elysia";
import { describe, it, expect } from 'bun:test';
import UserController from "./modules/users/controller";
import PostController from "./modules/posts/controller";
import { swagger } from '@elysiajs/swagger';

// ==================== APP ====================
const app = new Elysia()
  .use(swagger())
  .get('/', () => 'Hello Elysia')
  .use(UserController)
  .use(PostController)
  .listen(3000, ({ hostname, port }) => {
    console.log(`🦊 Elysia is running at ${hostname}:${port}`);
  });

// ==================== TESTS ====================
// describe('Elysia App', () => {
//   it('should return hello message', async () => {
//     const response = await app
//       .handle(new Request('http://localhost/'))
//       .then((res) => res.text());

//     expect(response).toBe('Hello Elysia');
//   });

//   it('should protect user routes', async () => {
//     const response = await app
//       .handle(new Request('http://localhost/users/1'))
//       .then((res) => res.status);

//     expect(response).toBe(401);
//   });

//   it('should allow authenticated requests', async () => {
//     const response = await app
//       .handle(new Request('http://localhost/users/1', {
//         headers: { 'x-user-id': '123' }
//       }))
//       .then((res) => res.json());

//     expect(response).toHaveProperty('id');
//     expect(response).toHaveProperty('name');
//   });
// });