import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import { Provider } from 'react-redux';

import 'styles/globals.css';
import store from 'store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" />
    </Provider>
  );
}
export default MyApp;
