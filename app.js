   let getFact=document.querySelector("#ques");
   let ans=document.querySelector("#ans");
   let btn=document.querySelector("#btn");

   btn.addEventListener("click",fetchData);


    const url="https://official-joke-api.appspot.com/random_joke";
    
    async function fetchData() {
        console.log("fatching data....");
        let responce= await fetch(url);
        let data = await responce.json();
        getFact.innerText=data.setup;
        ans.innerText=data.punchline;

    }


    // function fetchData(){
    //     fetch(url).then((response)=>{
    //         return response.json();
    //     }).then((data)=>{
    //         getFact.innerText=data.setup;
    //         ans.innerText=data.punchline;
    //     }).catch((err)=>{
    //         console.log(err);
    //     });
    // }
    

