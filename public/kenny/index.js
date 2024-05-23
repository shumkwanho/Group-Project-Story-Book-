

// Get All messages
async function getAllmessages(){
    // 去返router 既 get comment
    let res = await fetch("../comment")

    let response = await res.json();
    // 記得console 返response 係HTML睇返
    // console.log(response);

    if(res.ok) {

        let target = document.querySelector(".messageArea");
        for (let comment of response.comments) {

            // 唔好係而個位 console.log
            // console.log(comment)
            
            target.innerHTML += `

            <div class="displayMessage" id="message-${comment.id}">
            <div class="userName">${comment.username}</div>
            <div class="userText">${comment.content}</div>
            <button class="delete-btn" onclick="deletemessageById(${comment.id},event)"> Delete</button>
            <button class="edit-btn"> Edit</button>
            </div>
            `

            
        }
    }
}

// create comment
document.querySelector("#postcomment").addEventListener("submit", async (e)=>{
    e.preventDefault()

    let content = document.querySelector("#text").value;

    let res = await fetch("../comment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content })
    })
})

//edit comment
async function editcommentById (event, id){
    
}


// Delete comment
async function deletemessageById(id, event){
    event.preventDefault();

    let commentId = id

    try{
        let res = await fetch(`../comment/`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ commentId })
        });

        if(res.ok){
            window.location.reload();
            console.log("you are delete success");
        } else {
            console.error("Error deleting",res.status)
        }
    } catch (error){
        console.error("Error deleting",error)
    }
}


getAllmessages()