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