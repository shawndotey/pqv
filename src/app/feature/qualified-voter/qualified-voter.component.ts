import { ChangeDetectionStrategy, Component, OnInit, EventEmitter } from '@angular/core';
import { PqvCommonSharedModule } from 'src/app/shared/common-shared.module';
import { PqvDetailsComponent } from './details/details.component';
import { PqvQualifiedVoterService } from './qualified-voter.service';
import { PqvSummaryComponent } from './summary/summary.component';
import { PqvCategorySumCheckPipe } from './transformations/category-sum-check';
import {default as wardData} from './data/qualified_voter_listing_2018_primary_by_ward copy.json';
import { WARD_DATA } from './data/WARD_DATA';

@Component({
  selector: 'pvq-qualified-voter',
  standalone: true,
  imports: [PqvCommonSharedModule, PqvSummaryComponent, PqvDetailsComponent],
  //even though we use [standalone:true] pipes,
  //a pipe injected into a service still needs to be provided.
  providers:[
    PqvCategorySumCheckPipe,
    PqvQualifiedVoterService,
   { provide: WARD_DATA, useValue: wardData }
  ],
  templateUrl: './qualified-voter.component.html',
  styleUrls: ['./qualified-voter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PqvQualifiedVoterComponent {
  
  public segment: EventEmitter<string> = new EventEmitter();
  
  constructor() { }
  
  //provide segment selected event to details view
  segmentUpdate(value:string){
    this.segment.emit(value);
  }
}
