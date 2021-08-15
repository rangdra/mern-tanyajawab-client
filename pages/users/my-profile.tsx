import Layout from '../../components/Layout';
import { Tab } from '@headlessui/react';
import Image from 'next/image';
import { GiPartyPopper } from 'react-icons/gi';
import { BiNews } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../../store';
import Button from '../../components/atom/Button';
import { FormEvent, useState, useEffect, ChangeEvent } from 'react';
import axios from '../../config/axios';
import { FC } from 'react';
import { IQuestion } from '../../interface';
import QuestionItem from '../../components/QuestionItem';
import { getMyQuestions } from '../../features/questions/questionSlice';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Input from '../../components/atom/Input';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const MyProfile: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { myData, loading } = useAppSelector((state) => state.questions);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const [data, setData] = useState({
    fullname: '',
    username: '',
    profesi: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setData({
        ...data,
        fullname: user.fullname,
        username: user.username,
        profesi: user.profesi,
      });
    }
  }, [user]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res: IQuestion[] = await axios.get('/questions/my-questions');
        dispatch(getMyQuestions(res));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getData();
  }, [dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Layout title="My Profile">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-gray-200 rounded-xl">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 flex items-center justify-center font-medium text-white rounded-lg',

                selected
                  ? 'bg-fuchsia-500 shadow'
                  : 'text-gray-600 hover:bg-fuchsia-500 hover:bg-opacity-70 hover:text-white'
              )
            }
          >
            <BiNews className="mr-2 text-2xl text-blue-500" /> Profile
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 flex items-center justify-center font-medium text-white rounded-lg',

                selected
                  ? 'bg-fuchsia-500 shadow'
                  : 'text-gray-600 hover:bg-fuchsia-500 hover:bg-opacity-70 hover:text-white'
              )
            }
          >
            <GiPartyPopper className="mr-2 text-2xl text-yellow-500" /> My
            Question
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className="px-6 py-4 bg-white shadow-xl rounded-xl">
            <div className="relative w-20 h-20 border-[6px] border-gray-700 rounded-full ">
              <Image
                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                alt={`${user?.username}`}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>

            <form className="w-3/4 mt-3" onSubmit={handleSubmit}>
              <Input
                margin="mb-4"
                name="fullname"
                value={data?.fullname}
                onChange={handleChange}
                label="Fullname"
                type="text"
                placeholder="Your fullname"
              />
              <Input
                margin="mb-4"
                name="username"
                value={data?.username}
                onChange={handleChange}
                label="Username"
                type="text"
                placeholder="Your Username"
              />
              <Input
                margin="mb-4"
                name="profesi"
                value={data?.profesi}
                onChange={handleChange}
                label="Profesi"
                type="text"
                placeholder="Your profesi"
              />

              <Input
                margin="mb-2"
                name="password"
                label="Password"
                type={`${showPassword ? 'text' : 'password'}`}
                value={data?.profesi}
                onChange={handleChange}
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

              <Button type="submit" disabled={true}>
                Update
              </Button>
            </form>
          </Tab.Panel>
          <Tab.Panel className="px-6 py-4 bg-white shadow-lg rounded-xl">
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20 border-[6px] border-gray-700 rounded-full ">
                <Image
                  src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                  alt={`${user?.username}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div className="my-2 text-center">
                <p className="text-2xl font-bold text-gray-700">
                  {user?.fullname}
                </p>
                <p className="text-gray-400">@{user?.username}</p>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="mb-2 text-3xl font-extrabold text-gray-700">
                My Questions
              </h2>
              {loading ? (
                <div className="flex justify-center py-6">
                  <AiOutlineLoading3Quarters className="w-8 h-8 font-bold animate-spin" />
                </div>
              ) : myData.length > 0 ? (
                myData.map((question) => (
                  <QuestionItem question={question} key={question._id} />
                ))
              ) : (
                <h3>Not Question</h3>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Layout>
  );
};

export default MyProfile;
