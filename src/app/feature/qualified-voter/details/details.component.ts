import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PqvQualifiedVoterService } from '../qualified-voter.service';
import { PqvCommonSharedModule } from 'src/app/shared/common-shared.module';
import { WardRow } from '../model/interface/WardRow.interfaces';
import { Subscription } from 'rxjs';
import { PqvCategorySumCheckPipe } from '../transformations/category-sum-check';
import { PqvFieldDescriptionPipe } from '../transformations/field-description.pipe';
import { FormBuilder } from '@angular/forms';
import { wardPrimaryFields } from '../model/wardPrimaryFields.model';
import { PqvTotalsBySegmentPipe } from '../transformations/totals-by-segment.pipe';

@Component({
  selector: 'pqv-details',
  standalone: true,
  imports: [PqvCommonSharedModule, PqvFieldDescriptionPipe, PqvTotalsBySegmentPipe],
  providers: [PqvCategorySumCheckPipe],
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
    private dataService:PqvQualifiedVoterService,
    private fb: FormBuilder,
    private changeDectorRef: ChangeDetectorRef
    ) { }
  @Input() segment: string = '';

  async ngOnInit():Promise<void> {
    this.$wardDataTable = (await this.dataService
      .data$())
    .subscribe((wardDataTable) => {
      this.wardDataTable = wardDataTable;
      this.changeDectorRef.detectChanges();
    });
  }
  
  ngOnDestroy():void{
    this.$wardDataTable?.unsubscribe();
  }
}
