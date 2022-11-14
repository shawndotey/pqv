import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PqvQualifiedVoterService } from '../qualified-voter.service';
import { PqvCommonSharedModule } from 'src/app/shared/common-shared.module';
import { Subscription } from 'rxjs';
import { WardRow } from '../model/interface/WardRow.interfaces';
import { PqvTopSegmentPipe } from '../transformations/top-segment.pipe';
import { PqvFieldDescriptionPipe } from '../transformations/field-description.pipe';
import { FormBuilder, FormGroup } from '@angular/forms';
import { wardPrimaryFields } from '../model/wardPrimaryFields.model';
import { PqvTotalsBySegmentPipe } from '../transformations/totals-by-segment.pipe';
import { SegmentInfo } from '../model/interface/SegmentInfo.interface';

@Component({
  selector: 'pqv-summary',
  standalone: true,
  imports: [
    PqvCommonSharedModule,
    PqvTopSegmentPipe,
    PqvFieldDescriptionPipe,
    PqvTotalsBySegmentPipe,
  ],
  providers: [PqvTotalsBySegmentPipe, PqvTopSegmentPipe],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PqvSummaryComponent implements OnInit, OnDestroy {
  public title = 'Qualified Voters';

  public wardDataTable!: WardRow[];
  public $wardDataTable!: Subscription;
  public $overviewInfo!: Subscription;
  public wardPrimaryFields = wardPrimaryFields;
  public form!: FormGroup;
  public segmentInfo: SegmentInfo = {
    percent: 0,
    count: 0,
    name: 'None Selected',
  };
  public topSegmentField: SegmentInfo = {
    name: 'Unknown',
    count: 0,
    percent: 0,
  };

  constructor(
    private dataService: PqvQualifiedVoterService,
    private fb: FormBuilder,
    private totalsBySegmentPipe: PqvTotalsBySegmentPipe,
    private topSegmentPipe: PqvTopSegmentPipe,
    private changeDectorRef: ChangeDetectorRef
  ) {}

  @Output() selectedSegment: EventEmitter<string> = new EventEmitter();

  async ngOnInit(): Promise<void> {
    this.initFormControls();
    this.initOverview();
    this.initWardTable();
  }
  
  initFormControls() {
    this.form = this.fb.group({
      segment: [''],
    });
    this.form.controls['segment'].valueChanges.subscribe((value) => {
      this.selectedSegment.emit(value);
      this.segmentInfo = this.totalsBySegmentPipe.transform(
        this.wardDataTable,
        value
      );
    });
  }

  initOverview(){
    this.$overviewInfo = this.dataService.overview$().subscribe(overviewInfo=>{
      this.title = overviewInfo.title;
    });
  }

  initWardTable() {
    this.$wardDataTable = this.dataService.data$().subscribe(
      (wardDataTable) => {
        this.wardDataTable = wardDataTable;
        this.topSegmentField = this.topSegmentPipe.transform(
          this.wardDataTable
        );
        this.changeDectorRef.detectChanges();
      }
    );
  }

  ngOnDestroy(): void {
    this.$overviewInfo?.unsubscribe();
    this.$wardDataTable?.unsubscribe();
  }
}
