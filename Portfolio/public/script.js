let title1=document.querySelector(".about-title1")
let title2=document.querySelector(".about-title2")
let title3=document.querySelector(".about-title3")
let cont1=document.querySelector(".about-content1")
let cont2=document.querySelector(".about-content2")
let cont3=document.querySelector(".about-content3")

title2.addEventListener("click", ()=>{
    title2.classList.add("active-title")
    title1.classList.remove("active-title")
    title3.classList.remove("active-title")
    cont2.classList.remove("hide");
    cont1.classList.add("hide");
    cont3.classList.add("hide");
});
title3.addEventListener("click", ()=>{
    title3.classList.add("active-title")
    title2.classList.remove("active-title")
    title1.classList.remove("active-title")
    cont3.classList.remove("hide");
    cont1.classList.add("hide");
    cont2.classList.add("hide");
});
title1.addEventListener("click", ()=>{
    title1.classList.add("active-title")
    title2.classList.remove("active-title")
    title3.classList.remove("active-title")
    cont1.classList.remove("hide");
    cont2.classList.add("hide");
    cont3.classList.add("hide");
});


// ---------------------------responsive--------------------------

let menu=document.querySelector(".fa-sharp")
let closemenu=document.querySelector(".fa-x")
let navl=document.querySelector(".navl")
menu.addEventListener("click",()=>{
    navl.style.right="0";
});

closemenu.addEventListener("click",()=>{
    navl.style.right="-100px";
});


