import { ChangeDetectionStrategy, Component, OnInit, EventEmitter } from '@angular/core';
import { PqvCommonSharedModule } from 'src/app/shared/common-shared.module';
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
  
  public segment: EventEmitter<string> = new EventEmitter();
  
  constructor() { }
  
  ngOnInit(): void {
  }
  segmentUpdate(value:string){
    this.segment.emit(value);
  }
}
