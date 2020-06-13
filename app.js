//DOMController
var DOMstring=(function(){
    var dom={
        container:"#container",
        inner:"#inner"
    };
    var selector={
        container:document.querySelector(dom.container),
        inner:document.querySelector(dom.inner)
    };

    return{
        getdom:function(){
            return dom;
        },
        getselector:function(){
            return selector;
        }
    }
})();


//MouseController
var MouseController=(function(DOM){
    var selector=DOM.getselector();
    var counter=0,updateRate=10;
    var WaitTime=function(){
        return counter++%updateRate===0;
    };
    var mouse={
        center_x:0,
        center_y:0,
        current_x:0,
        current_y:0,
        setOrigin:function(event){
            this.center_x=event.offsetLeft+Math.floor(event.offsetWidth/2);
            this.center_y=event.offsetTop+Math.floor(event.offsetHeight/2);
            console.log(this.center_x,this.center_y);
        },
        updatePosition:function(event){
            this.current_x=event.clientX-this.center_x;
            this.current_y=(event.clientY-this.center_y)*-1;
            console.log(this.current_x,this.current_y);
        }
    };
    var updateTransformStyle=function(x,y){
        var style="rotateX("+x+"deg) rotateY("+y+"deg)";
        inner.style.transform=style;
    }
    

    var Update=function(event){
        mouse.updatePosition(event);
        updateTransformStyle((mouse.current_y/inner.offsetHeight),
        (mouse.current_x/inner.offsetWidth));
    };
    return{
        MouseEnterEffect:function(event){
            Update(event);
        },
        MouseMoveEffect:function(event){
            if(WaitTime()){
                Update(event);
            }
        },
        MouseLeaveEffect:function(){
            selector.inner.style="";
        },
        getmouse:function(event){
            mouse.setOrigin(event);
        }
    }
})(DOMstring);

//Controller
var Controller=(function(MouseCtrl,DOM){
    var selector=DOM.getselector();

    var SetupEventListener=function(){
        selector.container.addEventListener("mouseenter",MouseCtrl.MouseEnterEffect);
        selector.container.addEventListener("mousemove",MouseCtrl.MouseMoveEffect);
        selector.container.addEventListener("mouseleave",MouseCtrl.MouseLeaveEffect);

    };

    return{
        init:function(){
            //setting the eventlistener
            MouseCtrl.getmouse(selector.container);
            SetupEventListener();
        }
    }
})(MouseController,DOMstring);

Controller.init();

