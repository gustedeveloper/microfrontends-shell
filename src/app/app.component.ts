import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BalanceService } from '@shared-lib';
import { Subject, takeUntil } from 'rxjs';
import { TransferData } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'shell';

  private transferListener!: EventListener;

  total: number = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private balanceService: BalanceService,
    private snackBar: MatSnackBar,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.balanceService.total$
      .pipe(takeUntil(this.destroy$))
      .subscribe((total) => {
        this.total = total;
      });

    this.transferListener = (event: Event) => {
      const customEvent = event as CustomEvent<TransferData>;

      this.ngZone.run(() => {
        this.showSnackBar(customEvent.detail);
      });
    };

    window.addEventListener('transferConfirmed', this.transferListener);
  }

  showSnackBar(data: TransferData) {
    this.snackBar.open(
      `✅ Transferencia confirmada: ${data.concept}`,
      'Cerrar',
      {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar'],
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    window.removeEventListener('transferConfirmed', this.transferListener);
  }
}
