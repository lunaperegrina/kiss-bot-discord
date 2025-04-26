
import { Elysia } from 'elysia';

const AuthService = new Elysia({ name: 'Service.Auth' })
  .derive({ as: 'scoped' }, ({ headers }) => ({
    // Simulação de autenticação básica via headers
    Auth: {
      userId: headers['x-user-id'] || null,
      isAdmin: headers['x-is-admin'] === 'true'
    }
  }))
  .macro(({ onBeforeHandle }) => ({
    // Macro para rotas protegidas
    requireAuth(required = true) {
      onBeforeHandle(({ Auth, error }) => {
        if (required && !Auth?.userId) {
          return error(401, 'Unauthorized');
        }
      });
    },
    // Macro para verificar admin
    requireAdmin() {
      onBeforeHandle(({ Auth, error }) => {
        if (!Auth?.isAdmin) {
          return error(403, 'Forbidden');
        }
      });
    }
  }));

  export default AuthService