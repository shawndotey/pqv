export interface WardRowIndex {
  'ward': string;
}

export interface WardRowCore {
  'dem': number;
  'rep': number;
  'other_party': number;
  'total': number;
  'white': number;
  'black': number;
  'hispanic': number;
  'other_race': number;
  'male': number;
  'female': number;
  'unknown_sex': number;
}

export interface WardRowGeom {
  'the_geom': any;
  'the_geom_webmercator': any;
}

export interface WardRow extends WardRowIndex, WardRowGeom, WardRowCore{}

export interface WardRowSumCheck extends WardRow{
  //[<category>-delta] categories with total discrepancies
  'race-delta':number;
  'gender-delta':number;
  'party-delta':number;
  //[<category>-sumcheck] category totals calculated
  'race-sumcheck':number,
  'gender-sumcheck':number,
  'party-sumcheck':number
}






