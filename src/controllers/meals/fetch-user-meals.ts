import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../../services/database'

export async function fetchUserMeals(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { sessionId } = request.cookies

  try {
    const meals = await knex('meals').where('session_id', sessionId).select('*')

    if (meals) {
      const mealsMapped = meals.map((meal) => {
        return {
          ...meal,
          its_in_the_diet: !!meal.its_in_the_diet,
        }
      })

      return reply.status(202).send({ mealsMapped })
    }

    return reply.status(404).send({ message: 'meals not found.' })
  } catch (err) {
    console.log(err)
    return reply.status(400).send({ err })
  }
}
