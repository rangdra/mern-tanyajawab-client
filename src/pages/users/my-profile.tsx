import {
  FormEvent,
  useState,
  useEffect,
  ChangeEvent,
  FC,
  useCallback,
  useRef,
} from 'react';
import { Tab } from '@headlessui/react';
import Image from 'next/image';
import { GiPartyPopper } from 'react-icons/gi';
import { BiNews } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import Layout from 'components/Layout';
import { useAppDispatch, useAppSelector } from 'store';
import Button from 'components/atom/Button';
import QuestionItem from 'components/QuestionItem';
import Input from 'components/atom/Input';
import { uploadImage } from 'utils/uploadImage';
import { populateMyQuestions } from 'store/actions/questionActions';
import { editUser } from 'store/actions/userAction';
import classNames from 'utils/classNames';
import { useRouter } from 'next/router';

const MyProfile: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, authenticated } = useAppSelector((state) => state.auth);
  const { myQuestions, loading } = useAppSelector((state) => state.questions);

  const [showEdit, setShowEdit] = useState(false);
  const inputImage = useRef<HTMLInputElement | null>(null);
  const [data, setData] = useState({
    fullname: '',
    username: '',
    profesi: '',
    avatar: '',
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

  const getData = useCallback(async () => {
    populateMyQuestions(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleUpload = async (e: any) => {
    const img = await uploadImage(e.target.files[0]);
    editUser({ ...data, avatar: img }, dispatch);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    editUser(data, dispatch);
  };

  if (!authenticated) {
    router.push('/auth/login');
  }

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
        <Tab.Panels className="mt-2 shadow-xl">
          <Tab.Panel className="px-6 py-4 bg-white shadow-xl rounded-xl">
            <div className="flex justify-center">
              <div
                onMouseEnter={() => setShowEdit(true)}
                onMouseLeave={() => setShowEdit(false)}
                className="w-20 h-20 relative border-[6px] cursor-pointer border-gray-700 rounded-full"
                onClick={() => inputImage.current!.click()}
              >
                <Image
                  src={`${
                    user?.avatar !== undefined ? user.avatar : '/photo.png'
                  }`}
                  alt={`${user?.username}`}
                  className="rounded-full"
                  width={80}
                  height={80}
                />
                {showEdit && (
                  <div className="absolute top-0 px-2 py-1 text-sm text-white bg-gray-800 rounded-md -left-16">
                    Change
                  </div>
                )}

                <input
                  type="file"
                  onChange={handleUpload}
                  accept="image/*"
                  className="hidden"
                  ref={inputImage}
                />
              </div>
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

              {/* <Input
                margin="mb-2"
                name="password"
                label="Password"
                type={`${showPassword ? 'text' : 'password'}`}
                value={data?.password}
                onChange={handleChange}
                placeholder="Your password"
              /> */}

              {/* <div className="mb-2">
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
              </div> */}

              <Button type="submit">Update</Button>
            </form>
          </Tab.Panel>
          <Tab.Panel className="px-6 py-4 bg-white shadow-lg rounded-xl">
            <div className="flex flex-col items-center">
              <div className="flex justify-center">
                <div className="w-20 h-20 relative border-[6px] cursor-pointer border-gray-700 rounded-full">
                  <Image
                    src={`${
                      user?.avatar !== undefined ? user.avatar : '/photo.png'
                    }`}
                    alt={`${user?.username}`}
                    className="rounded-full"
                    width={80}
                    height={80}
                  />
                </div>
              </div>
              <div className="my-2 text-center">
                <p className="text-xl font-bold text-gray-700 md:text-2xl">
                  {user?.fullname}
                </p>
                <p className="text-gray-400">@{user?.username}</p>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="mb-2 text-2xl font-bold text-gray-700 md:text-3xl">
                My Questions
              </h2>
              {loading ? (
                <div className="flex justify-center py-6">
                  <AiOutlineLoading3Quarters className="w-8 h-8 font-bold animate-spin" />
                </div>
              ) : myQuestions.length > 0 ? (
                myQuestions.map((question) => (
                  <QuestionItem question={question} key={question._id} />
                ))
              ) : (
                <h3>No Question</h3>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Layout>
  );
};

export default MyProfile;
