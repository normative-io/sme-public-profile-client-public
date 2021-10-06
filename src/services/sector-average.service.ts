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

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import env from '@beam-australia/react-env';

import type { ScopeData } from 'components';

import { ISO_COUNTRIES, SMECH_COUNTRY_NAME_TO_ALPHA2, SMECH_NACE_MAPPING, SECTOR_LIST } from 'sector-constants';
import type { IsoCountryInfo, NaceInfo } from 'sector-constants';

export interface UrlQueryParams {
  [key: string]: string | string[] | undefined;
}

export interface ProfileData {
  id: string;
  sectorNace: string;
  sectorName: string;
  countryIsoAlpha2: string;
  countryIsoName: string;
}

const SECTOR_AVERAGE_DATA_API = env('SECTOR_AVERAGE_SERVICE_PROTO_DOMAIN') ?? '';

const DEFAULT_PARAMETERS = {
  id: '',
  sector_nace: '69', // "Other"
  country_iso_alpha2: 'GB', // United Kingdom
} as const;

const DEFAULT_COUNTRY_INFO =
  ISO_COUNTRIES.find((v) => v.iso_alpha2 === DEFAULT_PARAMETERS.country_iso_alpha2) ?? ISO_COUNTRIES[0];
const DEFAULT_SECTOR_INFO = SECTOR_LIST.find((v) => v.nace === DEFAULT_PARAMETERS.sector_nace) ?? SECTOR_LIST[0];

const getIdOrDefault = (params: UrlQueryParams): string =>
  typeof params?.id === 'string' && params.id ? params.id : DEFAULT_PARAMETERS.id;

const getCountryInfoOrDefault = (params: UrlQueryParams): IsoCountryInfo => {
  // Param 'region' can be either a country name as listed on the SME Climate Hub site,
  // or a valid ISO alpha-2 country code.
  const region = typeof params?.region === 'string' ? params.region : undefined;
  const alpha2 = region ? SMECH_COUNTRY_NAME_TO_ALPHA2[region] || region.toUpperCase() : undefined;
  const info = alpha2 ? ISO_COUNTRIES.find((v) => v.iso_alpha2 === alpha2) : undefined;
  return info ?? DEFAULT_COUNTRY_INFO;
};

const getSectorInfoOrDefault = (params: UrlQueryParams): NaceInfo => {
  // Use query parameter 'bccnace' if present and non-empty, otherwise try to use 'isic' parameter.
  // 'bccnace' is the NACE code from Business Carbon Calculator, and can be used directly (BCC and this code should be kept in sync)
  // 'isic' is the code from SME Climate Hub, and needs to go through a code mapping to turn it into a NACE we can use.
  // Note that neither of these are "full" NACE codes; BCC codes are a subset of NACE codes (a subset for which we have data)
  const smechCode = typeof params?.isic === 'string' ? params.isic : undefined;
  const bccCode = typeof params?.bccnace === 'string' ? params.bccnace : undefined;
  const nace = bccCode || (smechCode && SMECH_NACE_MAPPING[smechCode]);
  const info = nace ? SECTOR_LIST.find((v: NaceInfo) => v.nace === nace) : undefined;
  return info ?? DEFAULT_SECTOR_INFO;
};

export const getProfileData = (urlQueryParams: UrlQueryParams): ProfileData => {
  const id = getIdOrDefault(urlQueryParams);
  const { iso_alpha2: countryIsoAlpha2, iso_name: countryIsoName } = getCountryInfoOrDefault(urlQueryParams);
  const { name: sectorName, nace: sectorNace } = getSectorInfoOrDefault(urlQueryParams);
  return { id, sectorNace, sectorName, countryIsoAlpha2, countryIsoName };
};

export interface SelectorList {
  value: string;
}

export const getCountryNames = (): SelectorList[] =>
  ISO_COUNTRIES.map((country: IsoCountryInfo) => ({ value: country.iso_name } as SelectorList));

export const getSectorNames = (): SelectorList[] =>
  SECTOR_LIST.map((nace: NaceInfo) => ({ value: nace.name } as SelectorList));

export const getUpdatedProfileDataByCountry = (countryIsoName: string, profileData: ProfileData): ProfileData => {
  const info = ISO_COUNTRIES.find((v) => v.iso_name === countryIsoName) ?? DEFAULT_COUNTRY_INFO;
  return {
    ...profileData,
    countryIsoAlpha2: info.iso_alpha2,
    countryIsoName: info.iso_name,
  };
};

export const getUpdatedProfileDataByIndustry = (sectorName: string, profileData: ProfileData): ProfileData => {
  const info = SECTOR_LIST.find((v) => v.name === sectorName) ?? DEFAULT_SECTOR_INFO;
  return {
    ...profileData,
    sectorName: info.name,
    sectorNace: info.nace,
  };
};

export const isProfileDataValid = (profileData: ProfileData): boolean =>
  !!(profileData?.countryIsoAlpha2 && profileData?.sectorNace);

export async function fetchSectorAverageData(sectorNace: string, countryIsoAlpha2: string): Promise<ScopeData[]> {
  const url = `${SECTOR_AVERAGE_DATA_API}/api/sector/v2`;
  const config: AxiosRequestConfig = {
    params: { isic: encodeURIComponent(sectorNace), country: encodeURIComponent(countryIsoAlpha2) },
    validateStatus: (status: number) => status >= 200 && status < 300,
  };

  try {
    const { data }: AxiosResponse = await axios.get<ScopeData[]>(url, config);

    return data.scopes;
  } catch (error) {
    throw new Error(`network error talking to sector average service: ${error}`);
  }
}

export const computeTotalEmissions = (sectorAverageData: ScopeData[] | undefined): number | undefined => {
  if (!sectorAverageData) return undefined;

  return sectorAverageData.reduce((accum: number, scopeData: ScopeData) => {
    const scopeTotal = scopeData.categories.reduce((accum, category) => category.value + accum, 0);

    return scopeTotal + accum;
  }, 0);
};
