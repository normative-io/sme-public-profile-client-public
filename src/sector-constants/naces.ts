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

// GENERATED FILE. DO NOT EDIT BY HAND.
//
// Generated at 2022-03-14T16:38:07.292012.
// See repository smech-nace-mapping

export interface NaceInfo {
  name: string;
  nace: string;
}

export const SECTOR_LIST: NaceInfo[] = [
  { name: 'Activities auxiliary to financial intermediation', nace: '66' },
  { name: 'Activities of membership organisations', nace: '94' },
  { name: 'Agriculture, Crops not elsewhere classified', nace: '0119' },
  { name: 'Air transport', nace: '51' },
  { name: 'Aluminium production', nace: '2442' },
  { name: 'Basic metals manufacturing', nace: '241' },
  { name: 'Basic plastic manufacturing', nace: '2016' },
  { name: 'Beverage manufacturing', nace: '11' },
  { name: 'Building services', nace: '81' },
  { name: 'Casting of metals', nace: '245' },
  { name: 'Cattle meat processing', nace: '1011' },
  { name: 'Cement, lime and plaster manufacturing', nace: '235' },
  { name: 'Cermaic goods manufacturing', nace: '234' },
  { name: 'Coal and lignite mining and related services', nace: '052' },
  { name: 'Construction and civil engineering', nace: '41' },
  { name: 'Copper production', nace: '2444' },
  { name: 'Creative, arts and entertainment activities', nace: '90' },
  { name: 'Dairy products processing', nace: '1051' },
  { name: 'Education', nace: '85' },
  { name: 'Electrical machinery and apparaturs manufacturing', nace: '27' },
  { name: 'Electricity transmission', nace: '3512' },
  { name: 'Extraction of crude petroleum and natural gas', nace: '06' },
  { name: 'Fertiliser manufacturing', nace: '2015' },
  { name: 'Financial actor, not insurance and pension', nace: '64' },
  { name: 'Fish product manufacturing', nace: '102' },
  { name: 'Fishing and aquaculture', nace: '03' },
  { name: 'Forestry, logging and related service activities', nace: '02' },
  { name: 'Furniture manufacturing', nace: '31' },
  { name: 'Glass and glass products manufacturing', nace: '231' },
  { name: 'Handbags and footwear manufacturing', nace: '151' },
  { name: 'Health and social work', nace: '86' },
  { name: 'Hotels and similar accommodation', nace: '559' },
  { name: 'Information technology (IT), software and computer related activities', nace: '62' },
  { name: 'Insurance and pension funding', nace: '65' },
  { name: 'Land transport', nace: '493' },
  { name: 'Lead, zinc and tin production', nace: '2443' },
  { name: 'Leather products manufacturing', nace: '15' },
  { name: 'Machinery and equipment rental', nace: '773' },
  { name: 'Medical equipment manufacturing', nace: '325' },
  { name: 'Metal ores mining', nace: '07' },
  { name: 'Metal products manufacturing', nace: '25' },
  { name: 'Motor vehicle manufacturing', nace: '29' },
  { name: 'Motor vehicles sale and repair', nace: '45' },
  { name: 'Non-metallic mineral products manufacturing', nace: '23' },
  { name: 'Oil seed agriculture', nace: '0111' },
  { name: 'Optical instruments manufacturing', nace: '267' },
  {
    name: 'Other business activities (consultancy, legal, accounting services, advertising, employment activities)',
    nace: '69',
  },
  { name: 'Other chemicals manufacturing', nace: '205' },
  { name: 'Other machinery manufacturing', nace: '282' },
  { name: 'Other manufacturing', nace: '32' },
  { name: 'Other mining and quarrying', nace: '08' },
  { name: 'Other service activies', nace: '96' },
  { name: 'Other transport equipment manufacturing', nace: '30' },
  { name: 'Paper and paper products manufacturing', nace: '17' },
  { name: 'Pharmaceutical products manufacturing', nace: '21' },
  { name: 'Phone, radio and television manufacturing', nace: '26' },
  { name: 'Plastic and rubber products manufacturing', nace: '22' },
  { name: 'Postal services', nace: '531' },
  { name: 'Poultry meat processing', nace: '1012' },
  { name: 'Public administration and defence; compulsory social security', nace: '84' },
  { name: 'Publishing services', nace: '581' },
  { name: 'Publishing, printing and reproduction of recorded media', nace: '18' },
  { name: 'Pulp manufacturing', nace: '1711' },
  { name: 'Railway transport', nace: '491' },
  { name: 'Real estate activities', nace: '68' },
  { name: 'Repair, household goods', nace: '952' },
  { name: 'Research and development', nace: '72' },
  { name: 'Restaurants', nace: '56' },
  { name: 'Retail and wholesale', nace: '46' },
  { name: 'Rice agriculture', nace: '0112' },
  { name: 'Steam and hot water supply', nace: '353' },
  { name: 'Sugar cane and beet agriculture', nace: '0114' },
  { name: 'Sugar manufacturing', nace: '1081' },
  { name: 'Telecommunication', nace: '61' },
  { name: 'Textile manufacturing', nace: '13' },
  { name: 'Tobacco products manufacturing', nace: '12' },
  { name: 'Vegtable oils and fats processing', nace: '104' },
  { name: 'Vegtables, fruit, nuts agriculture', nace: '0113' },
  { name: 'Video and movie production', nace: '59' },
  { name: 'Warehousing and support activities for transportation', nace: '52' },
  { name: 'Water transport', nace: '50' },
  { name: 'Wearing apparel manufacturing', nace: '14' },
  { name: 'Wood and straw products manufacturing, not furniture', nace: '16' },
];

export type SMECHNaceInfo = { [key: string]: string };

export const SMECH_NACE_MAPPING: SMECHNaceInfo = {
  '01': '0119',
  '02': '02',
  '03': '03',
  '1': '0119',
  '2': '02',
  '20': '205',
  '21': '21',
  '241': '241',
  '3': '03',
  '329': '32',
  '35': '3512',
  '36': '353',
  '41': '41',
  '471': '46',
  '493': '493',
  '5229': '52',
  '55': '559',
  '5510': '559',
  '56': '56',
  '58': '18',
  '60': '18',
  '61': '61',
  '6209': '62',
  '64': '64',
  '642': '69',
  '65': '65',
  '68': '68',
  '6910': '69',
  '6920': '69',
  '7022': '69',
  '72': '72',
  '73': '69',
  '79': '52',
  '900': '90',
  '9003': '90',
  '94': '94',
};
