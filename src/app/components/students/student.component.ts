import { Component, OnInit, Input } from '@angular/core'

import { StudentService } from './students.service'
import { ToastController } from '@ionic/angular'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./students.component.scss'],
})

@Component({
  providers: [StudentService]
})
export class StudentComponent implements OnInit {
  private student: any = {}
  private errors: any = {}
  private id: any

  constructor(private studentService: StudentService, private toastController: ToastController, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(param => {
      this.id = param.id

      this.loadStudent()
    })
  }

  ngOnInit() { }

  private validateName(event: any) {
    if (event.data && !event.data.match(/^[a-zA-Z\s]*$/)) {
      event.srcElement.value = event.target.value.slice(0, -1)
    }
  }

  private loadStudent() {
    this.studentService.getStudent(this.id).subscribe((success: any) => {
      console.log(success.student)
      this.student = success.student
    }, error => {
      this.router.navigate(['/'])
    })
  }

  private async sendToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    })
    toast.present()
  }

  onChange(event: any) {
    this.student[event.target.name] = event.target.value
    if (this.errors[event.target.name])
      delete this.errors[event.target.name]
  }

  public submit() {
    if (this.id) {
      this.studentService.updateStudent(this.id, this.student).subscribe((success: any) => {
        this.sendToast('El estudiante ha sido actualizado')
        setTimeout(() => {
          this.router.navigate(['/'])
        }, 2000)
      }, error => {
        this.errors = error?.error?.errors
      })
    } else {
      this.studentService.createStudent(this.student).subscribe((success: any) => {
        this.sendToast('El estudiante ha sido creado')
        setTimeout(() => {
          this.router.navigate(['/'])
        }, 2000)
      }, error => {
        this.errors = error?.error?.errors
      })
    }
  }
}
