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

import type { NextPage } from 'next';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import IndustryIcon from '@normative/theme/src/assets/icon/capital.svg';
import LocatorIcon from '@normative/theme/src/assets/icon/position.svg';

import {
  WelcomeComponent,
  EmissionOverviewGraph,
  TotalEmissionComponent,
  ScopeDefinitionComponent,
  Signup,
  ExiobaseComponent,
  SelectorComponent,
} from 'components';
import type { ScopeData } from 'components';

import {
  computeTotalEmissions,
  getProfileData,
  fetchSectorAverageData,
  isProfileDataValid,
  getCountryNames,
  getUpdatedProfileDataByCountry,
  getUpdatedProfileDataByIndustry,
  getSectorNames,
} from 'services';
import type { ProfileData } from 'services';

import styles from './sector-average.module.scss';

const DEFAULT_PROFILE_DATA: ProfileData = {
  id: '',
  sectorName: '',
  sectorNace: '',
  countryIsoAlpha2: '',
  countryIsoName: '',
};

const SectorAverage: NextPage = () => {
  const router: NextRouter = useRouter();
  const [profileData, setProfileData] = useState<ProfileData>(DEFAULT_PROFILE_DATA);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sectorAverageData, setSectorAverageData] = useState<ScopeData[]>();

  useEffect(() => {
    if (window && router?.isReady) {
      const profileData: ProfileData = getProfileData(router.query);

      setProfileData({ ...profileData });
      // TODO remove after refactoring signup
      sessionStorage.setItem('profileData', JSON.stringify(profileData));
    }
  }, [router]);

  useEffect(() => {
    if (!profileData || !isProfileDataValid(profileData)) {
      setIsLoading(false);
      setHasError(true);
    } else {
      (async () => {
        setHasError(false);
        setIsLoading(true);

        const sectorAverageData = await fetchSectorAverageData(profileData.sectorNace, profileData.countryIsoAlpha2);

        setIsLoading(false);
        setHasError(!sectorAverageData);
        setSectorAverageData(sectorAverageData);
      })();
    }
  }, [profileData]);

  const updateCountry = (country: string) => {
    const newProfileData: ProfileData = getUpdatedProfileDataByCountry(country, profileData);

    setProfileData(newProfileData);
    sessionStorage.setItem('profileData', JSON.stringify(newProfileData));
  };

  const updateIndustry = (industry: string) => {
    const newProfileData: ProfileData = getUpdatedProfileDataByIndustry(industry, profileData);

    setProfileData(newProfileData);
    sessionStorage.setItem('profileData', JSON.stringify(newProfileData));
  };

  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta name='robots' content='noindex, follow' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='description'
          content='Estimated average GHG emissions produced by similar companies in your
        sector and country. These insights help you benchmark your company’s emissions'
        />
        <title>Industry CO2 Insights | Normative</title>
        <link rel='apple-touch-icon' sizes='180x180' href='favicon/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='favicon/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='favicon/favicon-16x16.png' />
        <link rel='manifest' href='favicon/site.webmanifest'></link>
      </Head>
      <section className={styles['main']}>
        <div className={styles['row_1']}>
          <WelcomeComponent />
          <div className={styles['selectors-wrap']}>
            <SelectorComponent
              icon={<LocatorIcon />}
              items={getCountryNames()}
              selectedOption={profileData?.countryIsoName}
              placeholder='Select country'
              sendValueToParent={updateCountry}
            />
            <SelectorComponent
              icon={<IndustryIcon />}
              items={getSectorNames()}
              selectedOption={profileData?.sectorName}
              placeholder='Select industry'
              sendValueToParent={updateIndustry}
            />
          </div>
        </div>
        <div className={styles['row_2']}>
          <TotalEmissionComponent
            countryIsoName={profileData?.countryIsoName}
            sectorName={profileData?.sectorName}
            totalEmissionsKg={computeTotalEmissions(sectorAverageData)}
          />
          <EmissionOverviewGraph sectorAverageData={sectorAverageData} hasError={hasError} isLoading={isLoading} />
        </div>
        <ExiobaseComponent />
        <div className={styles['row_3']}>
          <ScopeDefinitionComponent />
        </div>
      </section>
      <Signup />
    </>
  );
};

export default SectorAverage;
