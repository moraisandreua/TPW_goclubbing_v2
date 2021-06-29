export class Event{
  id!: number;
  name!: string;
  location!: string;
  datetime!: string;
  type!: number;
  fk_event_type!:string;
  theme!: string;
  min_age!: number;
  organization!: string;
  dress_code!: string;
  business!: number;
  fk_business!: string;
}
