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

import Button from './button/button.component';
import Header from './header/header.component';
import Footer from './footer/footer.component';
import TextInput from './text-input/text-input.component';
import TooltipComponent from './tooltip/tooltip.component';

import WelcomeComponent from './sector-average/welcome/welcome.component';
import EmissionOverviewGraph from './sector-average/graph/emission-overview-graph.component';
import Signup from './sector-average/signup/signup.component';
import TotalEmissionComponent from './sector-average/total-emission/total-emission.component';
import ScopeDefinitionComponent from './sector-average/scope-definition/scope-definition.component';
import ExiobaseComponent from './sector-average/exiobase/exiobase.component';
import SelectorComponent from './sector-average/selector/selector.componet';

import type { ScopeData } from './sector-average/graph/emission-overview-graph.service';

export {
  Button,
  Header,
  Footer,
  TextInput,
  WelcomeComponent,
  EmissionOverviewGraph,
  TotalEmissionComponent,
  ScopeDefinitionComponent,
  Signup,
  ExiobaseComponent,
  TooltipComponent,
  SelectorComponent,
};

export type { ScopeData };
