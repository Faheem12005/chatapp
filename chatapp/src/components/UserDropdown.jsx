import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserDropdown() {
    const navigate = useNavigate();
    const handleSignOut = async () => {
        navigate('/login');
        try{
          const response = await axios.post('/api/logout');
          if (!response.status){
            console.log('Server responded with a bad response');
          }
        } catch(error){
          console.log('Error occured',error);
        }
    }

  return (
    <Menu as="div" className="relative max-w-24 inline-block text-left">
      <div>
        <MenuButton className="shadow-sm flex justify-center items-center pt-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </MenuButton>
      </div>

      <MenuItems
      anchor="bottom start"
        transition
        className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            {({ focus }) => (
              <a
                href="#"
                className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm max-w-32')}
              >
                Change Avatar
              </a>
            )}
          </MenuItem>
        <MenuItem>
            {({ focus }) => (
            <button
                onClick={handleSignOut}
                type="button"
                className={classNames(
                focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block w-full px-4 py-2 text-left text-sm max-w-32',
                )}
            >
                Sign out
            </button>
            )}
            </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}
