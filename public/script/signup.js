password=document.getElementById("password");
passwordConfirm=document.getElementById("passwordConfirm");
form=document.getElementById("form");
verifyerror=document.getElementById("verifyerror");

form.addEventListener("submit",(e)=>{
let error=[];
if(password.lenght<10){
    error.push("small pasword");
    console.log("small password")
}


if(password.value!=passwordConfirm.value){
    error.push("PASSWORD MUST ME THE SAME");
    console.log("password mksmatc in script")
}

if(error.length>0){
    e.preventDefault();
verifyerror.innerText=error.join(" , ");
console.log("script")
}





})



