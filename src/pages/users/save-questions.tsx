import Layout from 'components/Layout';
import QuestionItem from 'components/QuestionItem';
import { GetServerSideProps } from 'next';
import { useAppSelector } from 'store';

const SaveQuestion = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <Layout title="Save Question">
      <h2 className="mb-2 text-2xl font-bold text-gray-700 md:text-3xl">
        List Questions
      </h2>
      {user!.saveQuestions.length > 0 ? (
        user!.saveQuestions.map((question) => (
          <QuestionItem key={question._id} question={question} />
        ))
      ) : (
        <p>No Question</p>
      )}
    </Layout>
  );
};

export default SaveQuestion;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = req.cookies.token;

  if (!token) {
    res.writeHead(302, {
      Location: '/auth/login',
    });
    res.end();
  }
  return {
    props: {},
  };
};
