import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '../../services/database'

export async function findMealById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findMealByIdParam = z.object({
    mealId: z.string(),
  })

  const { mealId } = findMealByIdParam.parse(request.params)

  try {
    const meal = await knex('meals').where('id', mealId).first().select('*')

    if (meal) {
      const mappedMeal = {
        ...meal,
        its_in_the_diet: !!meal.its_in_the_diet,
      }

      return reply.status(200).send(mappedMeal)
    }

    return reply.status(404).send({ message: 'meal not found.' })
  } catch (error) {
    console.log(error)
  }
}
