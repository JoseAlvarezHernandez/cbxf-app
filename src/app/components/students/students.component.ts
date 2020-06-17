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
  public studentsCopy: any[] = []
  public searchQuery: string = ''
  private male: boolean = true
  private female: boolean = true
  private ageCriteria: number

  constructor(private studentService: StudentService, private alertController: AlertController, private toastController: ToastController) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.initializeItems()
  }

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
          if (result.students) {
            this.students = result.students
            this.studentsCopy = this.students
          } else
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

  public getItems(ev: any, isCheckBox: boolean) {
    this.students = this.studentsCopy
    const value = ev?.target?.value

    this.students = this.students.filter((item) => {
      let isReturn = false
      if ((this.male && item.gender.toLowerCase().indexOf('hombre') > -1) || (this.female && item.gender.toLowerCase().indexOf('mujer') > -1)) {
        isReturn = true
      }

      if (isReturn && !isCheckBox && value && value.trim() !== '') {
        if (item.name.toLowerCase().indexOf(value.toLowerCase()) > -1 || item.age == value) {
          isReturn = true
        } else {
          isReturn = false
        }
      }

      return isReturn
    })
    /*
    if (isCheckBox && typeof ev !== 'undefined') {
      const val = ev.target.value;
      this.students = this.studentsCopy
      if (val && val.trim() != '') {
        this.students = this.students.filter((item) => {
          console.log(item.age)
          console.log(val)
          console.log(item.age.toString() == val.toString())
          return item.age == val
        })
      }
        
    } else if (isCheckBox) {
      this.students = this.studentsCopy
      this.students = this.students.filter((item) => {
        return (this.male && item.gender.toLowerCase().indexOf('hombre') > -1) || (this.female && item.gender.toLowerCase().indexOf('mujer') > -1)
      })
    } else {
      const val = ev.target.value;
      if (val && val.trim() != '') {
        this.students = this.students.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1)
        })
      } else
        this.students = this.studentsCopy
    }
    */
  }

  searchCancel() {
    this.initializeItems()
    this.searchQuery = ''
  }

  public doRefresh() {
    this.initializeItems()
  }
}
