import 'server-only'
import Footer from '../components/Footer'
import SupabaseListener from '../components/SupabaseListener'
import '../globals.css'
import createClient from '../utils/supabase-server'
import Header from './Header'

export const revalidate = 0

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html
      lang='en'
      className='h-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'>
      <head />
      <body className='h-full w-full flex flex-col justify-between'>
        <SupabaseListener accessToken={session?.access_token} />
        <Header />
        <main className='px-4 lg:px-6 py-8  flex-grow'>
          <div className='flex flex-wrap justify-between items-center max-w-screen-xl'>
            {children}
          </div>
        </main>
        <Footer />
        <script
          src='https://unpkg.com/flowbite@1.5.5/dist/flowbite.js'
          async></script>
      </body>
    </html>
  )
}
