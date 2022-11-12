import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PqvDataService } from '../data/data.service';
import { PqvCommonSharedModule } from 'src/app/shared/common-shared.module';
import { WardRow } from '../data/model/WardRow.interface';
import { Subscription } from 'rxjs';

import { PqvWardTotalsPipe } from '../transformations/ward-totals.pipe';
import { PqvFieldDescriptionPipe } from '../transformations/field-description.pipe';
import { FormBuilder } from '@angular/forms';
import { wardPrimaryFields } from '../data/model/wardPrimaryFields.model';
import { PqvTotalsBySegmentPipe } from '../transformations/percent-by-segment.pipe';

@Component({
  selector: 'pqv-details',
  standalone: true,
  imports: [PqvCommonSharedModule, PqvFieldDescriptionPipe, PqvTotalsBySegmentPipe],
  providers: [PqvWardTotalsPipe],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PqvDetailsComponent implements OnInit {
  wardDataTable!: WardRow[];
  $wardDataTable!: Subscription;
  displayedColumns: string[] = ['ward', ...wardPrimaryFields.map(field=>field.name), 'percent'];
  wardPrimaryFields = wardPrimaryFields;
  constructor(
    private dataService:PqvDataService,
    private fb: FormBuilder,
    private wardTotalsPipe: PqvWardTotalsPipe
    ) { }
  @Input() segment: string = '';

  ngOnInit(): void {
    this.$wardDataTable = this.dataService
    .getData$()
    .subscribe((wardDataTable) => {
      this.wardDataTable = this.wardTotalsPipe.transform(wardDataTable);
    });
  }
  ngOnDestroy():void{
    this.$wardDataTable?.unsubscribe();
  }
}
