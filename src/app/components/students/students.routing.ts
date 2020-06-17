import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentsComponent } from './students.component';
import { StudentComponent } from './student.component'

const routes: Routes = [
    { path: '', component: StudentsComponent },
    { path: 'modify/:id', component: StudentComponent },
    { path: 'addStudent', component: StudentComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentsRoutingModule { }