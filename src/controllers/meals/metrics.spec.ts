import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { execSync } from 'node:child_process'

import { app } from '../../app'

describe('Metrics of User Meals', () => {
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

  it('should be able to get metrics of user meals', async () => {
    const registerMealResponse = await request(app.server).post('/meals').send({
      name: 'First meal',
      description: 'First description of the new meal',
      mealTime: new Date(),
      itsInTheDiet: true,
    })
    const cookies = registerMealResponse.get('Set-Cookie')

    await Promise.all([
      request(app.server).post('/meals').set('Cookie', cookies).send({
        name: 'Second meal',
        description: 'Second description of the new meal',
        mealTime: new Date(),
        itsInTheDiet: false,
      }),
      request(app.server).post('/meals').set('Cookie', cookies).send({
        name: 'Third meal',
        description: 'Third description of the new meal',
        mealTime: new Date(),
        itsInTheDiet: true,
      }),
      request(app.server).post('/meals').set('Cookie', cookies).send({
        name: 'Third meal',
        description: 'Third description of the new meal',
        mealTime: new Date(),
        itsInTheDiet: true,
      }),
    ])

    const metricsResponse = await request(app.server)
      .get('/meals/metrics')
      .set('Cookie', cookies)
      .expect(202)

    expect(metricsResponse.body).toEqual(
      expect.objectContaining({
        inDiet: 3,
        outDiet: 1,
        currentBestSequenceDiet: 2,
      }),
    )
  })
})
