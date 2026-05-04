import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function seed() {
  // 1. Seed Property
  const { data: propData, error: propError } = await supabase.from('properties').insert([
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

  if (propError) {
    console.error('Error seeding property:', propError)
    return
  }

  const propertyId = propData[0].id
  console.log('Seeded property:', propertyId)

  // 2. Seed Room
  const { data: roomData, error: roomError } = await supabase.from('rooms').insert([
    {
      property_id: propertyId,
      name: 'Master Suite',
      rent_amount: 480.00,
      security_deposit: 1920.00,
      status: 'available'
    }
  ]).select()

  if (roomError) {
    console.error('Error seeding room:', roomError)
    return
  }

  console.log('Seeded room:', roomData[0].id)
  console.log(`URL will be: /property/${propertyId}/room/${roomData[0].id}/apply`)
}

seed()
