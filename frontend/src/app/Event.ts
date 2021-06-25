export class Event{
  id!: number;
  name!: string;
  location!: string;
  //datetime!: DateTimeField;
  fk_event_type!: string;
  theme!: string;
  min_age!: number;
  organization!: string;
  dress_code!: string;
  fk_business!: string;
}
