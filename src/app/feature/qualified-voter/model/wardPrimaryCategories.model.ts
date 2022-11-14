import { WardCategories } from "./interface/WardCategories.interface";

export const wardPrimaryCategories:WardCategories = {
  'party':{
    fields:[
      'dem',
      'rep',
      'other_party'
    ]
  }, 
  'race':{
    fields:[
      'white',
      'black',
      'hispanic',
      'other_race'
    ]
  }, 
  'gender':{
    fields:[
      'male',
      'female',
      'unknown_sex'
    ]
  }
};
