import SubscriberManager from './SubscriberManager.js';
import * as util from '../Util/Util.js' ; 

export default class Communicator
{
    constructor()
    {
        this.jobController = null;
        this.subscriberManager = new SubscriberManager() ; 
        this.centralUrl = ''; 
        this.centralConnection = null;

        this.setJobController = this.setJobController.bind(this);    
        this.wsOpne = this.wsOpen.bind(this); 
        this.wsMessage = this.wsMessage.bind(this); 
        this.wsClose = this.wsClose.bind(this); 
        this.wsError = this.wsError.bind(this); 
        this.sendToSubscriber = this.sendToSubscriber.bind(this);
        this.reConnect = this.reConnect.bind(this);        
    }

    setJobController(jobController)
    {
        this.jobController = jobController;
    }
    
    connect(centralUrl)
    {
        this.centralUrl = centralUrl ; 
        this.centralConnection = new WebSocket(this.centralUrl);	
        this.centralConnection.onopen = this.wsOpne; 
        this.centralConnection.onmessage = this.wsMessage; 
        this.centralConnection.onclose = this.wsClose; 
        this.centralConnection.onerror = this.wsError;     
        
        this.RegistUserInfo = this.RegistUserInfo.bind(this) ; 
    }

    wsOpen()
    {
        console.log("wsConnection.onopen");
        if(this.jobController != null && this.jobController != undefined) this.jobController.onOpen() ;            
        this.subscriberManager.onMessageToAll("wsOpen");
        this.RegistUserInfo() ; 
    }

    wsMessage(message)
    {
        console.log("wsConnection.onmessage");
        console.log(message);
        if(this.jobController != null && this.jobController != undefined) this.jobController.execute(message.data) ; 
        var data = JSON.parse(message.data);
        this.subscriberManager.onMessageToAll(data);
    }

    wsClose()
    {
        console.log("wsConnection.onclose");
        if(this.jobController != null && this.jobController != undefined) this.jobController.onClose() ;         
        this.subscriberManager.onMessageToAll("wsClose");
        setTimeout(this.reConnect, 3000);
    }

    reConnect()
    {
        console.log("wsConnection.reconnect");
        if(this.jobController != null && this.jobController != undefined) this.connect(this.centralUrl);
    }

    wsError(message)
    {
        console.log("wsConnection.onerror: "+JSON.stringify(message));
        if(this.jobController != null && this.jobController != undefined) this.jobController.onError() ; 
    }

    send(message)
    {
        var strJson = JSON.stringify(message); 
        this.centralConnection.send(strJson); 
    }

    sendToSubscriber(name,message)
    {
        this.subscriberManager.onMessage(name,message);
    }

    RegistUserInfo()
    {
        var message = {
            "Msg" : {
                'Header': util.generateHeader('REGIST_USER','Server','' )
            } 
        };

        this.send(message) ; 
    }

    SystemMonitoring(deviceUUID,isStart)
    {
        var message = {
            "Msg" : {
                'Header': util.generateHeader('SYSTEM_MONITORING','Agent',deviceUUID) , 
                'Body' : {
                    'isStart' : isStart
                }
            } 
        };

        this.send(message) ; 
    }
}

// export default (new Communicator) ; 전역변수로 선언시 이렇게 함 