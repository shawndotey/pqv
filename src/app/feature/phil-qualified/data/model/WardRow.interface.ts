export interface WardRowOriginal {
  'the_geom': any;
  'the_geom_webmercator': any;
  'ward': string;
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

export interface WardRow extends WardRowOriginal{
  'race-delta':number;
  'gender-delta':number;
  'party-delta':number;
  'race-total':number,
  'gender-total':number,
  'party-total':number
}


