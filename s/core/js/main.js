
function tallOrWide(){
    var mDiv = document.getElementById("main-area");
    if (window.innerWidth > window.innerHeight * 1.5){
        console.log("Wide");
        mDiv.className = "main-wide";
    }else {
        console.log("Tall");
        mDiv.className = "main-tall";
    }
}
window.addEventListener('resize',tallOrWide);

tallOrWide();


toggle_menu = function(){
    let ribdiv = document.getElementById("ribbon_loc");
    ribdiv.classList.toggle("show_menu");
}

//ribdiv.getBoundingClientRect().height )
// Make Div stop at top.
topbar = function(){
    //topbar
    let contents = document.getElementById("contents");
    let themeth = document.getElementById("the_methodist");
    let ribdiv = document.getElementById("ribbon_loc");
    if (themeth.getBoundingClientRect().top < 0 ){
        ribdiv.className = "top_fixed";
    }else{
        ribdiv.className = "banner_abs";
    }

    //basebar
    let base = document.getElementById("contact");
    if (contents.getBoundingClientRect().height < window.innerHeight * 0.4){
        base.className = "base_fixed";    
    }else {
        base.className = "base_floaty";
    }

    

}
window.addEventListener("scroll",topbar);
window.addEventListener("resize",topbar);
window.addEventListener("load",topbar);
