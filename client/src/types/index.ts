export interface Location {
  id: number,
  name: string,
  latitude: number,
  longitude: number
}

export interface JWTResponse {
  access: string;
  refresh: string;
}

export enum WeatherDescription {
  Sunny = 'Sunny',
  PartlyCloudy = 'Partly Cloudy',
  Cloudy = 'Cloudy',
  Rainy = 'Rainy',
  Snowy = 'Snowy',
  Stormy = 'Stormy',
  Foggy = 'Foggy',
  Windy = 'Windy',
}

export interface WeatherForecast {
  location: Location,
  date: string,
  time: string | null,
  temperature: number | null,
  description: WeatherDescription | null
}

export interface UserQuery {
  id: number,
  location: Location,
  date: string,
  time: string | null,
  status: string,
  result: WeatherForecast | null
}