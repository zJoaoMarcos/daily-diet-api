import { FastifyInstance } from 'fastify'
import { signUp } from './sign-up'

export async function UsersRoutes(app: FastifyInstance) {
  // TODO: add routes
  //  auth
  // signUp
  app.post('signup', signUp)
  /// create user
  //  metrics
}
