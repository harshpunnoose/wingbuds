import { ActionSheetController, ModalController } from '@ionic/angular';
import { AddSubjectModelComponent } from './add-subject-model/add-subject-model.component';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SubjectInfo, SubjectInfoPagination } from 'src/app/common/models/subject-info';
import { UiService } from 'src/app/common/services/ui.service';
import { SubjectsService } from './data/subjects.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
})
export class SubjectsPage implements OnDestroy {

  filteredSubjects: any[] = [];
  searchText: string = '';
  sortField: string = 'first_name'; // default sort
  unsubscribe$ = new Subject<void>();
  subjectInfo: SubjectInfo[] = [];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private router: Router,
    private subjectsService: SubjectsService,
    private uiService: UiService,
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ionViewWillEnter() {
    this.getSubjectList();
  }

  getSubjectList(): void {
    this.uiService.showLoading();
    this.subjectsService.getSubjectList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: SubjectInfoPagination) => {
        this.uiService.hideLoading();
        const subjectListData: SubjectInfo[] = data?.data?.data;
        this.subjectInfo = subjectListData;
        this.filteredSubjects = [...(subjectListData || [])];
        this.sortSubjects();
      });
  }

  filterSubjects(): void {
    const text = this.searchText.toLowerCase();
    let subjects = this.subjectInfo || [];

    if (text) {
      subjects = subjects.filter(subject =>
        subject?.name?.toLowerCase().includes(text)
      );
    }

    this.filteredSubjects = [...subjects];
    this.sortSubjects();
  }

  sortSubjects(): void {
    if (!this.filteredSubjects) return;

    this.filteredSubjects.sort((a, b) => {
      const fieldA = (a?.[this.sortField] ?? '').toString().toLowerCase();
      const fieldB = (b?.[this.sortField] ?? '').toString().toLowerCase();

      if (fieldA < fieldB) return -1;
      if (fieldA > fieldB) return 1;
      return 0;
    });
  }

  async openSortOptions() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Sort by',
      buttons: [
        {
          text: 'Subject',
          handler: () => {
            this.sortField = 'name';
            this.sortSubjects();
          }
        },
        {
          text: 'Code',
          handler: () => {
            this.sortField = 'code';
            this.sortSubjects();
          }
        },
        {
          text: 'Status',
          handler: () => {
            this.sortField = 'status';
            this.sortSubjects();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        }
      ]
    });

    await actionSheet.present();
  }

  async openAddSubjectModal() {
    const modal = await this.modalCtrl.create({
      component: AddSubjectModelComponent
    });

    modal.onDidDismiss().then(result => {
      if (result.data) {
        this.getSubjectList();
      }
    });

    return await modal.present();
  }

  openSubjectDetail(subject: any) {
    this.router.navigate(['/subject', subject?.id]);
  }

}
