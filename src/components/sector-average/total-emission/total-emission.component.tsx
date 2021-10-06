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

import { NumberFormatter, makeNumberFormatter } from 'lib/number-format';
import { TooltipComponent } from 'components';
import styles from './total-emission.module.scss';

export interface TotalEmissionComponentProps {
  countryIsoName?: string;
  sectorName?: string;
  totalEmissionsKg?: number;
}

const formatEmissions: NumberFormatter = makeNumberFormatter(3, 1);

const pickSizeClass = (text: string): string => {
  const n = text.length;
  if (n <= 6) {
    // 10k
    return '--size1';
  } else if (n <= 7) {
    // 100k
    return '--size2';
  } else if (n <= 9) {
    // 1M
    return '--size3';
  } else if (n <= 10) {
    // 10M
    return '--size4';
  } else if (n <= 11) {
    // 100M
    return '--size5';
  } else {
    // 1B
    return '--size6';
  }
};

const TotalEmissionComponent = ({ countryIsoName, sectorName, totalEmissionsKg }: TotalEmissionComponentProps) => {
  const emissionsTonnes = typeof totalEmissionsKg === 'undefined' ? '?' : formatEmissions(totalEmissionsKg / 1000.0); // Convert kg -> tonnes.
  const industryLabel = sectorName || 'unknown';
  const countryLabel = countryIsoName || 'unknown country';
  const sizeClass = pickSizeClass(emissionsTonnes);

  return (
    <div className={styles['container']}>
      <div>
        <p className={styles['emission']}>Annual total emissions</p>
        <h3 className={styles['amount']}>
          <span className={styles['amount-value' + sizeClass]}>{emissionsTonnes}</span>{' '}
          <small>
            tonnes CO<sub>2</sub>e
          </small>
          <TooltipComponent position={{ right: '-72px', bottom: '52px' }}>
            The carbon footprint of all activities is expressed in terms of{' '}
            <strong>
              Carbon dioxide equivalent (CO<sub>2</sub>e)
            </strong>
            . Scientists convert other Greenhouse gases to the equivalent amount of carbon dioxide (CO<sub>2</sub>) that
            would create the same amount of global warming.
          </TooltipComponent>
        </h3>
      </div>
      <div>
        <p className={styles['description']}>
          This benchmark is based on the annual emissions of companies in the <strong>{industryLabel} industry</strong>{' '}
          in <strong>{countryLabel}</strong> with an annual revenue of 10&nbsp;million EUR.
        </p>
      </div>
    </div>
  );
};

export default TotalEmissionComponent;
