import { Elysia, t } from "elysia";
import AuthService from "../auth/controller";

const PostController = new Elysia({ prefix: '/posts' })
  .use(AuthService)
  .get('/', () =>  {
    return [
      {
        id: 1,
        title: 'Sample Post',
        content: 'This is a sample post content'
      }
    ]
  }, {
    detail: {
      tags: ['Posts'],
      description: 'Get all posts'
    }
  })
  .get('/:id', ({ params: { id } }) => ({
    id,
    title: 'Sample Post',
    content: 'This is a sample post content'
  }), {
    params: t.Object({
      id: t.String()
    }),
    detail: {
      tags: ['Posts'],
      description: 'Get post by ID'
    }
  })
  .post('/', ({ body, Auth }) => ({
    ...body,
    authorId: Auth.userId,
    createdAt: new Date().toISOString()
  }), {
    requireAuth: true,
    body: t.Object({
      title: t.String({ minLength: 5 }),
      content: t.String({ minLength: 10 })
    }),
    detail: {
      tags: ['Posts'],
      description: 'Create new post'
    }
  })
  .patch('/:id', ({ params: { id }, Auth }) => ({
    message: `Post ${id} updated by user ${Auth.userId}`
  }), {
    requireAuth: true,
    params: t.Object({
      id: t.String()
    }),
    detail: {
      tags: ['Posts'],
      description: 'Update post'
    }
  })
  .delete('/:id', ({ params: { id }, Auth }) => ({
    message: `Post ${id} deleted by user ${Auth.userId}`
  }), {
    requireAuth: true,
    params: t.Object({
      id: t.String()
    }),
    detail: {
      tags: ['Posts'],
      description: 'Delete post'
    }
  });

export default PostController