import axios from 'config/axios';
import { IResponse } from 'interface';
import { toast } from 'react-toastify';
import { AppDispatch } from 'store';
import { login } from 'store/features/auth/authSlice';

export const checkUser = async (dispatch: AppDispatch) => {
  try {
    const res: IResponse = await axios.get('/auth/me');
    dispatch(login(res.user));
  } catch (error) {
    console.log(error.response.data);
  }
};

export const editUser = async (data: any, dispatch: AppDispatch) => {
  try {
    const res: { message: string } = await axios.put('/users', data);
    checkUser(dispatch);
    toast.success(res.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const saveQuestion = async (id: string, dispatch: AppDispatch) => {
  try {
    await axios.put('/users/save', { id });
    checkUser(dispatch);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
