import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { TechnologyComponent } from './technology/technology.component';
import { PlanComponent } from './plan/plan.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AddTechnologyComponent } from './technology/add-technology/add-technology.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { AddPlanComponent } from './plan/add-plan/add-plan.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouteGuard } from './shared/route-guards/route.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EnrolmentComponent } from './enrolment/enrolment.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { TrainedEmployeeComponent } from './trained-employee/trained-employee.component';
import { AddAttendanceComponent } from './attendance/add-attendance/add-attendance.component';
import { AddTrainedEmployeeComponent } from './trained-employee/add-trained-employee/add-trained-employee.component';
import { AddFeedbackComponent } from './plan/add-feedback/add-feedback.component';
import { ViewAttendanceComponent } from './attendance/view-attendance/view-attendance.component';
import { ViewEmployeeAttendanceComponent } from './attendance/view-employee-attendance/view-employee-attendance.component';

const childRoutes: Routes = [
{path:'employee', component:EmployeeComponent},
{path:'employee/add', component:AddEmployeeComponent},
{path:'employee/edit/:id', component:AddEmployeeComponent},
{path:'', component:EnrolmentComponent},

{path:'technology', component:TechnologyComponent},
{path:'technology/add', component:AddTechnologyComponent},
{path:'technology/edit/:id', component:AddTechnologyComponent},

{path:'plan', component:PlanComponent},
{path:'plan/add', component:AddPlanComponent},
{path:'plan/edit/:id', component:AddPlanComponent},

{path:'attendance', component:AttendanceComponent},
{path:'attendance/add/:id', component:AddAttendanceComponent},
{path:'attendance/view/:id/edit/:id2', component:AddAttendanceComponent},
{path:'attendance/view/:id', component:ViewAttendanceComponent},
{path:'attendance/employee/view', component:ViewEmployeeAttendanceComponent},

{path:'trained-employee', component:TrainedEmployeeComponent},
{path:'trained-employee/add', component:AddTrainedEmployeeComponent},
{path:'trained-employee/edit/:id', component:AddTrainedEmployeeComponent},
// {path:'trained-employee/add-feedback-rating/:id', component:AddTrainedEmployeeComponent},

{path:'add-feedback-rating/:id', component:AddFeedbackComponent},
];

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: DashboardComponent, children:childRoutes, canActivate: [RouteGuard]}
] 

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeeComponent,
    TechnologyComponent,
    PlanComponent,
    HeaderComponent,
    AddTechnologyComponent,
    AddEmployeeComponent,
    AddPlanComponent,
    LoginComponent,
    RegisterComponent,
    EnrolmentComponent,
    AttendanceComponent,
    TrainedEmployeeComponent,
    AddAttendanceComponent,
    AddTrainedEmployeeComponent,
    AddFeedbackComponent,
    ViewAttendanceComponent,
    ViewEmployeeAttendanceComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    HttpClient,
    RouteGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
