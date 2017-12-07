import { Routes, RouterModule } from '@angular/router';

import {profileComponent} from "./profile/profile.component";
import {ProjectPageComponent} from "./createProject/projectPage.component";
import {SuccesRegistrationComponent} from "./succesfulRegistration/succesRegistration.component";
import {ViewProjectComponent} from "./ViewProjectComponent/viewProject.component";
import {ProjectListComponent} from "./ViewProjectList/projectList.component";
import {SearcheResultComponent} from "./SearcheResult/searcheResult.component";
import {PayProjectComponent} from "./ViewProjectComponent/PayProject/payProject.component";

const appRoutes: Routes = [
  {path:'succesRegistration',component: SuccesRegistrationComponent},
  {path: 'project', component: ProjectPageComponent},
  {path: 'profile', component: profileComponent},
  {path: 'transferMoney', component: PayProjectComponent},
  {path: 'view/project/:idproject', component: ViewProjectComponent},
  {path: 'searcheResults/:request', component: SearcheResultComponent},
  {path: '', component: ProjectListComponent},
  { path: '**', redirectTo: '/' }
];

export const appRouting: any[]=[];

export const routing = RouterModule.forRoot(appRoutes) ;
