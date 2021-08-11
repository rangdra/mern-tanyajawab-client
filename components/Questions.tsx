import { useState } from 'react';
import { Tab } from '@headlessui/react';
import QuestionItem from './QuestionItem';
import { GiPartyPopper } from 'react-icons/gi';
import { FiTrendingUp } from 'react-icons/fi';
import { BiNews } from 'react-icons/bi';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  let [categories] = useState({
    Recent: [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

  return (
    <div className="w-full mx-auto md:w-1/2">
      <Tab.Group
        onChange={(index) => {
          console.log('Changed selected tab to:', index);
        }}
      >
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 flex items-center justify-center font-medium text-white rounded-lg',

                selected
                  ? 'bg-cyan-400 shadow'
                  : 'text-gray-800 hover:bg-cyan-400 hover:bg-opacity-40 hover:text-white'
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
                  ? 'bg-cyan-400 shadow'
                  : 'text-gray-800 hover:bg-cyan-400 hover:bg-opacity-40 hover:text-white'
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
                  ? 'bg-cyan-400 shadow'
                  : 'text-gray-800 hover:bg-cyan-400 hover:bg-opacity-40 hover:text-white'
              )
            }
          >
            <FiTrendingUp className="mr-2 text-xl text-green-500" /> Trending
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className="p-3 space-y-2 bg-white shadow-lg rounded-xl">
            <QuestionItem />
            <QuestionItem />
          </Tab.Panel>
          <Tab.Panel className="p-3 space-y-2 bg-white shadow-lg rounded-xl">
            <QuestionItem />
            <QuestionItem />
            <QuestionItem />
            <QuestionItem />
          </Tab.Panel>{' '}
          <Tab.Panel className="p-3 space-y-2 bg-white shadow-lg rounded-xl">
            <QuestionItem />
            <QuestionItem />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
