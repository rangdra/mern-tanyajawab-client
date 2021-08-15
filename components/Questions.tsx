import { Tab } from '@headlessui/react';
import QuestionItem from './QuestionItem';
import { GiPartyPopper } from 'react-icons/gi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FiTrendingUp } from 'react-icons/fi';
import { BiNews } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../store';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { setCurrentSlug } from '../features/questions/questionSlice';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Questions() {
  const { data, loading } = useAppSelector((state) => state.questions);
  const { authenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const router = useRouter();

  console.log(data);
  return (
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
          <BiNews className="mr-2 text-2xl text-blue-500" /> Recent
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
          <GiPartyPopper className="mr-2 text-2xl text-yellow-500" /> Populer
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              'w-full py-2.5 leading-5 font-medium text-white rounded-lg flex items-center justify-center',
              selected
                ? 'bg-fuchsia-500 shadow'
                : 'text-gray-600 hover:bg-fuchsia-500 hover:bg-opacity-70 hover:text-white'
            )
          }
        >
          <FiTrendingUp className="mr-2 text-xl text-green-500" /> Trending
        </Tab>
      </Tab.List>
      <Tab.Panels className="mt-2">
        <Tab.Panel className="p-3 space-y-2 bg-white shadow-xl rounded-xl">
          {authenticated && (
            <button
              className="flex items-center px-3 py-2 space-x-2 font-semibold text-gray-600 bg-gray-200 rounded-full group transition-duration hover:bg-fuchsia-500"
              onClick={() => {
                dispatch(setCurrentSlug(''));
                router.push('/questions/add');
              }}
            >
              <span className="group-hover:text-white transition-duration">
                Create Question
              </span>
              <div className="flex items-center justify-center w-8 h-8 rounded-full group-hover:bg-white bg-fuchsia-500 transition-duration">
                <FaPlus className="text-white group-hover:text-fuchsia-500 transition-duration" />
              </div>
            </button>
          )}
          {loading ? (
            <div className="flex justify-center py-6">
              <AiOutlineLoading3Quarters className="w-8 h-8 font-bold animate-spin" />
            </div>
          ) : data.length > 0 ? (
            data.map((question) => (
              <QuestionItem question={question} key={question._id} />
            ))
          ) : (
            <h3>No Question</h3>
          )}
        </Tab.Panel>
        <Tab.Panel className="p-3 space-y-2 bg-white shadow-lg rounded-xl">
          {data.length > 0 ? (
            data.map((question) => (
              <QuestionItem question={question} key={question._id} />
            ))
          ) : (
            <h3>No Question</h3>
          )}
        </Tab.Panel>{' '}
        <Tab.Panel className="p-3 space-y-2 bg-white shadow-lg rounded-xl">
          {data.length > 0 ? (
            data.map((question) => (
              <QuestionItem question={question} key={question._id} />
            ))
          ) : (
            <h3>No Question</h3>
          )}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
