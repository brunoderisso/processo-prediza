export interface Point {
  objectid: string;
  latitude: number;
  longitude: number;
  polygonobjectid: string;
}

export interface LocationPoint {
  objectid: string;
  name: string;
  color: string;
  isenvironment: boolean;
  area: number;
  centroid: [
      number,
      number,
  ];
  Points: Point[];
}
