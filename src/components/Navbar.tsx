import { FC, Fragment, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import { ImStack } from 'react-icons/im';
import { GoChevronDown } from 'react-icons/go';
import { RiProfileFill, RiLogoutBoxRLine } from 'react-icons/ri';
import { BsBookmarkFill } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from 'store';
import { logoutAction } from 'store/actions/authActions';

const Navbar: FC = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const router = useRouter();
  const { authenticated, user, loading } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  return (
    <header className="flex items-center h-[80px] bg-gradient-to-br from-fuchsia-500 to-purple-600 sticky top-0 z-20">
      <div className="container flex items-center justify-between mx-6 md:mx-auto">
        <Link href="/">
          <a className="flex items-center space-x-2 text-2xl text-white md:text-3xl">
            <ImStack />
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
              <Menu.Items className="absolute right-0 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded shadow-lg w-44 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-fuchsia-500 text-white' : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() => router.push('/users/my-profile')}
                      >
                        <RiProfileFill
                          className="w-5 h-5 mr-2 text-blue-500"
                          aria-hidden="true"
                        />
                        Profil saya
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-fuchsia-500 text-white' : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() => router.push('/users/save-questions')}
                      >
                        <BsBookmarkFill
                          className="w-5 h-5 mr-2 text-gray-600"
                          aria-hidden="true"
                        />
                        Disimpan ({user?.saveQuestions.length})
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-fuchsia-500 text-white' : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() => logoutAction(dispatch, router)}
                      >
                        <RiLogoutBoxRLine
                          className="w-5 h-5 mr-2 text-red-500"
                          aria-hidden="true"
                        />
                        Keluar
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
