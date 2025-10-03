import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.page.html',
  styleUrls: ['./student-detail.page.scss'],
})
export class StudentDetailPage implements OnInit {
  student: any;
  selectedTab: string = 'profile';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // TODO: fetch student details by ID from service
    this.student = {
      id,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      parent: 'Parent Name',
      status: 'Active',
      user_img: '',
      subjects: [
        { subject: 'Math', teacher: 'Mr. A', fees: 200 },
        { subject: 'Science', teacher: 'Mrs. B', fees: 250 }
      ],
      billingHistory: [
        { invoiceNo: 'INV001', date: '2025-09-01', amount: 200 },
        { invoiceNo: 'INV002', date: '2025-09-15', amount: 250 }
      ]
    };
  }

  editStudent() {
    console.log('Edit student clicked');
    // open modal reuse AddStudentModalComponent
  }

  openAssignSubject() {
    console.log('Open assign subject modal');
    // reuse AssignSubjectModalComponent
  }

  removeSubject(sub: any) {
    this.student.subjects = this.student.subjects.filter((s: any) => s !== sub);
  }

  generateBill() {
    console.log('Generate bill for', this.student);
    // later: backend integration
  }

  generateInvoice() {
    console.log('Generate invoice for', this.student);
    // later: backend integration
  }

  viewInvoice(bill: any) {
    console.log('View invoice', bill);
    // open pdf or detail modal
  }
}
