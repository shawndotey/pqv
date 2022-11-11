import {
  ChangeDetectionStrategy,
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
import { PqvPercentBySegmentPipe } from '../transformations/percent-by-segment.pipe';

@Component({
  selector: 'pqv-summary',
  standalone: true,
  imports: [PqvCommonSharedModule, PqvTopSegmentPipe, PqvFieldDescriptionPipe, PqvPercentBySegmentPipe],
  providers: [PqvWardTotalsPipe],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PqvSummaryComponent implements OnInit, OnDestroy {
  wardDataTable!: WardRow[];
  $wardDataTable!: Subscription;
  wardPrimaryFields = wardPrimaryFields;
  public form!: FormGroup ;
  constructor(
    private dataService: PqvDataService,
    private fb: FormBuilder,
    private wardTotalsPipe: PqvWardTotalsPipe
    ) {}
    @Output() selectedSegment: EventEmitter<string> = new EventEmitter()
  ngOnInit(): void {
    this.$wardDataTable = this.dataService
      .getData$()
      .subscribe((wardDataTable) => {
        this.wardDataTable = this.wardTotalsPipe.transform(wardDataTable);
      });
    
      this.form = this.fb.group({
        segment:['']
      });

      this.form.controls['segment'].valueChanges.subscribe(value => {
        console.log('segment', value);
        this.selectedSegment.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.$wardDataTable?.unsubscribe();
  }
}
