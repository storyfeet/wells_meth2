//makeDropdown takes a UL element, and turns all child li-uls into hidden creatures, and assigns the buttons above them with an Open method.
function beginDropdown(ul,isChild,zed){
    if( isChild){
        ul.style.display = "none";
    }
    zed = zed || 10;
    ul.style.zIndex = zed;

    function closeChild(child){
        child.style.display = "none";
        for (var i = 0; i < child.children.length ; i++){
            var ch2 = child.children[i];
            if (ch2.children.length === 2){
                closeChild(ch2.children[1]);
            }
        }
    }
    function openChildMaker(child){
        return function(){
            if (child.style.display === "none") {
                child.style.display = "";
            }else {
                closeChild(child);
            }
        }
    }

    function doStringMaker(s){
        return function(){
            window.location = s; 
        }    
    }
    

    for (var i = 0; i < ul.children.length; i++){
        var li = ul.children[i];
        if (li.children.length > 1 ){
            beginDropdown(li.children[1],true,zed + 1)
            li.children[0].onclick = openChildMaker(li.children[1]);
        }else {
            //li.children[0].onclick = doStringMaker(li.children[0].onclick[0]);
        }
    }
}

//This is the simple two level menu- Using selects when children exist.
function makeDropDownMenu(top){
    var resUl = document.createElement("ul"); 

    for(var p in top.Children){
        var c = top.Children[p];

        var li = document.createElement("li"); 
        resUl.appendChild(li);
        
        var newBut = document.create("button");
        newBut.innerHTML = c.Name;
        li.appendChild(newBut);
        if (c.Children) {
            li.appendChild(makeMenu(c));
        }else {
            newBut = document.createElement("button");
        }
    }

    return res;
}


//makeRibonMenu creates a menu from the same menu element, and 
function makeRibbonMenu(top,rootClass, prepend,postpend){
    if (prepend == undefined){
        prepend = "";
    }
    if (postpend == undefined){
        postpend = "";
    }
    var pstack = [];
    rootClass = rootClass || "ribon_top"; 
    rDiv = document.createElement("div"); 
    rDiv.class = rootClass;
    tDiv = document.createElement("div");
    sDiv = document.createElement("div");

    rDiv.appendChild(tDiv);
    rDiv.appendChild(sDiv);


    function buttonFMaker(toppel){
        return function(){
            if (toppel.Children !== null ){
                pstack.push(toppel.Name); 
    
                setMenu();
                return
            }
            window.location = toppel.Dest;
        }
    }
    function rootFMaker(depth){
        return function(){
            while (pstack.length > depth){
                pstack.pop();
            }
            setMenu();
        }
    }

    //Set Meun actually outputs the menu on the main screen
    function setMenu(){
        function next(cTop ,s){
            for (var j = 0; j < cTop.Children.length; j++){
                if (cTop.Children[j].Name === s ){
                    return cTop.Children[j];
                }
            }
            return cTop;
        }//next()

        tDiv.innerHTML = "";
        cTop = top;
        if (pstack.length > 0 ) {
            var tButt = document.createElement("button");
            tButt.innerHTML=("^");
            tButt.onclick = rootFMaker(0);
            tDiv.appendChild(tButt);
        }
        
        for (var i = 0;i < pstack.length; i++){
            var tButt = document.createElement("button");
            tButt.innerHTML=(pstack[i]);
            tButt.onclick = rootFMaker(i+1);
            tDiv.appendChild(tButt);
            cTop = next(cTop,pstack[i]);
        }
        
        sDiv.innerHTML = "";
        for (var i = 0; i < cTop.Children.length; i++){
            var butt = document.createElement("button");
            butt.innerHTML = prepend + cTop.Children[i].Name + postpend;
            butt.onclick = buttonFMaker(cTop.Children[i]);
            sDiv.appendChild(butt); 
        }
    }//setMenu()

    setMenu(); 
    
    
    return rDiv;
    
}//makeRibbonMenu
