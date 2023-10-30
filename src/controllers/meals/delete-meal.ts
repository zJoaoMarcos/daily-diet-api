import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '../../services/database'

export async function deleteMeal(request: FastifyRequest, reply: FastifyReply) {
  const deleteMealParam = z.object({
    mealId: z.string(),
  })

  const { mealId } = deleteMealParam.parse(request.params)

  try {
    const meal = await knex('meals').where('id', mealId).select('*').first()

    if (meal) {
      await knex('meals').where('id', mealId).delete()

      return reply.status(201).send()
    }

    return reply.status(404).send({ message: 'meal not found' })
  } catch (err) {
    console.log(err)
    return reply.status(400).send({ err })
  }
}
