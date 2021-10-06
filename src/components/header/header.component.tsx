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

import Image from 'next/image';

import logo from '@normative/theme/src/assets/logos/Normative-logo-White.png';

import Button from 'components/button/button.component';

import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles['header']}>
      <div className={styles['header__container']}>
        <div className={styles['header__title']}>
          <Image src={logo} alt='Normative' width={156} height={24} />
        </div>
        <div className={styles['header__signup']}>
          <span className={styles['header--show-on-desktop']}>Sign up for our free carbon accounting tool</span>
          <Button
            className={styles['header__signup-button']}
            href='https://businesscarboncalculator.normative.io/signup'
            target='_blank'
          >
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
