import { FC, useState, FormEvent } from 'react';
import axios from 'config/axios';
import { toast } from 'react-toastify';

import Button from './atom/Button';

interface IProps {
  questionId: string;
  getData: () => void;
}

const FormAnswer: FC<IProps> = ({ questionId, getData }) => {
  const [text, setText] = useState('');
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(`/questions/${questionId}/answers`, { text });
      setText('');
      getData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <form className="w-3/4" onSubmit={handleSubmit}>
      <textarea
        name="new_answer"
        id="new_answer"
        className="w-full p-2 text-sm border border-gray-300 rounded outline-none appearance-none focus:ring focus:ring-fuchsia-500 focus:ring-opacity-50 transition-duration"
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <Button type="submit">Jawab pertanyaan</Button>
    </form>
  );
};

export default FormAnswer;
