export interface Category {
  id : string;
  name : string;
  nbKeywords : string;
  depth : number;
  ancestors : {id : string; name : string}[]

}
