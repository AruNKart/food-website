// newsletter forms
// window.load=function(){
//   document.getElementById("form").reset();
// }



const form=document.querySelector('#form');
const fname=document.querySelector('#fullName');
const email=document.querySelector('#email');
const number=document.querySelector('#number');
const foodname=document.querySelector('#foodName');



form.addEventListener('submit',(e)=>{

  if(!formValidation()){
     e.preventDefault();
  }else{
    


    analytics.track('form_submission',{
       name1:fname.value,
       email1:email.value

    })

    window.dataLayer=window.dataLayer || []

    dataLayer.push({
      'event':'pageload',
      'name':fname.value,
      'email':email.value
    })
  }

  e.preventDefault();
  window.location.href="thankyou.html"

});


function formValidation(){
  let usernameval=fname.value.trim();
  let emailval=email.value.trim();
  let numberval=number.value.trim();
  let foodnameval=foodname.value.trim();
  let success=true

  if( usernameval ===''){
     
     setError(fname,'user name is required');
      success=false;
  }else{
     setSuccess(fname)
  }

  if(emailval === ''){
    
    setError(email,'email is required');
     success=false;
  }
  else if(!validateEmail(emailval)){
    
    setError(email,'please Enter valid email');
     success=false;
  }
  else{
    setSuccess(email);
  }

  if( numberval === ''){
    
    setError(number,'number is required');
     success=false;
  }
  else{
    setSuccess(number)
  }

  if(foodnameval === ''){
    setError(foodname,'food name is required')
     success=false;
  }
  else {
    setSuccess(foodname)
  }

  return success;

  

}

function setError(ele,message){
  const inputGrp=ele.parentElement;
  const errorElement=inputGrp.querySelector('.error')
  errorElement.innerText= message;
  inputGrp.classList.add('error')
  inputGrp.classList.remove('success')

}
function setSuccess(ele){
  const inputGrp=ele.parentElement;
  const errorElement=inputGrp.querySelector('.error')
  errorElement.innerText= '';
  inputGrp.classList.add('success')
  inputGrp.classList.remove('error')

}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}; 
