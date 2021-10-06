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

import {
  DetailedHTMLProps,
  FocusEvent,
  FocusEventHandler,
  FunctionComponent,
  InputHTMLAttributes,
  useState,
} from 'react';
import classNames from 'classnames';
import styles from './text-input.module.scss';

type DetailedInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export interface TextInputProps extends DetailedInputProps {
  error?: string;
  label: string;
}

let count = 1;
const getUniqueId = () => `text-input-${count++}`;

const TextInput: FunctionComponent<TextInputProps> = ({ className, error, label, ...inputProps }) => {
  const [id] = useState(getUniqueId);
  const [focus, setFocus] = useState(false);

  const rootClassName = classNames(
    styles['text-input'],
    {
      [styles['text-input--error']]: error,
      [styles['text-input--filled']]: !!inputProps.value,
      [styles['text-input--focus']]: focus,
    },
    className,
  );

  const onFocusEvent = (
    event: FocusEvent<HTMLInputElement>,
    focus: boolean,
    next?: FocusEventHandler<HTMLInputElement>,
  ) => {
    setFocus(focus);
    if (next) next(event);
  };

  return (
    <div className={rootClassName}>
      <label
        aria-label={error ? `${label} - ${error}` : undefined}
        className={styles['text-input__label']}
        htmlFor={id}
      >
        {error || label}
      </label>
      <input
        aria-invalid={error ? true : undefined}
        className={styles['text-input__input']}
        id={id}
        onBlur={(event) => onFocusEvent(event, false, inputProps.onBlur)}
        onFocus={(event) => onFocusEvent(event, true, inputProps.onFocus)}
        {...inputProps}
      />
    </div>
  );
};

export default TextInput;
