import { Component, OnDestroy, OnInit } from '@angular/core';
import { BalanceService } from '@shared-lib';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'shell';

  total: number = 0;
  private destroy$ = new Subject<void>();

  constructor(private balanceService: BalanceService) {}

  ngOnInit() {
    this.balanceService.total$
      .pipe(takeUntil(this.destroy$))
      .subscribe((total) => {
        this.total = total;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
