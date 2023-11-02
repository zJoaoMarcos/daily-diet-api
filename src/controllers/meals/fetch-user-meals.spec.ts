import { execSync } from 'node:child_process'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('Get All User Meals', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to get all user meals', async () => {
    const registerMealResponse = await request(app.server).post('/meals').send({
      name: 'New meal',
      description: 'description of the new meal',
      mealTime: new Date(),
      itsInTheDiet: true,
    })

    const cookies = registerMealResponse.get('Set-Cookie')

    const listUserMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(202)

    expect(listUserMealsResponse.body.meals).toEqual([
      expect.objectContaining({
        name: 'New meal',
        description: 'description of the new meal',
        itsInTheDiet: true,
      }),
    ])
  })
})
