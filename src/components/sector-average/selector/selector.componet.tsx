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

import { ReactElement, useEffect, useState } from 'react';
import { AutoComplete } from 'antd';

import styles from './selector.module.scss';

interface Option {
  value: string;
}

interface CountrySelectorProps {
  icon: ReactElement;
  items: Option[];
  selectedOption: string;
  placeholder: string;
  sendValueToParent: (value: string) => void;
}

const getSearchResult = (searchText = '', items: Option[]): Option[] | [] => {
  const filteredOptions =
    items.filter((option: any) => option.value.toLowerCase().indexOf(searchText.toLowerCase()) > -1) || [];

  return !searchText ? items : filteredOptions;
};

const getValidValue = (currentValue: string, selectedOption: string, items: Option[]): string => {
  const isValueValid = !!(currentValue && items.find((item: any) => item.value === currentValue));

  return isValueValid ? currentValue : selectedOption;
};

const SelectorComponent = ({ icon, items, placeholder, selectedOption, sendValueToParent }: CountrySelectorProps) => {
  const [value, setValue] = useState<string>(selectedOption);
  const [options, setOptions] = useState<Option[]>(items);

  useEffect(() => {
    setValue(selectedOption);
  }, [selectedOption]);

  const setValidValue = (currentValue: string): void => {
    const validValue: string = getValidValue(currentValue, selectedOption, items);

    setValue(validValue);
    if (selectedOption !== validValue) sendValueToParent(validValue);
  };

  const onSearch = (searchText: string) => setOptions(getSearchResult(searchText, items));

  const onChange = (currentValue: string): void => {
    setValue(currentValue);
  };

  const onSelect = (currentValue: string): void => {
    setValidValue(currentValue);
  };

  const onBlur = (): void => {
    setValidValue(value);
    setOptions(items);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.icon}>{icon}</div>
        <AutoComplete
          value={value}
          options={options}
          style={{ width: '100%' }}
          onSearch={onSearch}
          onSelect={onSelect}
          onChange={onChange}
          onBlur={onBlur}
          notFoundContent={'No options found'}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default SelectorComponent;
