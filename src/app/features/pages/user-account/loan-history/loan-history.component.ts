import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoanTransactionService } from '../../../services/loan-transaction.service';
import { AuthService } from '../../../../core/services/Auth.service';
import { MemberService } from '../../../services/member.service';
import { BookService } from '../../../services/book.service';
import { LoanTransaction } from '../../../models/loanTransaction';
import { Response } from '../../../models/response';
import { LoanGetById } from '../../../models/LoanGetById';
import { ResponseModel } from '../../../models/responseModel';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReturnLoanBook } from '../../../models/returnLoanBook';


@Component({
  selector: 'app-loan-history',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule,FormsModule],
  templateUrl: './loan-history.component.html',
  styleUrl: './loan-history.component.scss'
})
export class LoanHistoryComponent implements OnInit {
  constructor(private loanService: LoanTransactionService,
    private authService: AuthService,
    private memberService: MemberService,
    private bookService: BookService,
  private formBuilder:FormBuilder) { }

  memberId = this.authService.loggedInMember?.id;
  loanList: LoanTransaction[] = [];
  findLoanId!: string;
  findLoanIdArray: string[] = [];
  myResponse:LoanTransaction[]=[];
  myResponseBorrowed:LoanTransaction[]=[];
  member!:string[];
  book!:string[];
  
  

  ngOnInit(): void {

    this.getLoans();
    
  }
  getLoans() {
    this.loanService.getAll().subscribe({
      next: (response: ResponseModel<LoanTransaction>) => {
        console.log('backendden cevap geldi:', response);
        this.loanList = response.items;
        console.log("GetLoans List:", this.loanList);
        this.filterLoansForMember();
      },
      error: (error) => {
        console.log('backendden hatalı cevap geldi.', error);
      },
      complete: () => {
        console.log('backend isteği sonlandı.');
      }
    });
  }
  filterLoansForMember() {//ilgili kullanıcının ödünç işl
    for (let loan of this.loanList) {
      if (loan.memberId === this.memberId) {
        this.myResponse.push(loan);
        if (loan.returnStatus == 3) {
          console.log("Status:", loan.returnStatus);//ReturnStatus'ü 3 olanları yani ödünç alınmışları console bastık
          //Sonra bunları sayfada göster=>Kitapı iade edince returnStatus değişicek ve 3 olmayanlar artık gözükmeyecek
          this.myResponseBorrowed.push(loan);
         
        }
      }
    }
  }

  bookReturn(item: any): void {
    const formData: ReturnLoanBook = {
      id: item.id, 
      bookId: item.bookId, 
      memberId: this.authService.loggedInMember ? this.authService.loggedInMember.id : '', 
      returnStatus: 2
    };
    this.loanService.bookReturn(formData).subscribe((response) => {
      console.log("response", response);
      alert("Kitap iade edildi");
      const returnDate = new Date(); // Assuming return date is current date
    const dueDate = new Date(item.dueDate); // Assuming you have due date in your loan object
    const dateDifference = Math.ceil((returnDate.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));
    const penalty = dateDifference * 1; // Assuming penalty is 1 unit per day overdue

    console.log("Penalty:", penalty);
      this.myResponseBorrowed = this.myResponseBorrowed.filter(loan => loan.id !== item.id);
    });
  }
  getReturnTimeMessage(returnTime:Date):string{
    const currentTime=new Date().toLocaleString();
    const myReturnTime=new Date(returnTime).toLocaleString();
    console.log("Şimdiki zaman:",currentTime,"İade Tarihi:",myReturnTime);
    if(currentTime>myReturnTime){
      const message:string="İade süresi geçmiş"
      return message;
      
    }
    else if(currentTime<myReturnTime){
      const message:string="İade süresi henüz dolmamış"
      return message;
    }
    else {
      const message:string="İade süresi bugün doluyor"
      return message;
    }
   
  }
  
}

    
