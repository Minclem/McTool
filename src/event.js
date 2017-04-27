var Event = function(){};
Event.prototype.addEvent = function(target, eventType, handle){
    if(document.addEventListener){
        Event.addEvent = function(target, eventType, handle){
            target.addEventListener(eventType,handle,false);
        }
    }else if(document.attachEvent){
        Event.addEvent = function(target,eventType,handle){
            target.attachEvent('on'+eventType,function(){
                handle.call(target,arguments);
            });
        }
    }else{
        Event.addEvent = function(target,eventType,handle){
            target['on'+eventType] = handle;
        }
    }
    Event.addEvent(target,eventType,handle);
}
