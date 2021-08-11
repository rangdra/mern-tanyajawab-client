import { FC, Fragment, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import { FaTasks } from 'react-icons/fa';
import { GoChevronDown } from 'react-icons/go';
import { RiProfileFill, RiLogoutBoxRLine } from 'react-icons/ri';
import axios from '../config/axios';

import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../features/auth/authSlice';

const Navbar: FC = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const router = useRouter();
  const { authenticated, user, loading } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      dispatch(logout());
      router.push('/');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <header className="flex items-center h-[70px] bg-cyan-400">
      <div className="container flex items-center justify-between mx-6 md:mx-auto">
        <Link href="/">
          <a className="flex items-center space-x-3 text-2xl text-white md:text-3xl">
            <FaTasks />
            <span className="text-lg font-bold uppercase md:text-xl">
              TanyaJawab
            </span>
          </a>
        </Link>
        {!loading && authenticated ? (
          <Menu
            as="div"
            className="relative"
            onClick={() => setIsDropdown(!isDropdown)}
          >
            <Menu.Button className="flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white bg-black rounded-md md:text-base bg-opacity-20">
              <Image
                src={`${user?.avatar}`}
                alt={`${user?.username}`}
                height={32}
                width={32}
                className="rounded-full"
              />
              <span>{user?.fullname}</span>

              <GoChevronDown className="text-xl" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-40 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-cyan-400 text-white' : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() => router.push('/profile')}
                      >
                        <RiProfileFill
                          className="w-5 h-5 mr-2 text-blue-500"
                          aria-hidden="true"
                        />
                        My Profile
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-cyan-400 text-white' : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={handleLogout}
                      >
                        <RiLogoutBoxRLine
                          className="w-5 h-5 mr-2 text-red-500"
                          aria-hidden="true"
                        />
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <div className="space-x-3">
            <Link href="/auth/login">
              <a className="px-4 py-2 text-white bg-black rounded-md hover:bg-opacity-30 transition-duration bg-opacity-20">
                Login
              </a>
            </Link>
            <Link href="/auth/register">
              <a className="text-white hover:text-gray-200 transition-duration">
                Register
              </a>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
