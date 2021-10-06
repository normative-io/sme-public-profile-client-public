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

import QuestionIcon from '@normative/theme/src/assets/icon/question.svg';

import styles from './tooltip.module.scss';

const TooltipComponent = ({ children, position }: any) => {
  return (
    <span className={styles['info-block']}>
      <QuestionIcon />
      <span className={styles['info-block__tooltip']} style={{ bottom: position.bottom, right: position.right }}>
        {children}
      </span>
    </span>
  );
};

export default TooltipComponent;
