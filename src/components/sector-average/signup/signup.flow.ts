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

export type SignUpStatus = 'initial' | 'requesting' | 'failed' | 'succeeded';

export interface ApiConfig {
  apiProtoDomain: string;
}

// Must match the interfaces defined for the API.
export interface ContactDetails {
  preferredName?: string;
  companyEmail: string;
}

export interface SignUpRequest {
  contact: ContactDetails;
  smechProfileData?: {
    id: string;
    industryId: string;
    regionId: string;
  };
}

export interface FormFields extends ContactDetails {
  ackTerms: boolean;
}

export type FormFieldsErrors = {
  [P in keyof FormFields]?: string;
};

export type StatusUpdateFn = (status: SignUpStatus) => void;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#basic_validation
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const isEmail = (value: string): boolean => EMAIL_REGEX.test(value);
const isComplete = (value: string | boolean): boolean => !!value;

/** Validates contact details return error messages if invalid. */
export function getFormFieldsErrors(details: FormFields): FormFieldsErrors | null {
  let errors: FormFieldsErrors = {};
  const test = (key: keyof FormFields, validator: (value: any) => boolean, message: string) => {
    if (!validator(details[key])) errors = { ...errors, [key]: message };
  };

  test('preferredName', isComplete, 'Please enter a name');
  test('companyEmail', isEmail, 'Please enter a valid email address');
  test('ackTerms', isComplete, 'Please accept the privacy policy');

  return Object.keys(errors).length ? errors : null;
}

/** Calls updateStatus for each status change, and (async)returns the final status. */
export async function signUp(cfg: ApiConfig, updateStatus: StatusUpdateFn, req: SignUpRequest): Promise<SignUpStatus> {
  const endpoint = `${cfg.apiProtoDomain}/api/user/v0/signup`;
  updateStatus('requesting');
  let finalStatus: SignUpStatus;
  try {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(req),
      credentials: 'omit',
      mode: cfg.apiProtoDomain ? 'cors' : 'same-origin',
    });
    finalStatus = resp.ok ? 'succeeded' : 'failed';
  } catch (e) {
    console.log(`fetch failed: ${e}`);
    finalStatus = 'failed';
  }
  updateStatus(finalStatus);
  return finalStatus;
}
