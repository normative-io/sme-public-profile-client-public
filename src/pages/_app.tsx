// Copyright 2022 Meta Mind AB
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import type { AppProps } from 'next/app';
import Script from 'next/script';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Header, Footer } from 'components';
import { sendPageviewToGtm } from 'lib/gtm';

import 'styles/index.scss';

const APP_ROOT_ID = 'sme-public-profile-client';
Modal.setAppElement(`#${APP_ROOT_ID}`);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', sendPageviewToGtm);

    return () => {
      router.events.off('routeChangeComplete', sendPageviewToGtm);
    };
  }, [router.events]);

  return (
    <>
      <Script src='/env/__ENV.js' strategy={'beforeInteractive'} />
      <div id={APP_ROOT_ID}>
        <Header />
        <Component {...pageProps} />
        <Footer copyrightBy='Normative' copyrightYear='2021' />
      </div>
    </>
  );
}
export default MyApp;
