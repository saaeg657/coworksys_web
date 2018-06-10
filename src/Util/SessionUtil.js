import Cookies from 'universal-cookie';

export function getParam(key) {
  var _parammap = {};
  document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
      return decodeURIComponent(s.split("+").join(" "));
    }

    _parammap[decode(arguments[1])] = decode(arguments[2]);
  });
  return _parammap[key];
}

export function generateUUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export function getCurrentTimeStamp() {
  return Date.now();
}

export function ConvertDateToString(value) {
  let date = new Date(toLocalTime(value));
  return date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" +(date.getDate())).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
}

export function toLocalTime(props) {
        let d = new Date();
        let n = d.getTimezoneOffset();

        // props += n * 60 * 1000;
        return props;
}

export function sendEventToConsole(eventName,data)
{  
  /*
  var event = {
    'sls-event' : eventName , 
    'data' : data 
  } ; 
  */
  var event = {
    'header' : {
      'command' : eventName , 
      'senderType' : 'AgentWeb' , 
      'receiverType' : 'AgentApp' 
    }, 
    'body' : data
  };
  console.log(JSON.stringify(event));
}

export function movePage(url)
{
  location.href = window.PrefixUrl + url; 
}
      
export function newMap() {
  var map = {};
  map.value = {};
  map.getKey = function (id) {
   // return "k_" + id;
    return id;
  };
  map.put = function (id, value) {
    var key = map.getKey(id);
    map.value[key] = value;
  };
  map.contains = function (id) {
    var key = map.getKey(id);
    if (map.value[key]) {
      return true;
    } else {
      return false;
    }
  };
  map.get = function (id) {
    var key = map.getKey(id);
    if (map.value[key]) {
      return map.value[key];
    }
    return null;
  };
  map.remove = function (id) {
    var key = map.getKey(id);
    if (map.contains(id)) {
      map.value[key] = undefined;
    }
  };

  return map;
}

export function setCookie(key,value)
{  
  /*
  const cookies = new Cookies();  
  console.log('key : ',key,' value : ',value);
  alert('cookie');
  let minutes = 20 ; 
  if(minutes == undefined)  
    minutes = 20 ;   
    
  let d = new Date();
  d.setTime(d.getTime() + (minutes*60*1000));
  cookies.set(key,value ,  { path : '/' ,expires: d}) ;   
  console.log(key,value);  
  */
  let minutes = 20 ; 
  var d = new Date();
  d.setTime(d.getTime() + (minutes*60*1000));
 // var expires = "expires="+ d.toUTCString();
  document.cookie = key + "=" + value
  // + ";" + expires + ";path=/";
   + ";path=/";
}

export function getCookie(key)
{
  /*
  const cookies = new Cookies();  
  console.log('get : ',key);
  return cookies.get(key) ; 
  */
  var name = key + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {          
          return c.substring(name.length, c.length);
      }
  }
  return "";
}