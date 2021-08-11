import axios from '../../config/axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../store';
import { login } from '../../features/auth/authSlice';
import { IResponse } from '../../interface';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res: IResponse = await axios.post('/auth/login', user);
      dispatch(login(res.user));
      router.push('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute top-0 h-1/2"
      >
        <path
          fill="#22D3EE"
          fillOpacity="1"
          d="M0,288L1440,224L1440,0L0,0Z"
        ></path>
      </svg>
      <div className="flex items-center justify-center h-screen">
        <div className="z-10 w-3/4 px-6 py-4 bg-white shadow-lg md:w-1/3">
          <h1 className="text-2xl font-extrabold text-center uppercase">
            Login
          </h1>
          <form className="mt-3" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-lg">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={user.username}
                onChange={handleChange}
                required
                placeholder="Your username"
                className="border border-gray-300 h-[40px] pl-2 outline-none w-full"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="block text-lg">
                Password
              </label>
              <input
                type={`${showPassword ? 'text' : 'password'}`}
                name="password"
                id="password"
                value={user.password}
                onChange={handleChange}
                required
                placeholder="Your password"
                className="border border-gray-300 h-[40px] pl-2 outline-none w-full"
              />
            </div>
            <div className="mb-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-cyan-400 checked:text-cyan-400 "
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-700">
                  Show password
                </span>
              </label>
            </div>
            <span className="text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register">
                <a className="text-blue-500 underline">Register</a>
              </Link>
            </span>
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white transition-duration bg-cyan-400 hover:bg-cyan-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
