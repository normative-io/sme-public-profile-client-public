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

export type NumberFormatter = (n: number) => string;

/**
 * @param sigfigs: Maximum number of significant figures to display.
 * @param smallestStep: Base precision, e.g., if we have values in kg and want to display at precision
 *      of 1 tonne (or less), set this to 1000
 */
export const makeNumberFormatter = (sigfigs: number, smallestStep = 1): NumberFormatter => {
  const fmt = Intl.NumberFormat('en', {
    notation: 'standard',
    maximumSignificantDigits: sigfigs,
    maximumFractionDigits: 0,
  });
  // TODO: Is there a better way of getting the format we want?
  // U+A0 is non-breaking space.
  return (n) => fmt.format(Math.round(n / smallestStep) * smallestStep).replaceAll(',', '\u00A0');
};
