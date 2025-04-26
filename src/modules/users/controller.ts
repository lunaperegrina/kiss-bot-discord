import { Elysia, t } from "elysia";
import AuthService from "../auth/controller";

const UserController = new Elysia({ prefix: '/users' })
  .use(AuthService)
  .get('/', () => ({
    users: [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ]
  }), {
    detail: {
      tags: ['Users'],
      description: 'Get all users'
    }
  })
  .get('/:id', ({ params: { id }, Auth }) => ({
    id,
    name: 'John Doe',
    isCurrentUser: Auth.userId === id
  }), {
    // requireAuth: true,
    params: t.Object({
      id: t.String()
    }),
    detail: {
      tags: ['Users'],
      description: 'Get user by ID'
    }
  })
  .post('/', ({ body }) => body, {
    body: t.Object({
      username: t.String({ minLength: 3 }),
      password: t.String({ minLength: 8 })
    }),
    requireAuth: true,
    requireAdmin: true,
    detail: {
      tags: ['Users'],
      description: 'Create new user'
    }
  })
  .patch('/:id', ({ params: { id } }) => ({
    message: `User ${id} updated`
  }), {
    requireAuth: true,
    params: t.Object({
      id: t.String()
    }),
    detail: {
      tags: ['Users'],
      description: 'Update user'
    }
  })
  .delete('/:id', ({ params: { id } }) => ({
    message: `User ${id} deleted`
  }), {
    requireAuth: true,
    requireAdmin: true,
    params: t.Object({
      id: t.String()
    }),
    detail: {
      tags: ['Users'],
      description: 'Delete user'
    }
  });

  export default UserController