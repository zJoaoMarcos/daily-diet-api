import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '../../services/database'

export async function FetchUserMeals(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchUserMealsParams = z.object({
    userId: z.string(),
  })

  const { userId } = fetchUserMealsParams.parse(request.params)

  try {
    const meals = await knex('meals').where('owner', userId).select('*')

    console.log(meals)

    return reply.status(202).send({ meals })
  } catch (err) {
    console.log(err)
    return reply.status(400).send({ err })
  }
}
