import { Component } from '@angular/core';
import { ActionControlService } from '../../services/action-control.service';

@Component({
  selector: 'app-notify-success',
  standalone: true,
  imports: [],
  templateUrl: './notify-success.component.html',
  styleUrl: './notify-success.component.scss',
})
export class NotifySuccessComponent {
  constructor(private actionControlService: ActionControlService) {}

  ngAfterViewInit(): void {
    this.actionControlService.action$.subscribe(({ flag, action }) => {
      if (flag && action === 'notify-success') {
        this.openModal();
      }
    });
  }

  onClose() {
    const popup247 = document.querySelector('.successPop');
    popup247?.classList.add('hide');
  }

  openModal() {
    const popup247 = document.querySelector('.successPop');
    popup247?.classList.remove('hide');
  }
}
