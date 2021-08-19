import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { Tab } from '@headlessui/react';
import Image from 'next/image';
import axios from 'config/axios';
import { RiProfileFill } from 'react-icons/ri';

import Layout from 'components/Layout';
import QuestionItem from 'components/QuestionItem';
import { IQuestion, IUser } from 'interface';
import classNames from 'utils/classNames';

interface IResponse {
  user: IUser;
  questions: IQuestion[];
}
const UserProfile: FC<{ data: IResponse }> = ({ data }) => {
  return (
    <Layout title={`${data.user.fullname} profile`}>
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-gray-200 md:w-1/2 rounded-xl">
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
            <RiProfileFill
              className="w-5 h-5 mr-2 text-blue-500"
              aria-hidden="true"
            />
            {data.user.fullname} profil
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2 shadow-xl">
          <Tab.Panel className="px-6 py-4 bg-white shadow-lg rounded-xl">
            <div className="flex flex-col items-center">
              <div className="flex justify-center">
                <div className="w-20 h-20 relative border-[6px] cursor-pointer border-gray-700 rounded-full">
                  <Image
                    src={data.user.avatar}
                    alt={data.user.username}
                    className="rounded-full"
                    width={80}
                    height={80}
                  />
                </div>
              </div>
              <div className="my-2 text-center">
                <p className="text-xl font-bold text-gray-700 md:text-2xl">
                  {data.user?.fullname}
                </p>
                <p className="text-gray-400">@{data.user.username}</p>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="mb-2 text-2xl font-bold text-gray-700 md:text-3xl">
                Pertanyaan saya
              </h2>
              {data.questions.length > 0 ? (
                data.questions.map((question) => (
                  <QuestionItem question={question} key={question._id} />
                ))
              ) : (
                <h3>Tidak ada pertanyaan</h3>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Layout>
  );
};

export default UserProfile;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await axios.get(`/users/${params!.username}`);
  return {
    props: {
      data,
    },
  };
};
