import axios from '../../config/axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { IQuestion } from '../../interface';
import { FC } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { useAppSelector } from '../../store';
import Button from '../../components/atom/Button';
import AnswerBox from '../../components/AnswerBox';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

dayjs.extend(relativeTime);

interface IProps {
  detailQuestion: IQuestion;
}
const QuestionDetail: FC<IProps> = ({ detailQuestion }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [voteScore, setVoteScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const countVote = detailQuestion.votes.reduce(
      (acc, curr) => acc + (curr.value || 0),
      0
    );
    setVoteScore(countVote);
  }, [detailQuestion.votes]);

  const handleVote = async (value: number) => {
    try {
      await axios.put(`/questions/${detailQuestion._id}/votes`, { value });
      router.push(`/questions/${detailQuestion.slug}`);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout title={detailQuestion?.slug}>
      <h2 className="mb-4 text-3xl">Question: </h2>
      <div className="flex bg-white rounded-md shadow-lg">
        <div className="w-2/12 p-4 bg-gray-200">
          <div className="flex flex-col items-center justify-center space-y-2 text-2xl">
            <BsChevronUp
              onClick={() => handleVote(1)}
              className={`${
                detailQuestion.votes.some(
                  (vote) => vote.userId === user?._id && vote.value === 1
                ) && 'text-green-500 w-8 h-8'
              } cursor-pointer`}
            />
            <span>{voteScore}</span>
            <BsChevronDown
              onClick={() => handleVote(-1)}
              className={`${
                detailQuestion.votes.some(
                  (vote) => vote.userId === user?._id && vote.value === -1
                ) && 'text-red-500 w-8 h-8'
              } cursor-pointer`}
            />
            <div className="pt-2 leading-relaxed text-center">
              <p className="text-2xl ">{detailQuestion.answers.length}</p>
              <p className="text-lg">Answers</p>
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
      </div>

      <section className="my-8">
        <h2 className="text-2xl">{detailQuestion.answers.length} Answers</h2>
        {detailQuestion.answers.length > 0 ? (
          detailQuestion.answers.map((answer, idx) => (
            <AnswerBox answer={answer} key={idx} />
          ))
        ) : (
          <p>No answer</p>
        )}
      </section>

      <section>
        <h3 className="mb-2">Your Answer</h3>
        <form className="w-3/4">
          <textarea
            name="new_answer"
            id="new_answer"
            className="w-full p-2 text-sm border border-gray-300 rounded outline-none appearance-none focus:ring focus:ring-fuchsia-500 focus:ring-opacity-50 transition-duration"
            rows={5}
          ></textarea>
          <Button type="submit">Create Answer</Button>
        </form>
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
      detailQuestion: data,
    },
  };
};
