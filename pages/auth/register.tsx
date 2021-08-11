import { useRouter } from 'next/router';
import axios from '../../config/axios';
import Head from 'next/head';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import { IResponse } from '../../interface';
import { useAppDispatch } from '../../store';
import { register } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState({
    fullname: '',
    username: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    e.preventDefault();
    try {
      const res: IResponse = await axios.post('/auth/register', newUser);
      dispatch(register(res.user));
      router.push('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Head>
        <title>Register</title>
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
            Register
          </h1>
          <form className="mt-3" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullname" className="block text-lg">
                Fullname
              </label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                value={newUser.fullname}
                onChange={handleChange}
                required
                placeholder="Your fullname"
                className="border border-gray-300 h-[40px] pl-2 outline-none w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-lg">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={newUser.username}
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
                value={newUser.password}
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
                  className="w-5 h-5 text-gray-600 form-checkbox"
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
              <Link href="/auth/login">
                <a className="text-blue-500 underline">Login</a>
              </Link>
            </span>
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white transition-duration bg-cyan-400 hover:bg-cyan-500"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
