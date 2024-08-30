import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/error404/error404.component';

const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./components/course/course.module').then(m => m.CourseModule)
  },
  {
    path: 'instances',
    loadChildren: () => import('./components/instance/instance.module').then(m => m.InstanceModule)
  },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
