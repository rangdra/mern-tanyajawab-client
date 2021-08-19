import Layout from 'components/Layout';
import QuestionItem from 'components/QuestionItem';
import { useRouter } from 'next/router';
import { useAppSelector } from 'store';

const SaveQuestion = () => {
  const { user, authenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  if (process.browser) {
    if (!authenticated) {
      router.push('/auth/login');
    }
  }

  return (
    <Layout title="Save Question">
      <h2 className="mb-2 text-2xl font-bold text-gray-700 md:text-3xl">
        List Questions
      </h2>
      {user && user.saveQuestions.length > 0 ? (
        user?.saveQuestions.map((question) => (
          <QuestionItem key={question._id} question={question} />
        ))
      ) : (
        <p>No Question</p>
      )}
    </Layout>
  );
};

export default SaveQuestion;
