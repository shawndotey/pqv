import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PqvCommonSharedModule } from 'src/app/shared/common-shared.module';
import { PqvDataService } from './data/data.service';
import { PqvDetailsComponent } from './details/details.component';
import { PqvSummaryComponent } from './summary/summary.component';

@Component({
  selector: 'pqv-phil-qualified',
  standalone: true,
  imports: [PqvCommonSharedModule, PqvSummaryComponent, PqvDetailsComponent],
  templateUrl: './phil-qualified.component.html',
  styleUrls: ['./phil-qualified.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PqvPhilQualifiedComponent implements OnInit {

  constructor(dataService:PqvDataService) { }

  ngOnInit(): void {
  }

}
