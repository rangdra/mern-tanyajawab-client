import axios from 'config/axios';
import { GetServerSideProps } from 'next';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { BsBookmarkPlus, BsBookmarkFill } from 'react-icons/bs';

import Layout from 'components/Layout';
import { IAnswer, IQuestion } from 'interface';
import { useAppDispatch, useAppSelector } from 'store';
import AnswerBox from 'components/AnswerBox';
import FormAnswer from 'components/FormAnswer';
import {
  handleDeleteQuestion,
  handleEditQuestion,
  handleVote,
} from 'store/actions/questionActions';
import { saveQuestion } from 'store/actions/userAction';

dayjs.extend(relativeTime);

interface IProps {
  data: IQuestion;
}
const QuestionDetail: FC<IProps> = ({ data }) => {
  const { user, authenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [detailQuestion, setDetailQuestion] = useState(data);

  const getData = useCallback(async () => {
    const res: IQuestion = await axios.get(`/questions/${router.query.slug}`);
    setDetailQuestion(res);
  }, [router]);

  const deleteAnswer = async (answerId?: string) => {
    try {
      await axios.delete(
        `/questions/${detailQuestion._id}/answers/${answerId}`
      );
      getData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout title={detailQuestion?.slug}>
      <h2 className="mb-4 text-3xl">Pertanyaan: </h2>
      <div className="relative flex bg-white rounded-md shadow-lg">
        <div className="w-2/12 p-4 bg-gray-200">
          <div className="flex flex-col items-center justify-center space-y-2">
            <button
              onClick={() =>
                handleVote(`/questions/${detailQuestion._id}/votes`, 1, getData)
              }
            >
              <TiArrowSortedUp
                className={`${
                  detailQuestion.votes.some(
                    (vote) => vote.userId === user?._id && vote.value === 1
                  ) && 'text-green-500 w-12 h-12'
                } cursor-pointer w-8 h-8`}
              />
            </button>
            <span className="text-xl">{detailQuestion.voteScore}</span>
            <button
              onClick={() =>
                handleVote(
                  `/questions/${detailQuestion._id}/votes`,
                  -1,
                  getData
                )
              }
            >
              <TiArrowSortedDown
                className={`${
                  detailQuestion.votes.some(
                    (vote) => vote.userId === user?._id && vote.value === -1
                  ) && 'text-red-500 w-12 h-12'
                } cursor-pointer w-8 h-8`}
              />
            </button>

            <div className="pt-2 leading-relaxed text-center">
              <p className="text-2xl ">{detailQuestion.answers.length}</p>
              <p className="text-sm md:text-lg">Jawaban</p>
            </div>
          </div>
        </div>
        <div className="w-10/12 p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {detailQuestion?.title}
          </h2>
          <p className="text-[12px] font-light text-gray-400">
            by{' '}
            <Link
              href={`${
                detailQuestion.userId._id === user?._id
                  ? '/users/my-profile'
                  : `/users/${detailQuestion.userId.username}`
              }`}
            >
              <a className="underline hover:opacity-50">
                @{detailQuestion.userId.username}
              </a>
            </Link>{' '}
            • {dayjs(detailQuestion.createdAt).fromNow()}
          </p>
          <p className="my-2 text-sm">{detailQuestion.body}</p>
          <div className="flex items-center mb-4 space-x-3 overflow-auto">
            {detailQuestion.photos.map((photo) => (
              <>
                <div className="relative w-32 h-32" key={photo.public_id}>
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
            {detailQuestion.tags.map((tag, idx) => (
              <span
                className="px-2 py-1 text-[12px] text-sm text-blue-500 bg-blue-300 rounded-md cursor-pointer hover:underline"
                key={idx}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* Is my post */}
        <div className="absolute z-10 flex items-center space-x-2 top-2 right-2">
          {authenticated && detailQuestion.userId._id === user?._id && (
            <>
              <button
                onClick={() =>
                  handleDeleteQuestion(detailQuestion._id, dispatch, router)
                }
              >
                <FaTrash className="text-red-500 cursor-pointer hover:opacity-50" />{' '}
              </button>
              <button
                onClick={() =>
                  handleEditQuestion(detailQuestion.slug, dispatch, router)
                }
              >
                <FaEdit className="text-blue-500 cursor-pointer hover:opacity-50" />{' '}
              </button>
            </>
          )}
          <button onClick={() => saveQuestion(detailQuestion._id, dispatch)}>
            {user?.saveQuestions.some(
              (q: IQuestion) =>
                q._id.toString() === detailQuestion._id.toString()
            ) ? (
              <BsBookmarkFill className="text-gray-800 cursor-pointer hover:opacity-50" />
            ) : (
              <BsBookmarkPlus className="text-gray-800 cursor-pointer hover:opacity-50" />
            )}
          </button>
        </div>
      </div>

      <section className="my-4 md:my-8">
        <h2 className="text-2xl">{detailQuestion.answers.length} Answers</h2>
        {detailQuestion.answers.length > 0 ? (
          detailQuestion.answers.map((answer: IAnswer) => (
            <AnswerBox
              answer={answer}
              key={answer._id}
              deleteAnswer={deleteAnswer}
              detailQuestion={detailQuestion}
              getData={getData}
            />
          ))
        ) : (
          <p>Tidak ada jawaban</p>
        )}
      </section>

      <section>
        <h3 className="mt-6 mb-1">Buat Jawaban?</h3>
        <FormAnswer questionId={detailQuestion._id} getData={getData} />
      </section>
    </Layout>
  );
};

export default QuestionDetail;

export const getServerSideProps: GetServerSideProps = async ({
  query: { slug },
}) => {
  const data = await axios.get(`/questions/${slug}`);
  return {
    props: {
      data,
    },
  };
};
