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

import styles from './welcome.module.scss';

const WelcomeComponent = () => {
  return (
    <section className={styles['welcome']}>
      <h1 className={styles['welcome__title']}>
        Welcome to Normative&apos;s Industry <span className={styles['corel']}>CO₂ Insights.</span>
      </h1>
      <p className={styles['welcome__description']}>
        On this page you can see the estimated average greenhouse gas emissions produced by similar companies in your
        sector and country. These insights help you benchmark your company’s emissions – broken down by scope – and
        highlight activities likely to contain emissions hotspots.
      </p>
    </section>
  );
};

export default WelcomeComponent;
