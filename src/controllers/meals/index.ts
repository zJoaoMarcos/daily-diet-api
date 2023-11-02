import { FastifyInstance } from 'fastify'
import { registerMeal } from './register-meal'
import { fetchUserMeals } from './fetch-user-meals'
import { findMealById } from './find-meal-by-id'
import { deleteMeal } from './delete-meal'
import { editMeal } from './edit-meal'
import { checkSessionIdExists } from '../../middlewares/check-session-id-exists'
import { metrics } from './metrics'

export async function MealsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', checkSessionIdExists)

  // create meal
  app.post('', registerMeal)

  // get all user meals
  app.get('', fetchUserMeals)

  // get meal by id
  app.get('/:mealId', findMealById)

  // edit meal
  app.put('/:mealId', editMeal)

  // delete meal
  app.delete('/:mealId', deleteMeal)

  // user metrics
  app.get('/metrics', metrics)
}
