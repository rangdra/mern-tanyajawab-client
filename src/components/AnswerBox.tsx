import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';
import dayjs from 'dayjs';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import relativeTime from 'dayjs/plugin/relativeTime';

import { IAnswer, IQuestion } from '../interface';
import { useAppSelector } from 'store';
import axios from 'config/axios';
import { handleVote } from 'store/actions/questionActions';

dayjs.extend(relativeTime);

interface IProps {
  answer: IAnswer;
  detailQuestion: IQuestion;
  getData: () => void;
  deleteAnswer: (id: string) => void;
}

const AnswerBox: FC<IProps> = ({
  answer,
  deleteAnswer,
  detailQuestion,
  getData,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    setVoteCount(
      answer.votes.reduce((acc: any, curr: any) => acc + (curr.value || 0), 0)
    );
  }, [answer.votes]);

  return (
    <div className="my-4">
      <div className="flex bg-white rounded-md shadow-lg">
        <div className="w-2/12 p-4 bg-gray-200">
          <div className="flex flex-col items-center justify-center space-y-2">
            <button
              onClick={() =>
                handleVote(
                  `/questions/${detailQuestion._id}/answers/${answer._id}/votes`,
                  1,
                  getData
                )
              }
            >
              <TiArrowSortedUp
                className={`${
                  answer.votes.some(
                    (vote) => vote.userId === user?._id && vote.value === 1
                  ) && 'text-green-500 w-12 h-12'
                } cursor-pointer w-8 h-8`}
              />
            </button>

            <span className="text-xl">{voteCount}</span>
            <button
              onClick={() =>
                handleVote(
                  `/questions/${detailQuestion._id}/answers/${answer._id}/votes`,
                  -1,
                  getData
                )
              }
            >
              <TiArrowSortedDown
                className={`${
                  answer.votes.some(
                    (vote) => vote.userId === user?._id && vote.value === -1
                  ) && 'text-red-500 w-12 h-12'
                } cursor-pointer w-8 h-8`}
              />
            </button>
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
          <p className="my-2 text-sm">{answer.text}</p>
          <div className="absolute top-2 right-2">
            <button onClick={() => deleteAnswer(answer._id)}>
              <FaTrash className="text-red-500 cursor-pointer hover:opacity-50" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerBox;
