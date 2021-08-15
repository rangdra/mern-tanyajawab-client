import Link from 'next/link';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';

import { IQuestion } from '../interface';
import { useAppDispatch, useAppSelector } from '../store';
import axios from '../config/axios';
import {
  deleteQuestion,
  setCurrentSlug,
} from '../features/questions/questionSlice';

dayjs.extend(relativeTime);
interface IProps {
  question: IQuestion;
}

const QuestionItem: FC<IProps> = ({ question }) => {
  const router = useRouter();
  const { user, authenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      await axios.delete(`/questions/${question._id}`);
      dispatch(deleteQuestion(question._id));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleEdit = () => {
    dispatch(setCurrentSlug(question.slug));
    router.push('/questions/add');
  };

  const [voteScore, setVoteScore] = useState(0);

  useEffect(() => {
    const countVote = question.votes.reduce(
      (acc, curr) => acc + (curr.value || 0),
      0
    );
    setVoteScore(countVote);
  }, [question.votes]);

  return (
    <div className="relative px-3 py-4 rounded-md shadow-lg">
      <div className="flex space-x-4 bg-white cursor-pointer">
        <div className="space-y-2 text-sm text-center md:text-base">
          <div>
            <p>{voteScore}</p>
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
      <Link
        href={`${
          question.userId._id === user?._id
            ? '/users/my-profile'
            : `/users/${question.userId.username}`
        }`}
      >
        <a className="block p-4 mt-2 -mx-3 -mb-4 transition-duration group bg-gradient-to-tl from-fuchsia-500 to-purple-600 rounded-b-md">
          <div className="flex items-center space-x-2">
            <div className="relative w-10 h-10 border-4 border-white rounded-full">
              <Image
                src={
                  `${question?.userId?.avatar}` ||
                  'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                }
                alt={`${question.userId.username}`}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>

            <div className="leading-tight">
              <p className="text-sm text-white md:text-base group-hover:underline ">
                {question.userId.fullname}
              </p>
              <p className="text-[12px] md:text-sm text-gray-200/80">
                @{question.userId.username}
              </p>
            </div>
          </div>
        </a>
      </Link>

      {/* Is my post */}
      {authenticated && question.userId._id === user?._id && (
        <div className="absolute z-10 flex items-center space-x-2 top-2 right-2">
          <FaTrash
            onClick={handleDelete}
            className="text-red-500 cursor-pointer hover:opacity-50"
          />
          <FaEdit
            onClick={handleEdit}
            className="text-blue-500 cursor-pointer hover:opacity-50"
          />
        </div>
      )}
    </div>
  );
};

export default QuestionItem;
