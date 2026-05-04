import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function seed() {
  
  const { data, error } = await supabase.from('properties').insert([
    {
      address: '123 Brunswick Street',
      city: 'Melbourne',
      state: 'VIC',
      zip_code: '3056',
      property_type: 'Apartment',
      rent_amount: 450.00,
      security_deposit: 1800.00,
      status: 'available'
    }
  ]).select()

  if (error) {
    console.error('Error seeding property:', error)
  } else {
    console.log('Seeded property:', data)
  }
}

seed()
