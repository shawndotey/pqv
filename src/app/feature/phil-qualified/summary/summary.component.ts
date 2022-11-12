import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PqvDataService } from '../data/data.service';
import { PqvCommonSharedModule } from 'src/app/shared/common-shared.module';
import { Subscription } from 'rxjs';
import { WardRow } from '../data/model/WardRow.interface';
import { PqvTopSegmentPipe } from '../transformations/top-segment.pipe';
import { PqvWardTotalsPipe } from '../transformations/ward-totals.pipe';
import { PqvFieldDescriptionPipe } from '../transformations/field-description.pipe';
import { FormBuilder, FormGroup } from '@angular/forms';
import { wardPrimaryFields } from '../data/model/wardPrimaryFields.model';
import { PqvTotalsBySegmentPipe } from '../transformations/percent-by-segment.pipe';

@Component({
  selector: 'pqv-summary',
  standalone: true,
  imports: [PqvCommonSharedModule, PqvTopSegmentPipe, PqvFieldDescriptionPipe, PqvTotalsBySegmentPipe],
  providers: [PqvTotalsBySegmentPipe, PqvWardTotalsPipe, PqvTopSegmentPipe],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PqvSummaryComponent implements OnInit, OnDestroy {
  public wardDataTable!: WardRow[];
  public $wardDataTable!: Subscription;
  public wardPrimaryFields = wardPrimaryFields;
  public form!: FormGroup ;
  public segmentInfo: {percent:number, count:number} = {percent:0, count:0};
  topSegmentField: {name:string, count:number} = {name:'Unknown', count:0};;
  constructor(
    private dataService: PqvDataService,
    private fb: FormBuilder,
    private wardTotalsPipe: PqvWardTotalsPipe,
    private bySegmentPipe: PqvTotalsBySegmentPipe,
    private topSegmentPipe:PqvTopSegmentPipe
  ) {}

  @Output() selectedSegment: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.form = this.fb.group({
      segment:['']
    });

    this.$wardDataTable = this.dataService
      .getData$()
      .subscribe((wardDataTable) => {
        this.wardDataTable = this.wardTotalsPipe.transform(wardDataTable);
        this.topSegmentField = this.topSegmentPipe.transform(this.wardDataTable);
      });
    
      this.form.controls['segment'].valueChanges.subscribe(value => {
        console.log('segment', value);
        this.selectedSegment.emit(value);
        this.segmentInfo = this.bySegmentPipe.transform(this.wardDataTable, value);
        
      });
  }

  ngOnDestroy(): void {
    this.$wardDataTable?.unsubscribe();
  }
}
