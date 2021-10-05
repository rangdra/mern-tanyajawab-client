// @ts-nocheck
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import { Provider } from 'react-redux';
import SimpleReactLightbox from 'simple-react-lightbox';

import 'styles/globals.css';
import store from 'store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SimpleReactLightbox>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer position="bottom-right" />
      </Provider>
    </SimpleReactLightbox>
  );
}
export default MyApp;
