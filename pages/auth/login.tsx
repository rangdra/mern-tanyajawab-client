import { FormEvent, useState } from 'react';
import axios from '../../config/axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../store';
import { login } from '../../features/auth/authSlice';
import { IResponse } from '../../interface';
import { useFormFiedls } from '../../hooks/useForm';
import Button from '../../components/atom/Button';
import Input from '../../components/atom/Input';
import { GetServerSideProps } from 'next';

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useFormFiedls({
    username: '',
    password: '',
  });

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
          fill="#D946EF"
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
            <Input
              margin="mb-4"
              name="username"
              value={user.username}
              label="Username"
              type="text"
              onChange={setUser}
              placeholder="Your Username"
            />
            <Input
              margin="mb-2"
              name="password"
              value={user.password}
              label="Password"
              type={`${showPassword ? 'text' : 'password'}`}
              onChange={setUser}
              placeholder="Your password"
            />
            <div className="mb-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5"
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
            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
