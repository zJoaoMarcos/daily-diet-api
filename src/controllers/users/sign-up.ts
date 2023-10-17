import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../../services/database'
import { z } from 'zod'
import { randomUUID } from 'crypto'

export async function signUp(request: FastifyRequest, reply: FastifyReply) {
  const signUpSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    yearsOld: z.coerce.number(),
  })

  const { firstName, lastName, email, yearsOld } = signUpSchema.parse(
    request.body,
  )

  try {
    const emailExists = await knex('users')
      .where('email', email)
      .first()
      .select('*')

    if (!emailExists) {
      const user = await knex('users')
        .insert({
          id: randomUUID(),
          email,
          first_name: firstName,
          last_name: lastName,
          years_old: yearsOld,
        })
        .returning('*')

      console.log(user)

      return reply.status(201).send()
    }

    return reply.status(404).send({ message: 'email already exists.' })
  } catch (err) {
    console.log(err)
    return reply.status(400).send(err)
  }
}
