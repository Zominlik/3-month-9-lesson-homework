let baseUrl = "https://64861ed1a795d24810b7ba35.mockapi.io/api";
let elWrapper = document.querySelector('wrapper');
let elForm = document.querySelector('form');
let elInput = document.querySelector('input');
let elBtn = document.querySelector('btn');
 
elForm.addEventListener("submit", async(event) =>{
    event.preventDefault();
    let info ={
        name: elInput.value,

    }
    let response = await fetch(`${baseUrl}/users`, {
        headers: {
            "content-Type": "appklication/json",
            // "authorization": "",
        },
        method: "POST",
        body: JSON.stringify(info),
    });
    if(response.status === 201){
        // let data = response.json();
        getData()
        elForm.reset();
    }else {
        alert((response).statusText)
    }
})
async function getData() {
    try {
        let response = await fetch(`${baseUrl}/users`);
        if(response.status === 200){
            let data = await response.json();
            // console.log(data);
            elWrapper.innerHTML("");
            let sitesData = data.reverse().map(user, () =>{
                let userWrapper = document.createElement('li');
                let elDeleteButton = document.createElement('button');
                elWrapper.append(elDeleteButton, userWrapper);
                elDeleteButton.textContent = "delete";
                userWrapper.textContent = user.name;
                userWrapper.setAttribute('data-id', user.id);
                // elWrapper.append(userWrapper);
                elDeleteButton.addEventListener('click',() =>{
                    let response = fetch(`${baseUrl}/users/${userWrapper.dataset.id}`,{
                        method: "DELETE",
                        if(response.status === 200) {
                            getData();
                        }else{
                            alert(response.statusText)
                        }
                    });
        
                })
            });
            
        }
        else{
            throw Error("error")
        }
    }
    catch (err){
        alert(err);
    }
}
getData();

