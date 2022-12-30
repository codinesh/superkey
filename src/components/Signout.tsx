'use client'

import supabase from '../supabase/browser'

const Signout = () => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log({ error })
    }
  }

  return (
    <button
      type='button'
      onClick={handleLogout}
      className='w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'>
      Sign out
    </button>
  )
}

export default Signout
