import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { BsBookmarkPlus, BsBookmarkFill } from 'react-icons/bs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';

import { IQuestion } from '../interface';
import { useAppDispatch, useAppSelector } from 'store';
import {
  handleDeleteQuestion,
  handleEditQuestion,
} from 'store/actions/questionActions';
import { saveQuestion } from 'store/actions/userAction';

dayjs.extend(relativeTime);

interface IProps {
  question: IQuestion;
}

const QuestionItem: FC<IProps> = ({ question }) => {
  const router = useRouter();
  const { user, authenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <div className="relative px-3 py-4 border border-gray-200 rounded-md shadow-lg">
      <div className="flex space-x-4 bg-white cursor-pointer">
        <div className="space-y-2 text-sm text-center md:text-base">
          <div>
            <p>{question.voteScore}</p>
            <p>votes</p>
          </div>
          <div>
            <p>{question.answers.length}</p>
            <p>answers</p>
          </div>
        </div>
        <div>
          <Link href={`/questions/${question.slug}`}>
            <a className="mb-1 text-lg text-blue-500 transition-duration md:text-xl hover:underline limit-text-2">
              {question.title}
            </a>
          </Link>

          <p className="mb-2 font-light limit-text-3">{question.body}</p>
          <div className="flex items-center my-2 space-x-3">
            {question.photos.map((photo) => (
              <>
                <div className="relative w-20 h-20" key={photo.public_id}>
                  <Image
                    src={photo.url}
                    alt={photo.public_id}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </>
            ))}
          </div>
          <div className="space-x-2">
            {question.tags.map((tag, idx) => (
              <span
                className="px-2 py-1 text-[12px] text-sm text-blue-500 bg-blue-300 rounded-md cursor-pointer hover:underline"
                key={idx}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-400 mt-2 text-[12px]">
            {dayjs(question.createdAt).fromNow()}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 mt-2 -mx-3 -mb-4 transition-duration bg-gradient-to-tl from-fuchsia-500 to-purple-600 rounded-b-md">
        <Link
          href={`${
            question.userId._id === user?._id
              ? '/users/my-profile'
              : '/users/' + question.userId.username
          }`}
        >
          <a className="flex items-center space-x-2 group">
            <div className="relative w-10 h-10 border-4 border-white rounded-full">
              <Image
                src={question?.userId?.avatar}
                alt={question.userId.username}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>

            <div className="leading-none ">
              <p className="text-sm text-white md:text-base group-hover:underline">
                {question.userId.fullname}
              </p>
              <p className="text-[12px] md:text-sm text-gray-200/80">
                @{question.userId.username}
              </p>
            </div>
          </a>
        </Link>
        <button onClick={() => saveQuestion(question._id, dispatch)}>
          {user?.saveQuestions.some(
            (q: IQuestion) => q._id === question._id
          ) ? (
            <BsBookmarkFill className="text-2xl text-white cursor-pointer hover:opacity-50" />
          ) : (
            <BsBookmarkPlus className="text-2xl text-white cursor-pointer hover:opacity-50" />
          )}
        </button>
      </div>
      <div className="absolute z-10 flex items-center space-x-3 top-2 right-2">
        {/* Is my post */}
        {authenticated && question.userId._id === user?._id && (
          <>
            <button
              onClick={() =>
                handleDeleteQuestion(question._id, dispatch, router)
              }
            >
              <FaTrash className="text-red-500 cursor-pointer hover:opacity-50" />{' '}
            </button>
            <button
              onClick={() =>
                handleEditQuestion(question.slug, dispatch, router)
              }
            >
              <FaEdit className="text-blue-500 cursor-pointer hover:opacity-50" />
            </button>
          </>
        )}{' '}
      </div>
    </div>
  );
};

export default QuestionItem;
