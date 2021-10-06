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

import SmechLogo from '@normative/theme/src/assets/external/logos/sme-climate-hub.svg';

import styles from './footer.module.scss';

export interface FooterProps {
  copyrightBy: string;
  copyrightYear: string;
}

const Footer = (props: FooterProps) => {
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer__about-us']}>
        <div className={styles['footer__our-mission']}>
          <h2>Our mission.</h2>
          <p>
            Normative is accelerating the transition to net zero emissions. As creators of the world’s first carbon
            accounting engine, we provide science-based carbon calculation and tailored advice from experts, enabling
            companies to reach net zero emissions.
          </p>
        </div>
        <div className={styles['footer__who-we-are']}>
          <div>
            <h3>Who we are</h3>
            <ul>
              <li>
                <a target='_blank' href='https://normative.io/about/' rel='noreferrer'>
                  About us
                </a>
              </li>
              <li>
                <a target='_blank' href='https://normative.io/insights/' rel='noreferrer'>
                  Insights
                </a>
              </li>
              <li>
                <a
                  target='_blank'
                  href='https://normative.io/book-a-demo/?utm_medium=post&utm_source=website&utm_campaign=Benchmark_internal'
                  rel='noreferrer'
                >
                  Book a demo
                </a>
              </li>
              <li>
                <a target='_blank' href='mailto:support@normative.io?subject=Industry CO2 Insights' rel='noreferrer'>
                  Contact us
                </a>
              </li>
            </ul>
          </div>
          <div className={styles['footer__partnership']}>
            <a href='https://smeclimatehub.org/' target='_blank' rel='noreferrer'>
              <SmechLogo role='presentation' width={71} height={78} />
              <p>
                In partnership with <br /> SME Climate Hub
              </p>
            </a>
          </div>
        </div>
      </div>
      <div className={styles['footer__container']}>
        <span className={styles['footer__copyright']}>
          Copyright &copy; {props.copyrightBy} {props.copyrightYear}
        </span>
        <span className={styles['footer__links']}>
          <a target='_blank' href='https://normative.io/privacy-policy/' rel='noreferrer'>
            Privacy policy
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
