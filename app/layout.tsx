import 'server-only'
import '../globals.css'
import Footer from '../src/components/Footer'
import SupabaseListener from '../src/supabase/listener'
import createClient from '../src/supabase/server'
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
      className='h-full text-gray-800 bg-gray-100 dark:bg-gray-800 dark:text-gray-100'>
      <head />
      <body className='flex flex-col justify-between w-full h-full'>
        <SupabaseListener accessToken={session?.access_token} />
        <Header />
        <main className='flex-grow px-4 py-8 lg:px-6 '>
          <div className='flex flex-wrap items-center justify-between max-w-screen-xl'>
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
