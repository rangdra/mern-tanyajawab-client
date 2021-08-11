import Link from 'next/link';
import Image from 'next/image';
import { FaTasks } from 'react-icons/fa';
import { GoChevronDown } from 'react-icons/go';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../features/auth/authSlice';
import axios from '../config/axios';
import { useRouter } from 'next/router';
import useComponentVisible from '../hooks/useComponentVisible';

const Navbar: FC = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
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
      <div className="container flex items-center justify-between mx-4 md:mx-auto">
        <Link href="/">
          <a className="flex items-center space-x-3 text-2xl text-white md:text-3xl">
            <FaTasks />
            <span className="text-lg font-bold uppercase md:text-xl">
              TanyaJawab
            </span>
          </a>
        </Link>
        {!loading && authenticated ? (
          <div className="relative" ref={ref}>
            <div
              className="relative flex items-center space-x-2 text-white cursor-pointer"
              onClick={() => setIsComponentVisible(!isComponentVisible)}
            >
              <Image
                src={`${user?.avatar}`}
                alt={`${user?.username}`}
                height={32}
                width={32}
                className="rounded-full"
              />
              <span className="">{user?.fullname}</span>

              <GoChevronDown
                className={`${
                  isComponentVisible && 'transform rotate-180'
                } text-xl transition-duration`}
              />
            </div>
            {isComponentVisible && (
              <div className="absolute w-32 bg-white shadow-lg right-2 top-10">
                <ul className="text-gray-800 divide-y-2">
                  <li className="p-2 cursor-pointer transition-duration hover:bg-gray-300">
                    <Link href="/users">
                      <a>Profile</a>
                    </Link>
                  </li>
                  <li
                    className="p-2 transition-all cursor-pointer duration hover:bg-gray-300"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="space-x-2">
            <Link href="/auth/login">
              <a className="px-4 py-2 text-white transition-all duration-200 border bg-cyan-700 border-cyan-700 hover:bg-transparent hover:border-cyan-700 hover:text-gray-800">
                Login
              </a>
            </Link>
            <Link href="/auth/register">
              <a className="px-4 py-2 transition-all duration-200 border border-cyan-700 hover:bg-cyan-700 hover:text-white">
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
