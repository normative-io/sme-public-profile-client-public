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

import { TooltipComponent } from 'components';

import styles from './exiobase.module.scss';

const ExiobaseComponent = () => {
  return (
    <p className={styles['graph-info']}>
      Data source:{' '}
      <a href='https://exiobase.eu/' target='_blank' rel='noreferrer'>
        <strong>EXIOBASE</strong>
      </a>
      <TooltipComponent position={{ right: '-32px', bottom: '32px' }}>
        <strong>EXIOBASE</strong> is a global database harmonizing and detailing supply-use tables for a large number of
        countries, estimating emissions and resource extractions by industry.
      </TooltipComponent>
    </p>
  );
};

export default ExiobaseComponent;
