import 'server-only'
import createClient from '../../src/supabase/server'

// do not cache this page
export const revalidate = 0

export default async function ServerComponent() {
  const supabase = createClient()

  const { data, error, status, count } = await supabase
    .from('Projects')
    .select('*, Reviews(score, review_version), Blockchain(name, websiteUrl)')

  console.log(data, error, count, status)

  return (
    <div className='relative w-full overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Score
            </th>
            <th scope='col' className='px-6 py-3'>
              Website
            </th>
            <th scope='col' className='px-6 py-3'>
              Review version
            </th>
            <th scope='col' className='px-6 py-3'>
              Blockchain
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((x) => (
            <tr key={x.id} className='border-b'>
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                {x.name}
              </th>
              <td className='px-6 py-4'>{x?.Reviews[0]?.score}</td>
              <td className='px-6 py-4'>
                <a
                  href={x.websiteUrl}
                  className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                  {x.websiteUrl}
                </a>
              </td>
              <td className='px-6 py-4'>{x?.Reviews[0]?.review_version}</td>
              <td className='px-6 py-4'>{x?.Blockchain[0].name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
