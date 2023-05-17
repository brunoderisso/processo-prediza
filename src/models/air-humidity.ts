export interface SerieAirHumidity {
  time: string;
  'humidade(%)': number;
}

export interface BodyAirHumidity {
  name: string;
  max: number;
  min: number;
  serie: {
    time: Date;
    value: number;
  }[];
}
