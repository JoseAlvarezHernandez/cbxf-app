import { Component, OnInit } from '@angular/core'
import { AlertController, ToastController } from '@ionic/angular'

import { StudentService } from './students.service'

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})

@Component({
  providers: [StudentService]
})
export class StudentsComponent implements OnInit {
  public students: any[] = []
  public searchQuery: string = ''

  constructor(private studentService: StudentService, private alertController: AlertController, private toastController: ToastController) {
    this.initializeItems()
  }

  ngOnInit() { }

  public async delete(student: any) {
    const alert = await this.alertController.create({
      header: 'Eliminar estudiante',
      message: `¿Estas seguro de eliminar a ${student.name}?`,
      buttons: [{
        text: 'Sí',
        handler: async () => {
          try {
            this.studentService.deleteStudent(student._id).subscribe(async success => {
              this.sendToast(`Haz eliminado correctamente a ${student.name}`)
              this.initializeItems()
            }, async error => {
              this.sendToast(`Ocurrió un error al elimnar a ${student.name}`)
            })
          } catch (err) {
            this.sendToast(`Ocurrió un error al elimnar a ${student.name}`)
          }
        }
      }, 'No']
    })

    await alert.present();
  }

  private async sendToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    })
    toast.present()
  }

  private initializeItems() {
    try {
      this.studentService.getAllStudents().subscribe(
        (result: any) => {
          if (result.students)
            this.students = result.students
          else
            this.students = []
        },
        error => {
          this.students = []
        }
      )
    } catch (err) {
      console.log(err)
    }
  }

  public getItems(ev: any) {
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.students = this.students.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else
      this.initializeItems()
  }

  searchCancel() {
    this.initializeItems()
    this.searchQuery = ''
  }

  public doRefresh() {
    this.initializeItems()
  }
}
