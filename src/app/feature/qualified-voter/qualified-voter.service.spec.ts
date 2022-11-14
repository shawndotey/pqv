import { TestBed } from '@angular/core/testing';
import { PqvQualifiedVoterService } from './qualified-voter.service';
import { PqvCategorySumCheckPipe } from './transformations/category-sum-check';
import {default as wardData} from './test/data/qualified_voter_listing_2018_primary_by_ward.mock.json'
import { WARD_DATA } from './data/WARD_DATA';
import { firstValueFrom } from 'rxjs';
import { WardRow } from './model/interface/WardRow.interfaces';


describe('PqvQualifiedVoterService', () => {
  let service: PqvQualifiedVoterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        PqvCategorySumCheckPipe,
        PqvQualifiedVoterService,
        { provide: WARD_DATA, useValue: wardData }
      ],
    });
    service = TestBed.inject(PqvQualifiedVoterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return a dataset of 67 rows', async () => {
    const wardTata:WardRow[] = await firstValueFrom<WardRow[]>(service.data$()) as WardRow[];
    expect(wardData.rows.length).toEqual(67);
  });

  it('should find delta in "race" category', async () => {
    const wardTata:any = await firstValueFrom(service.dataWithSumCheck$());
    console.log(wardTata)
    expect(wardTata[0]["race-delta"]).toBeGreaterThan(0);
  });
});
