import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule, FormBuilder } from '@angular/forms'

import { StudentsComponent } from './students.component'
import { StudentsRoutingModule } from './students.routing'
import { StudentService } from './students.service'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StudentsRoutingModule,
    ],
    providers: [
        FormBuilder,
        StudentService
    ],
    declarations: [StudentsComponent],
    bootstrap: [StudentsComponent]
})
export class StudentModule { }