import 'server-only'
import createClient from '../../utils/supabase-server'

// do not cache this page
export const revalidate = 0

export default async function ServerComponent() {
  const supabase = createClient()

  const { data, error, status, count } = await supabase
    .from('Projects')
    .select('*, Reviews(score, review_version), Blockchain(name, websiteUrl)')

  console.log(data, error, count, status)

  return (
    <div className='overflow-x-auto relative  shadow-md sm:rounded-lg w-full'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='py-3 px-6'>
              Name
            </th>
            <th scope='col' className='py-3 px-6'>
              Score
            </th>
            <th scope='col' className='py-3 px-6'>
              Website
            </th>
            <th scope='col' className='py-3 px-6'>
              Review version
            </th>
            <th scope='col' className='py-3 px-6'>
              Blockchain
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((x) => (
            <tr key={x.id} className='border-b'>
              <th
                scope='row'
                className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                {x.name}
              </th>
              <td className='py-4 px-6'>{x?.Reviews[0]?.score}</td>
              <td className='py-4 px-6'>
                <a
                  href={x.websiteUrl}
                  className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                  {x.websiteUrl}
                </a>
              </td>
              <td className='py-4 px-6'>{x?.Reviews[0]?.review_version}</td>
              <td className='py-4 px-6'>{x?.Blockchain[0].name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
