import { fastify } from 'fastify'
import cookie from '@fastify/cookie'

import { MealsRoutes } from './controllers/meals'

export const app = fastify()

app.register(cookie)

app.register(MealsRoutes, { prefix: 'meals' })
