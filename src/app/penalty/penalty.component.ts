import { Component, OnInit } from '@angular/core';
import { PenaltyService } from '../features/services/penalty.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-penalty',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './penalty.component.html',
  styleUrls: ['./penalty.component.scss']
})
export class PenaltyComponent implements OnInit {
  loanTransactionId: string = '';
  penaltyAmount: number = 0;
  days : number=0;

  constructor(private penaltyService: PenaltyService) {}

  ngOnInit(): void {}

  calculatePenalty(): void {
    if (this.loanTransactionId) {
      this.penaltyService.calculatePenalty(this.loanTransactionId).subscribe(
        (amount: number) => {
          this.penaltyAmount = amount;
          this.days = amount;
        },
        (error) => {
          console.error('Error calculating penalty:', error);
          // Hata durumunda kullanıcıya bilgi göstermek için gerekli adımları ekleyebilirsiniz
        }
      );
    } else {
      console.error('Loan transaction ID is required.');
      // Kullanıcıya uygun bir hata mesajı göstermek için gerekli adımları ekleyebilirsiniz
    }
  }
}






 


