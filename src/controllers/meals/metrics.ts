import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../../services/database'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { sessionId } = request.cookies

    const allMeals = await knex('meals')
      .where('session_id', sessionId)
      .orderBy('meal_time')
      .select('*')
    const inDiet = allMeals.filter((meal) => meal.its_in_the_diet).length
    const outDiet = allMeals.filter((meal) => !meal.its_in_the_diet).length

    let currentBestSequenceDiet = 0
    let bestSequenceDiet = 0

    allMeals.forEach((meal) => {
      if (meal.its_in_the_diet) {
        bestSequenceDiet++
      }

      if (bestSequenceDiet >= currentBestSequenceDiet) {
        currentBestSequenceDiet = bestSequenceDiet
      }

      if (!meal.its_in_the_diet) {
        bestSequenceDiet = 0
      }
    })

    return reply.status(202).send({ inDiet, outDiet, currentBestSequenceDiet })
  } catch (error) {}
}
