import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'
import { knex } from '../../services/database'
import { randomUUID } from 'crypto'

export async function registerMeal(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerMealSchema = z.object({
    name: z.string(),
    description: z.string(),
    mealTime: z.coerce.date(),
    itsInTheDiet: z.boolean(),
  })

  const { name, description, mealTime, itsInTheDiet } =
    registerMealSchema.parse(request.body)

  try {
    let sessionId = request.cookies.sessionId

    console.log(sessionId)

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      meal_time: mealTime,
      its_in_the_diet: itsInTheDiet,
      session_id: sessionId,
    })

    return reply.status(201).send()
  } catch (err) {
    console.log(err)
    return reply.status(400).send(err)
  }
}
