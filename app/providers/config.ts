// export let SERVER_URL = "http://localhost:3001/";
export
  let
  SERVER_DEV=false,
  LOGIN_DEV=true;

export let SERVER_URL=(SERVER_DEV?"http://localhost:3002/":"https://gongangschool-1374.appspot.com/");


console.log(SERVER_URL);



