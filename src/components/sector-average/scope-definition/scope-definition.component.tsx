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

import GreenhouseGasProtocolLogo from '@normative/theme/src/assets/external/logos/greenhouse-gas-protocol.svg';

import styles from './scope-definition.module.scss';

const SCOPE_DEFINITIONS = [
  {
    title: 'Scope 1',
    headline: 'Direct emissions',
    definition:
      ' from the combustion of fuel in assets that a company operates such as fuel emissions from company-owned cars, diesel generators, gas boilers and air-conditioning leaks.',
  },
  {
    title: 'Scope 2',
    headline: 'Indirect emissions',
    definition:
      ' from the generation of energy purchased from a utility provider, such as heating, cooling, steam, and electricity.',
  },
  {
    title: 'Scope 3',
    headline: 'All indirect greenhouse gas emissions',
    definition: ' from your supply chain that do not fall under Scope 1 & 2.',
  },
];

const ScopeDefinitionComponent = () => {
  return (
    <>
      <div className={styles['scope-definition']}>
        <h2 className={styles['scope-definition__heading']}>What are scopes?</h2>
        <h3 className={styles['scope-definition__title']}>{SCOPE_DEFINITIONS[0].title}</h3>
        <p className={styles['scope-definition__text']}>
          <strong>{SCOPE_DEFINITIONS[0].headline}</strong>
          {SCOPE_DEFINITIONS[0].definition}
        </p>
      </div>
      <div className={styles['scope-definition']}>
        <h3 className={styles['scope-definition__title']}>{SCOPE_DEFINITIONS[1].title}</h3>
        <p className={styles['scope-definition__text']}>
          <strong>{SCOPE_DEFINITIONS[1].headline}</strong>
          {SCOPE_DEFINITIONS[1].definition}
        </p>
      </div>
      <div className={styles['scope-definition']}>
        <h3 className={styles['scope-definition__title']}>{SCOPE_DEFINITIONS[2].title}</h3>
        <p className={styles['scope-definition__text']}>
          <strong>{SCOPE_DEFINITIONS[2].headline}</strong>
          {SCOPE_DEFINITIONS[2].definition}
        </p>
        <p>&nbsp;</p>

        <div className={styles['scope-definition__ghg-protocol']}>
          <a
            aria-label='Read more about the Greenhouse Gas Protocol'
            href='https://ghgprotocol.org/'
            target='_blank'
            rel='noreferrer'
          >
            <span aria-hidden='true'>Read more</span>
            <GreenhouseGasProtocolLogo aria-hidden='true' width={89} height={25} />
          </a>
        </div>
      </div>
    </>
  );
};

export default ScopeDefinitionComponent;
