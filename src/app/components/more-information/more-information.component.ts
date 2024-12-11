import { Component } from '@angular/core';
import { ScheduleVisitComponent } from '../schedule-visit/schedule-visit.component';
@Component({
  selector: 'app-more-information',
  standalone: true,
  imports: [ScheduleVisitComponent],
  templateUrl: './more-information.component.html',
  styleUrl: './more-information.component.scss'
})
export class MoreInformationComponent {

}
