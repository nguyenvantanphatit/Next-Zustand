import Columns from '@/components/columns'
import User from '@/components/user'

export default function Home() {
  return (
    <section className='flex h-screen bg-gradient-to-br from-gray-700 to-gray-900 py-12 text-white'>
      <div className='mx-auto w-full max-w-7xl px-6'>
        {/* <User />  */}
        <Columns />
      </div>
    </section>
  )
}
