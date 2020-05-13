// if(window.location.href.includes("pistis"))
// {
 window.Mercadopago.setPublishableKey("APP_USR-81d9e35b-b63a-4cab-9f60-29bb3f4588d1");
// }
// else{
  //  window.Mercadopago.setPublishableKey("TEST-a7a9a509-5203-401a-b38b-439dd243427b");
//}

var cardTokenId="";
var paymentmethodid;
var email;
var userid;
var sendUrl="";
var amount;
var description;
var amount;
var formData;
  function getBin(cardnumber) {
      return cardnumber.substring(0,6);
  }

  function setPaymentMethodInfo(status, response) {
      if (status == 200) {
          const paymentMethodElement = document.querySelector('input[name=paymentMethodId]');
          if (paymentMethodElement) {
            paymentmethodid=response[0].id;
              paymentMethodElement.value = response[0].id;
              
          } else {
              const input = document.createElement('input');
              input.setattribute('name', 'paymentMethodId');
              input.setAttribute('type', 'hidden');
              input.setAttribute('value', response[0].id);
              form.appendChild(input);
          }
      } else {
          //alert(`payment method info error: ${response}`);
      }
  };
  function getpaymentmethod(cardnumber){
      
  Mercadopago.getPaymentMethod({
      "bin": getBin(cardnumber)
  }, setPaymentMethodInfo);

  }
  var doSubmit = false;
 function createtoken(data){
     
     window.Mercadopago.clearSession();
      if (!doSubmit) {
          
          var $form=data;
        window.Mercadopago.createToken($form,sdkResponseHandler); // The function "sdkResponseHandler" is defined below
            
         return false;
      }
  

   function sdkResponseHandler(status, response) {
        
      if (status != 200 && status != 201) {
          
        localStorage.setItem("PaymentStatus",response.message);
      } 
      else {
        var form = data;
        var card = document.createElement('input');
        form.token=response.id
        cardTokenId=response.id;
        amount=data.Amount;
        email=data.email;
        userid=data.UserId;
        description=data.Description;
        //paymentmethodid=data.paymentMethodId;
        doSubmit = true;
        //form.submit();
        // if(window.location.href.includes("pistis")){
        //     sendUrl="https://psapsolutions.com/api/payment/mercadoPayment";
    
        //         }
        //         else if(window.location.href.includes("localhost")){
        //             
        //         sendUrl= "https://localhost:44343/api/payment/mercadoPayment";
        //         }
        //         else
        //         sendUrl="http://api.sathfere.com/api/payment/mercadoPayment",


        $.ajax({
          //url:"https://localhost:44343/api/payment/mercadoPayment",
            url:"https://psapsolutions.com/api/payment/mercadoPayment",
            //url:"http://localhost:44343/api/payment/mercadoPayment",
            method:'GET',
            data:{token: cardTokenId,
            amount:amount,
            email:email,
            paymentmethodid:paymentmethodid,
            userid:userid,
            description:description,
            },
            crossDomain: true,
            contentType: 'application/json; charset=utf-8',
            success:function(data){
                 
                //alert(data.StatusDetail)
                localStorage.setItem("PaymentId",data.paymentID);
                localStorage.setItem("PaymentStatus",data.StatusDetail);
                doSubmit = false;
            },
            error:function(err){
                
localStorage.setItem("PaymentStatus","Payment Failed.Try Again");

            }
         })
            
       //localStorage.setItem("PaymentStatus","Payment Failed.Try Again");  
          
      }
  };
  
 }

    
  function getCardId(){
      
    if(doSubmit)
    {
       
      if(cardTokenId!="")
      return cardTokenId
      
  }
}
  export { createtoken,getpaymentmethod,installment,createEmiToken};

  $('.carousel.carousel-multi-item.v-2 .carousel-item').each(function(){
    var next = $(this).next();
    if (!next.length) {
    next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
    
    for (var i=0;i<4;i++) {
    next=next.next();
    if (!next.length) {
    next=$(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
    }
    });
//Installments
var IssuerId
var Plan=[]
var InstallmentRate
var InstallmentAmount

function installment(cardnumber,amount){
    
    //window.Mercadopago.clearSession();
Mercadopago.getInstallments({
  "bin": getBin(cardnumber),
  "amount": amount
}, setInstallmentInfo);
}


function setInstallmentInfo(status, response) {
    
  if (status == 200) {
      
        paymentmethodid=response[0].payment_method_id;
IssuerId=response[0].issuer.id;
InstallmentRate=response[0].payer_costs[0].installment_rate;
Plan=response[0].payer_costs;
debugger
localStorage.setItem("plans",JSON.stringify(Plan));
localStorage.setItem("IssuerId",IssuerId)
      } else {
          alert("not successfull! refresh and refill the information")
      }
  } 


  function createEmiToken(data){
    
    window.Mercadopago.clearSession();
        if(!data.installments)
        {
            return false
        }
        formData=data;
        var $form=data;
        window.Mercadopago.createToken($form,EmiHandler); // The function "sdkResponseHandler" is defined below
          
       return false;
  }
    


 function EmiHandler(status, response) {
      
    if (status != 200 && status != 201) {
        localStorage.setItem("PaymentStatus",response.message);
    } 
    else {
       
      var  data=formData;
      var form = data;
      var card = document.createElement('input');
var model={token:response.id,totalAmount:data.Amount,email:data.email,
userid:data.userId,installments:data.installments,InstallmentRate:data.installmentRate,
InstallmentAmount:data.installmentamount,IssuerId:data.IssuerId,PaymentMethodId:paymentmethodid
 };
// if(window.location.href.includes("pistis")){
//     sendUrl="https://psapsolutions.com/api/payment/mercadoInstallment";

//         }
//         else if(window.location.href.includes("localhost")){
        
//         sendUrl= "https:///localhost:44343api/payment/mercadoInstallment";
//         }
//         else
//         sendUrl="http://api.sathfere.com/api/payment/mercadoInstallment";
      
      $.ajax({
        url:"https://psapsolutions.com/api/payment/mercadoInstallment",
       //url:"http://api.sathfere.com/api/payment/mercadoInstallment",
          method:'Get',
          data:{
              token: response.id,
            amount:data.Amount,       
            email:data.email,
            PaymentMethodId:paymentmethodid,
            userid:data.userId,
           
            installments:data.installments,
            InstallmentAmount:data.installmentamount,
            IssuerId:data.IssuerId,
           // InstallmentRate:data.installmentRate,
           
            description:"Selected Items Pistis"
          },
          crossDomain: true,
          contentType: 'application/json; charset=utf-8',
         //dataType:'jsonp',
          success:function(data){
               
              //alert(data.PaymentId)

              localStorage.setItem("PaymentId",data.paymentID);
              localStorage.setItem("PaymentStatus",data.StatusDetail);
             
          },
          error:function(err){
              
            localStorage.setItem("PaymentStatus","Error occured");
            
//alert(JSON.stringify(err))
//alert("Pago fallido. Detalles de la tarjeta de cheques")
          }
       })
          
       //localStorage.setItem("PaymentStatus","Payment Failed.Try Again");  
    }
};






  