// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      first_name: string
      last_name: string
      email: string
      years_old: number
    }
    meals: {
      id: string
      name: string
      description: string
      created_at: string
      meal_time: Date
      its_in_the_diet: boolean
      owner: string
      created_at: Date
    }
  }
}
