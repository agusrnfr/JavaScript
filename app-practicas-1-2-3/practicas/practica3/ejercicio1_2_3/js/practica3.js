/* const elements = [22, 44, 78, -43, 89];

 const point1 = { x: 0.0, y: 0.0 };
 const point2 = { x:3.0, y: 0.0 };
 const point3 = { x:0.0, y: 3.0 };
 let triangle = {
 corners : [point1, point2, point3]
 };
 console.log(JSON.stringify(elements));
 console.log(JSON.stringify(point1));
 console.log(JSON.stringify(triangle)); 


 var jsonStr = '['
 + '{"name":"Alice","dob": "2001-03-04T00:00:00.000Z","h": 165,"w": 68},'
 + '{"name":"Robert","dob": "1997-01-31T00:00:00.000Z","h": 170,"w": 88},'
 + '{"name":"Charles","dob": "1978-10-15T00:00:00.000Z","h": 188,"w":102},'
 + '{"name":"Lucía","dob": "1955-08-07T00:00:00.000Z","h": 155,"w": 61},'
 + '{"name":"Peter","dob": "1988-03-09T00:00:00.000Z","h": 165,"w": 99},'
 + '{"name":"Lucas","dob": "1910-12-04T00:00:00.000Z","h": 172,"w": 75}]';

*/

 function overweightNames(people){
    return people.filter(p => (p.w / Math.pow(p.h / 100, 2)) > 25).map(p => p.name).reduce((n1, n2) => n1 + ", " + n2);
   }
   
 function proxCumple(people){
     return people.
     filter(p => (new Date(p.dob).getMonth() - new Date().getMonth()) >= 0).     
     reduce((acum,value) =>((new Date(acum.dob).getMonth()- new Date().getMonth() < new Date(value.dob).getMonth()-new Date().getMonth()) 
     ||((new Date(acum.dob).getMonth()-new Date().getMonth() == new Date(value.dob).getMonth()-new Date().getMonth())&&(new Date(acum.dob).getDate()-
     new Date().getDate() < new Date(value.dob).getDate()-new Date().getDate()))) ? acum:value).name;
 } 
console.log(overweightNames(JSON.parse(jsonStr)));
console.log(proxCumple(JSON.parse(jsonStr)));

 