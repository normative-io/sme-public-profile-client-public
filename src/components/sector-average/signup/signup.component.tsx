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

import ForwardArrowIcon from '@normative/theme/src/assets/icon/arrow-right.svg';

import { Button } from 'components';

import styles from './signup.module.scss';

const Signup = () => {
  return (
    <div className={styles.signup}>
      <div className={styles['signup__container']}>
        <h2 className={styles['signup__header']}>How does your company compare against the average? </h2>
        <p className={styles['signup__prompt']}>
          Understanding your industry’s average emissions can guide your reduction strategy at a high level, but to
          reach net zero you need to know your company’s specific emissions. We’re developing a free carbon accounting
          engine to help SMEs calculate and reduce their emissions.
        </p>
        <Button
          className={styles['signup__button']}
          href='https://businesscarboncalculator.normative.io/signup'
          primary
          target='_blank'
        >
          Sign up
          <ForwardArrowIcon />
        </Button>
      </div>
    </div>
  );
};

export default Signup;
