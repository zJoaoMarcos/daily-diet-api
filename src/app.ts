import { fastify } from 'fastify'

import { UsersRoutes } from './controllers/users'
import { MealsRoutes } from './controllers/meals'

export const app = fastify()

app.register(UsersRoutes, { prefix: 'users/' })
app.register(MealsRoutes, { prefix: 'meals/' })
