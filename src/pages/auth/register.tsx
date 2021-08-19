import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

import { useAppDispatch } from 'store';
import { useFormFiedls } from 'hooks/useForm';
import Button from 'components/atom/Button';
import Input from 'components/atom/Input';
import { registerAction } from 'store/actions/authActions';
import { GetServerSideProps } from 'next';

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useFormFiedls({
    fullname: '',
    username: '',
    password: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    registerAction(newUser, dispatch, router);
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
          fill="#D946EF"
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
            <Input
              margin="mb-4"
              name="fullname"
              value={newUser.fullname}
              label="Fullname"
              type="text"
              onChange={setNewUser}
              placeholder="Your fullname"
            />
            <Input
              margin="mb-4"
              name="username"
              value={newUser.username}
              label="Username"
              type="text"
              onChange={setNewUser}
              placeholder="Your Username"
            />
            <Input
              margin="mb-2"
              name="password"
              value={newUser.password}
              label="Password"
              type={`${showPassword ? 'text' : 'password'}`}
              onChange={setNewUser}
              placeholder="Your password"
            />
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
            <Button type="submit">Register</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = req.cookies.token;

  if (token) {
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
  }
  return {
    props: {},
  };
};
