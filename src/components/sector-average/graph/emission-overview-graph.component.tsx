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

import { Chart as ChartJS, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip);

import { convertChartData, GRAPH_OPTIONS, ScopeData } from './emission-overview-graph.service';

import styles from './emission-overview-graph.module.scss';

export interface EmissionOverviewGraphProps {
  sectorAverageData?: ScopeData[];
  hasError: boolean;
  isLoading: boolean;
}

const EmissionOverviewGraph = ({ sectorAverageData, hasError, isLoading }: EmissionOverviewGraphProps) => {
  const graphData = !!sectorAverageData ? convertChartData(sectorAverageData) : undefined;

  return (
    <div className={styles['graph']}>
      <div className={styles['graph__container']}>
        {hasError && !graphData && (
          <div className={styles['message']}>
            <span className={styles['message__error']}>Something went wrong.</span> <br />
            Failed to get sector, country. Please try again later.
          </div>
        )}
        {isLoading && <div className={styles['message']}>Loading...</div>}
        {!isLoading && graphData && <Bar data={graphData} options={GRAPH_OPTIONS} />}
      </div>
    </div>
  );
};

export default EmissionOverviewGraph;
