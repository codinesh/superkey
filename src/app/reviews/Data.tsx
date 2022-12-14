import 'server-only'
import createClient from '../../utils/supabase-server'

// do not cache this page
export const revalidate = 0

export default async function ServerComponent() {
  const supabase = createClient()
  const { data } = await supabase.from('Projects').select('*')

  return <pre>{JSON.stringify({ data }, null, 2)}</pre>
}