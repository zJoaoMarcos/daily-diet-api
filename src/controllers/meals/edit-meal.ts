import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '../../services/database'

export async function editMeal(request: FastifyRequest, reply: FastifyReply) {
  const editMealParam = z.object({
    mealId: z.string(),
  })

  const { mealId } = editMealParam.parse(request.params)

  const editMealSchema = z.object({
    name: z.string(),
    description: z.string(),
    mealTime: z.coerce.date(),
    itsInTheDiet: z.boolean(),
  })

  const { name, description, itsInTheDiet, mealTime } = editMealSchema.parse(
    request.body,
  )

  try {
    const meal = await knex('meals').where('id', mealId).first().select('*')

    if (meal) {
      await knex('meals').where('id', mealId).update({
        name,
        description,
        meal_time: mealTime,
        its_in_the_diet: itsInTheDiet,
      })

      return reply.status(202).send()
    }

    return reply.status(404).send({ message: 'meal not found' })
  } catch (err) {
    console.log(err)
  }
}
