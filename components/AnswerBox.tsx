import { FaTrash } from 'react-icons/fa';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { useAppSelector } from '../store';

dayjs.extend(relativeTime);

const AnswerBox = ({ answer }: { answer: any }) => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="my-4">
      <div className="flex bg-white rounded-md shadow-lg">
        <div className="w-2/12 p-4 bg-gray-200">
          <div className="flex flex-col items-center justify-center space-y-2 text-2xl">
            <BsChevronUp className="cursor-pointer" />
            <span className="">0</span>
            <BsChevronDown className="cursor-pointer" />
          </div>
        </div>
        <div className="relative w-10/12 p-4">
          <h2 className="font-semibold text-gray-800">Rangdra</h2>
          <p className="text-[12px] font-light text-gray-400">
            answer by{' '}
            <Link
              href={`${
                answer.userId._id === user?._id
                  ? '/users/my-profile'
                  : `/users/${answer.userId.username}`
              }`}
            >
              <a className="underline hover:opacity-50">
                @{answer.userId.username}
              </a>
            </Link>{' '}
            • {dayjs(answer.createdAt).fromNow()}
          </p>
          <p className="my-2 text-sm">{answer.body}</p>
          <div className="absolute top-2 right-2">
            <FaTrash className="text-red-500 cursor-pointer hover:opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerBox;
