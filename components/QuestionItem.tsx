import Link from 'next/link';
import { useState } from 'react';

const QuestionItem = () => {
  const [tags] = useState(['js', 'react', 'css']);
  return (
    <div className="flex items-center px-3 py-4 space-x-4 bg-white border border-gray-100 rounded-md shadow cursor-pointer hover:bg-gray-100">
      <div className="space-y-2 text-sm text-center md:text-base">
        <div>
          <p>0</p>
          <p>votes</p>
        </div>
        <div>
          <p>0</p>
          <p>answers</p>
        </div>
      </div>
      <div>
        <Link href="/question/id">
          <a className="mb-1 leading-tight text-blue-500 md:text-lg hover:underline limit-text-2">
            title Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium, voluptas!
          </a>
        </Link>

        <p className="mb-2 text-[12px] md:text-sm font-light limit-text-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus
          fuga, deleniti sequi possimus, molestiae iure voluptates, enim aperiam
          facere odio suscipit at totam quam perspiciatis earum aliquam
          distinctio numquam eos.
        </p>
        <div className="space-x-2">
          {tags.map((tag, idx) => (
            <span
              className="px-2 py-1 text-sm text-blue-500 bg-blue-300 rounded-md cursor-pointer hover:underline"
              key={idx}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
