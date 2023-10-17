import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'
import { knex } from '../../services/database'
import { randomUUID } from 'crypto'

export async function registerMeal(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerMealParams = z.object({
    userId: z.string(),
  })

  const registerMealSchema = z.object({
    name: z.string(),
    description: z.string(),
    mealTime: z.coerce.date(),
    itsInTheDiet: z.boolean(),
  })

  const { userId } = registerMealParams.parse(request.params)
  const { name, description, mealTime, itsInTheDiet } =
    registerMealSchema.parse(request.body)

  try {
    const user = await knex('users').where('id', userId).first().select('*')

    if (!user) {
      return reply.status(404).send({ message: 'user not found.' })
    }

    await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      meal_time: mealTime,
      its_in_the_diet: itsInTheDiet,
      owner: userId,
    })

    return reply.status(201).send()
  } catch (err) {
    console.log(err)
    return reply.status(400).send(err)
  }
}
