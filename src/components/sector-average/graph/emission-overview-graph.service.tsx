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

import type { ChartData, ChartOptions } from 'chart.js';

import { NumberFormatter, makeNumberFormatter } from 'lib/number-format';

export const BAR_THICKNESS = 180;
export const BAR_COLORS = ['#e5e5e5', '#ccc', '#b3b3b3', '#999', '#808080', '#666', '#4d4d4d', '#333', '#00000'];
export const BAR_HOVER_COLOR = '#ff9178';

export interface CategoryData {
  category: string;
  value: number; // in units of kg CO2-e
}

export interface ScopeData {
  scope: string;
  categories: CategoryData[];
}

const getCategoryLabel = (category: string): string => category.charAt(0).toUpperCase() + category.slice(1);
const getColorIndex = (dataLength: number, index: number): number => Math.max(2, dataLength) - index - 1;

export const convertChartData = (sectorAverageData: ScopeData[] | undefined): ChartData<'bar'> => {
  const chartData: ChartData<'bar'> = {
    labels: ['Scope 1', 'Scope 2', 'Scope 3'],
    datasets: [],
  };

  if (!sectorAverageData) return chartData;

  sectorAverageData
    .sort((s1, s2) => (s1.scope > s2.scope ? 1 : -1))
    .forEach((item, index) => {
      sectorAverageData[index].categories
        .sort((c1, c2) => c2.value - c1.value)
        .forEach((cat, categoryIndex) => {
          const categoryData = [0, 0, 0];
          categoryData[index] = cat.value / 1000.0; // Convert kg -> tonnes.

          chartData.datasets.push({
            label: getCategoryLabel(cat.category),
            data: categoryData,
            hoverBackgroundColor: BAR_HOVER_COLOR,
            barThickness: BAR_THICKNESS,
            backgroundColor: BAR_COLORS[getColorIndex(sectorAverageData[index].categories.length, categoryIndex)],
          });
        });
    });

  return chartData;
};

const formatEmissions: NumberFormatter = makeNumberFormatter(3, 1);

export const GRAPH_OPTIONS: ChartOptions<'bar'> = {
  maintainAspectRatio: true,
  aspectRatio: 1.5,
  layout: {
    padding: 18,
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Your industry’s average emissions, broken down by scope (tonnes CO₂e)',
      position: 'top',
      align: 'start',
      color: '#000',
      padding: {
        bottom: 40,
        top: 10,
      },
      font: {
        family: 'Zichtbaar',
        size: 20,
        weight: '600',
      },
    },
    tooltip: {
      enabled: true,
      intersect: true,
      position: 'nearest',
      filter: function (tooltipItem) {
        // Hide tooltip for categories with 0-value.
        return tooltipItem.formattedValue != '0';
      },
      callbacks: {
        title: () => '',
        label: (tooltipItem) => {
          // See chartjs example:
          // https://www.chartjs.org/docs/3.5.1/configuration/tooltip.html#label-callback
          let label = tooltipItem.dataset.label || '';
          if (label) {
            label += ': ';
          }
          label += formatEmissions(tooltipItem.parsed.y ?? 0);
          return label;
        },
      },
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#9FA1A7',
      padding: {
        left: 8,
        right: 8,
        top: 8,
        bottom: 8,
      },
      cornerRadius: 0,
      bodyColor: '#000',
      bodyFont: {
        family: 'Zichtbaar',
        size: 14,
        lineHeight: 1.5,
        weight: '600',
      },
      caretSize: 0,
      displayColors: false,
      xAlign: 'left',
      yAlign: 'top',
      mode: 'point',
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        align: 'end',
        padding: 8,
        color: '#000',
        font: {
          size: 16,
          weight: 'normal',
        },
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        // Format y-axis ticks to abbreviate numbers higher than 1000.
        callback: (value: any) => {
          return value < 1000 ? value : value / 1000 + 'k';
        },
        padding: 0,
        maxTicksLimit: 3,
        color: '#000',
        font: {
          size: 16,
          weight: 'normal',
        },
      },
    },
  },
};
