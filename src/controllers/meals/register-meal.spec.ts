import { afterAll, beforeAll, it, describe, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../../app'
import { execSync } from 'child_process'

describe('', () => {
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

  it('should be able to register new meal', async () => {
    await request(app.server)
      .post('/meals')
      .send({
        name: 'New meal',
        description: 'description of the new meal',
        mealTime: new Date(),
        itsInTheDiet: true,
      })
      .expect(201)
  })

  it('should be able to register a meal with a cookie existing', async () => {
    const registerMealResponse = await request(app.server).post('/meals').send({
      name: 'New meal',
      description: 'description of the new meal',
      mealTime: new Date(),
      itsInTheDiet: true,
    })

    const cookies = registerMealResponse.get('Set-Cookie')

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'New meal',
        description: 'description of the new meal',
        mealTime: new Date(),
        itsInTheDiet: true,
      })
      .expect(201)
  })
})
