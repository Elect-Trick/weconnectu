
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'


export const formValidationSchema = toTypedSchema(
  z.object({
    name: z.string().min(4, 'Name should be at least 4 characters').max(30, 'Name must be at most 12 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    contact_number: z.string().transform((value) =>  value.replace(/[\s\-().]/g, '')).refine((value) =>  /^(?:\+27|0)[0-9]{9}$/.test(value), 'Enter a valid SA phone number'),
    message: z.string().min(10, 'Message must be at least 10 characters').max(200, 'Message must be at most 200 characters'),
  })
)

