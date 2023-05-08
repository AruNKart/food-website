let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{

  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');

} 

window.onscroll = () =>{

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  if(window.scrollY > 60){
    document.querySelector('#scroll-top').classList.add('active');
  }else{
    document.querySelector('#scroll-top').classList.remove('active');
  }

}

function loader(){
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 500);
}

window.onload = fadeOut();








// cart content

const btnCart=document.querySelector('#order-icon')
const cart=document.querySelector('.cart')
const btnclose=document.querySelector('#cart-close')


btnCart.addEventListener('click',()=>{
  cart.classList.add('cart-active');
});

btnclose.addEventListener('click',()=>{
  cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
  loadContent();
}

function loadContent(){
  let removebtn=document.querySelectorAll('.cart-remove');
  removebtn.forEach((btnele)=>{
      btnele.addEventListener('click',removeItem);
  });

  //product Item Change Event

  let qtyElements=document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input)=>{
      input.addEventListener('change',changeQty);
  });

  // product order now
  let orderNowBtn=document.querySelectorAll('.order-now');
  orderNowBtn.forEach((btn)=>{
    btn.addEventListener('click',orderNow);
  });
 

  //update total in cart

updateTotal();

}


// remove element
function removeItem(){
  if(confirm('if you need to remove this food item')){
  let title=this.parentElement.querySelector('.cart-food-title').innerHTML;
  
  itemList=itemList.filter(ele=>ele.title!=title);
  this.parentElement.remove();
  loadContent();

};
}

// change Quality
function changeQty(){
  if(isNaN(this.value) || this.value<1){
     this.value=1;
  }
  loadContent();
}

let itemList=[];





// orderNow Function

function orderNow(){
 let food =this.parentElement;
  let title=food.querySelector(".food-title").innerHTML;
  let price=food.querySelector(".price").innerHTML;
  let imgSrc=food.querySelector('.food-img').src;

// dataLayer for Adobe Launch
// window.dataLayer=window.dataLayer || []
// dataLayer.push({
//   "event":"add to cart",
//   "title":title
// });
digitalData={
  "title":title,
  "price":price
}
 



  let newProduct={title,price,imgSrc};

  // check product already Exist in Cart

  if(itemList.find((ele)=>ele.title==newProduct.title)){
    alert("food Already added in orderDetails");
    return;
  }
  else{
    itemList.push(newProduct);
  };



  let newProductElements = createFoodToCart(title,price,imgSrc);
  let element=document.createElement('div');
  element.innerHTML=newProductElements;
  let cartBasket=document.querySelector('.cart-content');

  // append the total element into the basket

  cartBasket.append(element);
  loadContent();
};

function createFoodToCart(title,price,imgSrc){

  return `
  <div class="cart-box">
  <img src="${imgSrc}" class="cart-img">
  <div class="detail-box">
      <div class="cart-food-title">${title}</div>
      <div class="price-box">
          <div class="cart-price">${price}</div>
          <div class="cart-amt">${price}</div>
      </div>
      <input type="number" value="1" class="cart-quantity">
  </div>
  <ion-icon name="trash-outline" style="color: red; font-size: 30px;" class="cart-remove"></ion-icon>
</div>
  `;
};


function updateTotal(){
  const cartItem=document.querySelectorAll('.cart-box');
  const totalValue=document.querySelector('.total-price');

  let total=0;

  cartItem.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("$",""));
    let qty=product.querySelector('.cart-quantity').value;

    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="$"+(price*qty);
  });
  totalValue.innerHTML='$' +total;

  // Add food count
 const orderCount=document.querySelector('.order-count');
 let count=itemList.length;
 orderCount.innerHTML=count;

 if(count==0){
    orderCount.style.display='none';
 }else{
  orderCount.style.display='block';
 }
};


























window.onload=function(){
  document.getElementById("form").reset();
}

// newsletter forms

const form=document.querySelector('#form');
const fname=document.querySelector('#fullName');
const email=document.querySelector('#email');
const number=document.querySelector('#number');
const foodname=document.querySelector('#foodName');

// window.load=function(){
//   document.getElementById("form").reset();
// }

form.addEventListener('submit',(e)=>{

  // if(!formValidation()){
  //   console.log("sdrftyujkhgfdsxdfgh")
  // }else{
    
    
    

    
    
  //    window.location.href="order.html"
  // }
  
    e.preventDefault();
    let usernameval=fname.value.trim();
    let emailval=email.value.trim();
    let numberval=number.value.trim();
    let foodnameval=foodname.value.trim();
    let success=true
  
    analytics.track('form_submission',{
      name1:usernameval,
      email1:emailval
     })
  
  
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
  
    if(success){
      setTimeout(function(){
        window.location.href="thankyou.html"
      },5000)
      
    }
  
    
  
  
  
 
});

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




// Customer Experience Digital Data Layer = Ceddl

// digital.dataLayer=digital.dataLayer || []

// digital.dataLayer



// window.adobeDataLayer = window.adobeDataLayer || [];
// var myHandler = function(email) {
//     console.log(email.value);
// };
// window.adobeDataLayer.push(function(dl) {
//     dl.getState();
//     dl.addEventListener("click", myHandler);
// });

