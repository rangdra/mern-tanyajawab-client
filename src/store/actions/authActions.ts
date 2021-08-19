import axios from 'config/axios';
import { IResponse, IUser } from 'interface';
import { NextRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AppDispatch } from 'store';
import { login, logout, register } from '../features/auth/authSlice';

export const loginAction = async (
  user: IUser,
  dispatch: AppDispatch,
  router: NextRouter
) => {
  try {
    const res: IResponse = await axios.post('/auth/login', user);
    dispatch(login(res.user));
    router.push('/');
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const registerAction = async (
  user: IUser,
  dispatch: AppDispatch,
  router: NextRouter
) => {
  try {
    const res: IResponse = await axios.post('/auth/register', user);
    dispatch(register(res.user));
    router.push('/');
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const logoutAction = async (
  dispatch: AppDispatch,
  router: NextRouter
) => {
  try {
    await axios.post('/auth/logout');
    dispatch(logout());
    router.push('/');
  } catch (error) {
    console.log(error.response.data.message);
  }
};
