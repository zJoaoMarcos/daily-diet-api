import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../../services/database'

export async function fetchUserMeals(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { sessionId } = request.cookies

  try {
    const response = await knex('meals')
      .where('session_id', sessionId)
      .select('*')

    if (response) {
      const meals = response.map((meal) => {
        return {
          id: meal.id,
          name: meal.name,
          description: meal.description,
          mealTime: meal.meal_time,
          itsInTheDiet: !!meal.its_in_the_diet,
          createdAt: meal.created_at,
          sessionId: meal.session_id,
        }
      })

      return reply.status(202).send({ meals })
    }

    return reply.status(404).send({ message: 'meals not found.' })
  } catch (err) {
    console.log(err)
    return reply.status(400).send({ err })
  }
}
