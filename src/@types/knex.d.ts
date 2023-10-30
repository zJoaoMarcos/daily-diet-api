// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    meals: {
      id: string
      name: string
      description: string
      created_at: string
      meal_time: Date
      its_in_the_diet: 0 | 1 | boolean
      session_id: string
      created_at: Date
    }
  }
}
