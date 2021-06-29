import {Event} from "./Event";
import {TYPES} from "./typeslist";
import {BUSINESS} from "./businesslist";

export const EVENTS: Event[] = [
  {id:1,name:"Safari", location:"Avenida 24 de Julho", datetime:"30-08-2021", type:TYPES[0], theme:"Exótico", min_age: 15, organization: "Estudio 22", dress_code:"Safari", business:BUSINESS[2]},
  {id:2,name:"Uma Noite em Paris", location:"Avenida dos Aliados", datetime:"30-08-2021", type:TYPES[1], theme:"Romântico", min_age: 18, organization: "Estudio 22", dress_code:"Glamour", business:BUSINESS[2]},
  {id:3,name:"À volta pelo mundo", location:"Avenida 24 de Julho", datetime:"30-08-2021", type:TYPES[0], theme:"Inter-Cultural", min_age: 16, organization: "Estudio 22", dress_code:"Cultural", business:BUSINESS[0]},
  {id:4,name:"Back to the Future", location:"AAvenida dos Aliados", datetime:"30-08-2021", type:TYPES[2], theme:"Anos 80", min_age: 21, organization: "Estudio 22", dress_code:"Moda Anos 80", business:BUSINESS[0]},
  {id:5,name:"Between Your Heart and Mine", location:"Avenida 24 de Julho", datetime:"30-08-2021", type:TYPES[3], theme:"Romântico", min_age: 18, organization: "Estudio 22", dress_code:"Glamour", business:BUSINESS[0]},
];
