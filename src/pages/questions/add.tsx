// @ts-nocheck

import axios from 'config/axios';
import { ChangeEvent, FormEvent, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Layout from 'components/Layout';

import { useAppSelector } from 'store';
import { IQuestion } from 'interface';
import Button from 'components/atom/Button';
import { uploadImageMulti } from 'utils/uploadImage';
import { createQuestion, editQuestion } from 'store/actions/questionActions';
import { GetServerSideProps } from 'next';

const CreateQuestion = () => {
  const inputImage = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const { currentSlug } = useAppSelector((state) => state.questions);
  const router = useRouter();
  const [data, setData] = useState({
    title: '',
    body: '',
    tags: '',
    photos: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const deleteImage = (index: number) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleUploadInput = (
    e?: ChangeEvent<HTMLInputElement & EventTarget>
  ) => {
    let newImages: any = [];
    let num = 0;
    let err = '';
    const files: FileList[] = [...e.target!.files];

    if (files.length === 0) return toast.error('Files does not exist.');

    files.forEach((file: any) => {
      if (file.size > 1024 * 1024)
        return (err = 'The largest image size is 1mb');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return (err = 'Image format is incorrect.');

      num += 1;
      if (num <= 5) newImages.push(file);
      return newImages;
    });

    if (err) toast.error(err);

    const imgCount = images.length;
    if (imgCount + newImages.length > 5)
      return toast.error('Select up to 5 images.');
    setImages([...images, ...newImages]);
  };

  useEffect(() => {
    if (currentSlug) {
      const getQuestion = async () => {
        const res: IQuestion = await axios.get(`/questions/${currentSlug}`);
        if (res) {
          setData({
            ...data,
            title: res.title,
            body: res.body,
            tags: res.tags.join(','),
          });
          setImages(res.photos);
        }
      };
      getQuestion();
    }
  }, [currentSlug]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let media: any[] = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);
    if (imgNewURL.length > 0) media = await uploadImageMulti(imgNewURL);

    if (currentSlug) {
      // edit
      editQuestion(
        {
          ...data,
          photos: [...imgOldURL, ...media],
        },
        currentSlug,
        router
      );
    } else {
      // create
      createQuestion(
        {
          ...data,
          photos: [...imgOldURL, ...media],
        },
        router
      );
    }
  };

  return (
    <Layout title={`${currentSlug ? 'Edit' : 'Create'} Question`}>
      <h2 className="mb-2 text-4xl font-bold md:tracking-wider md:font-extrabold">
        {currentSlug ? 'Edit' : 'Create'}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="p-4 border border-gray-200 rounded-md shadow-lg"
      >
        <div className="mb-2">
          <label htmlFor="title" className="block text-lg">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={data.title}
            onChange={handleChange}
            required
            placeholder="Title Question"
            className="border border-gray-300 h-[40px] pl-2 outline-none w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="body" className="block text-lg">
            Body
          </label>
          <textarea
            name="body"
            id="body"
            value={data.body}
            onChange={handleChange}
            required
            placeholder="Body Question"
            className="border h-[100px] border-gray-300 p-2 outline-none w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="tags" className="block text-lg">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={data.tags}
            onChange={handleChange}
            required
            placeholder="*example js,php,ruby"
            className="border border-gray-300 h-[40px] pl-2 outline-none w-full"
          />
        </div>

        <div className="mb-2">
          <p className="mb-2 text-sm text-gray-600 ">
            Add a picture
            <span className="text-[10px] sm:text-xs italic font-thin text-red-600">
              *Maks 5 photos
            </span>
          </p>
          <input
            type="file"
            onChange={handleUploadInput}
            multiple
            accept="image/*"
            className="hidden"
            ref={inputImage}
          />
          <button
            onClick={() => inputImage.current!.click()}
            className="px-4 py-2 text-sm font-semibold text-white transition-duration bg-fuchsia-500 hover:bg-fuchsia-600"
            type="button"
          >
            Choose image
          </button>

          <div className="flex items-center mt-4 space-x-2">
            {images &&
              images.map(
                (img: { public_id: string; url: string }, index: number) => (
                  <div key={index} className="relative">
                    <img
                      src={img.url ? img.url : URL.createObjectURL(img)}
                      alt={img.public_id}
                      className="object-cover h-24"
                    />

                    <span
                      className="absolute flex items-center justify-center w-5 h-5 text-sm text-white bg-gray-700 rounded-full cursor-pointer -top-2 -right-2 hover:bg-white hover:text-gray-700"
                      onClick={() => deleteImage(index)}
                    >
                      x
                    </span>
                  </div>
                )
              )}
          </div>
        </div>

        <Button type="submit"> {currentSlug ? 'Edit' : 'Create'}</Button>
      </form>
    </Layout>
  );
};

export default CreateQuestion;

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
