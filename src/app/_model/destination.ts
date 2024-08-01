import { DestinationType } from './destination.type.enum';

export class Destination {
  id: number;
  name: string;
  description: string;
  countryCode: string;
  type: DestinationType;
  lastModify: Date;
  population?: number

  constructor(
    id: number,
    name: string,
    description: string,
    countryCode: string,
    type: DestinationType,
    lastModify: Date,
    population?: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.countryCode = countryCode;
    this.type = type;
    this.lastModify = lastModify;
    this.population = population;
  }
}