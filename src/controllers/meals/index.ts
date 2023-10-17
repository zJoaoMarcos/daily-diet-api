import { FastifyInstance } from 'fastify'
import { registerMeal } from './register-meal'
import { FetchUserMeals } from './fetch-user-meals'

export async function MealsRoutes(app: FastifyInstance) {
  // TODO:
  // create meal
  app.post(':userId', registerMeal)

  // get all user meals
  app.get(':userId', FetchUserMeals)
  // edit meal
  // delete meal
  // get meal
}
