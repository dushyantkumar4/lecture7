const BASE_URL="https://api.currencyapi.com/v3/latest?apikey=cur_live_vGluw64aURcQpHIsR0jZtIfzD034vH0UoVrVISdk";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const ToCurr=document.querySelector(".To select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for (currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected=true;
        }else if(select.name==="To" && currCode==="INR"){
            newOption.selected=true;
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
        updateExchange();
    })
}

const updateExchange= async ()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal < 1){
        amtVal=1;
        amount.value="1";
    }
    const URL=`${BASE_URL}&currencies[]=${fromCurr.value}&currencies[]=${ToCurr.value}`;
    let response=await fetch(URL);
    let data=await response.json();
    let ToVal=ToCurr.value;
    let rate=data.data[ToVal].value;
    let finalVal=rate*amtVal;
    msg.innerText=`${amtVal} ${fromCurr.value}=${finalVal} ${ToCurr.value}`;
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchange();
});

window.addEventListener("load",()=>{
    updateExchange();
});