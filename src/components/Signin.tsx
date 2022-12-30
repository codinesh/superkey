'use client'

import supabase from '../supabase/browser'

const Signin = () => {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
      console.log({ error })
    }
  }

  return (
    <button
      type='button'
      onClick={handleLogin}
      className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
      Sign in
    </button>
  )
}

export default Signin
