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

import { AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps, FunctionComponent } from 'react';
import classNames from 'classnames';
import styles from './button.module.scss';

type DetailedAnchorProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
type DetailedButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

interface BaseButtonProps {
  bordered?: boolean;
  fullWidth?: boolean;
  primary?: boolean;
}

export type AnchorProps = BaseButtonProps & DetailedAnchorProps;
export type ButtonProps = BaseButtonProps & DetailedButtonProps;

const Button: FunctionComponent<ButtonProps | AnchorProps> = ({
  bordered,
  className,
  fullWidth,
  primary,
  ...props
}) => {
  const allClassNames = classNames(
    styles['button'],
    {
      [styles['button--bordered']]: bordered,
      [styles['button--full-width']]: fullWidth,
      [styles['button--primary']]: primary,
    },
    className,
  );

  const allProps = { ...props, className: allClassNames };
  return isAnchor(allProps) ? <a {...allProps}></a> : <button {...allProps}></button>;
};

export default Button;

function isAnchor(props: DetailedAnchorProps | DetailedButtonProps): props is DetailedAnchorProps {
  return !!(props as DetailedAnchorProps).href;
}
