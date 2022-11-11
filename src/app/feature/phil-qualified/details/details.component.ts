import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PqvDataService } from '../data/data.service';
import { PqvCommonSharedModule } from 'src/app/shared/common-shared.module';
import { WardRow } from '../data/model/WardRow.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pqv-details',
  standalone: true,
  imports: [PqvCommonSharedModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PqvDetailsComponent implements OnInit {
  wardDataTable!: WardRow[];
  $wardDataTable!: Subscription;

  constructor(private dataService:PqvDataService) { }

  ngOnInit(): void {
    this.$wardDataTable = this.dataService.getData$().subscribe((wardDataTable=>{
      this.wardDataTable = wardDataTable;
    }))
  }
  ngOnDestroy():void{
    this.$wardDataTable?.unsubscribe();
  }
}
