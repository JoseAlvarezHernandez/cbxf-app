import { Component, OnInit } from '@angular/core'
import { Validators, FormBuilder, FormGroup } from '@angular/forms'

import { StudentService } from './students.service'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./students.component.scss'],
})

@Component({
  providers: [StudentService, FormBuilder]
})
export class StudentComponent implements OnInit {
  private student: FormGroup

  constructor(private studentService: StudentService, private formBuilder: FormBuilder) {
    this.student = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      birthDay: ['', Validators.required]
    })
  }

  ngOnInit() { }

  public submit(event: any) {
    event.preventDefault()
    event.stopPropagation()
    console.log(this.student)
  }
}
