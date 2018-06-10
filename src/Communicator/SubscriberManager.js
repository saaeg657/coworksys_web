import * as Util from '../Util/Util.js'; 

export default class SubscriberManager 
{
    constructor()
    {
        this.subscriberMap = Util.newMap();        
    }

    put(name,callback)
    {
        this.subscriberMap.put(name,callback); 
    }

    remove(name)
    {
        this.subscriberMap.remove(name);
    }

    onMessage(name,message)
    {        
        var callback = this.subscriberMap.get(name); 
        if(callback != null && callback != undefined && callback.onMessage != undefined)
        {
            callback.onMessage(message); 
        }
    }

    onMessageToAll(message)
    {           
        for (var key in this.subscriberMap.value ) 
		{	
            console.log('key:',key);
            this.onMessage(key,message) ;             
        }
    }
};