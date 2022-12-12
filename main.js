const baseURL = "https://esdexamen.tk/b1devweb/api/"

const mainContainer = document.querySelector("#mainContainer")
const secondContainer = document.querySelector("#secondContainer")
const buttonGetPosts = document.querySelector('#buttonGetPosts')
const buttonRegPage = document.querySelector("#buttonRegPage")
const buttonLoginPage = document.querySelector('#buttonLoginPage')
let token = null
let currentuser = null


buttonRegPage.addEventListener('click', displayRegisterPage)
buttonGetPosts.addEventListener('click', displayPostsPage)
buttonLoginPage.addEventListener('click', displayLoginPage)




function clearMainContainer(){
    mainContainer.innerHTML= ""
    secondContainer.innerHTML = ""
}

function clearSecondContainer(){
    secondContainer.innerHTML = ""
}

function display(content){
    clearMainContainer()
    mainContainer.innerHTML=content
}

function displaySecondContainer(content){
    clearSecondContainer()
    secondContainer.innerHTML=content
}


function getPostTemplate(post){
    if (!token){
        let template = `
        <div class="card border-dark container mt-4 p-0">
            <div class="card-header">
                Ecrit par : ${post.user.username}
            </div>
            <div class="card-body">
                <p class="card-text">${post.content}</p>
            </div>
        </div>
        `
        return template
    }else{
        let template = `
        <div class="card border-dark container mt-4 p-0">
            <div class="card-header">
                Ecrit par : ${post.user.username}
            </div>
            <div class="card-body">
                <p class="card-text">${post.content}</p>
                <div>
                    <button class="linkSpecificPostPage btn specificPageButton" id="${post.id}">En savoir plus</button>
                </div>
            </div>
        </div>
        `
        return template
    }
}

function getPostsTemplate(posts){
    let postsTemplate = ""
    posts['hydra:member'].forEach(post=>{

        postsTemplate+=  getPostTemplate(post)
    })

    return postsTemplate

}

function getCommentTemplate(comment){
    if (comment.user.username == currentuser){
        let template = `
        <div class="card border-dark container mt-1 p-0">
            <div class="card-header">
                Ecrit par : ${comment.user.username}
            </div>
            <div class="card-body">
                <p class="card-text">${comment.content}</p>
                <button class="buttonModifyComment btn btn-warning" id="${comment.id}">modifier</button>
                <button class="buttonDeleteComment btn btn-danger" id="${comment.id}">supprimer</button>
            </div>
        </div>
    `
        return template
    }else{
        let template = `
        <div class="card border-dark container mt-1 p-0">
            <div class="card-header">
                Ecrit par : ${comment.user.username}
            </div>
            <div class="card-body">
                <p class="card-text">${comment.content}</p>
            </div>
        </div>
    `
        return template
    }
}

function getCommentsTemplate(specificPosts){
    let commentsTemplate=""
    specificPosts['comments'].forEach(comment =>{
        commentsTemplate+= getCommentTemplate(comment)
    })

    return commentsTemplate
}

function getSpecificPostTemplate(specificPost){
    if (specificPost.user.username == currentuser){
        let template = `
        <div class="card border-dark container mt-1 p-0">
            <div class="card-header">
                Ecrit par : ${specificPost.user.username}
            </div>
            <div class="card-body">
                <p class="card-text">${specificPost.content}</p>
            </div>
        </div>
            <div>
                <button class="buttonModify btn btn-warning" id="${specificPost.id}">modifier</button>
                <button class="buttonDelete btn btn-danger" id="${specificPost.id}">supprimer</button>
            </div>
        </div>
        <div class="d-flex justify-content-center mt-3 mb-3"><h3>COMMENTAIRES</h3></div>
    `
        return template
    }else{
        let template = `
        <div class="card border-dark container mt-1 p-0">
            <div class="card-header">
                Ecrit par : ${specificPost.user.username}
            </div>
            <div class="card-body">
                <p class="card-text">${specificPost.content}</p>
            </div>
        </div>
         <div class="d-flex justify-content-center mt-3 mb-3"   ><h3>COMMENTAIRES</h3></div>
    `
        return template
    }


}

function getLinkCreatePostTemplate(){
    if (!token){
        let template = `
            <p> Pour créer un post veuillez vous connecter</p>
        `
        return template
    }else{
        let template = `
            <button class="buttonCreatePostLink btn" id="linkToCreatePostPage">CREER UN POST</button>
        `
        return template
    }


}

function getCreatePostTemplate(){
    let template = `
        <label for="createPostTextArea">Créer un post</label>
        <textarea id="createPostTextArea" name="createPostTextArea" rows="5" cols="33"></textarea>
        <button type="submit" class="btn btn-primary" id="submitCreatePost">Create Post</button>
    `
    return template
}

function getDeletePageTemplate(){
    let template = `
    <div>
        <h2>Voulez-vous vraiment supprimer cet article ?</h2>
        <div>
            <button class=" btn btn-danger" id="buttonConfirmDelete">OUI</button>
            <button class="btn btn-success" id="buttonCancelDelete">NON</button>
        </div>
    </div>
    `
    return template
}

function getModifyPageTemplate(){
    let template = `
        <div>
            <textarea id="modifyPostTextArea" rows="5" cols="33"></textarea
        </div>
        <div>
            <button type="submit" class="btn btn-primary" id="buttonConfirmModify">MODIFIER</button>
            <button class="btn btn-success" id="buttonCancelModify">ANNULER</button>
        </div>
    `
    return template
}

function getRegisterTemplate(){
    let template = `
        <div class="test d-flex justify-content-start flex-column align-items-center ">
            <div class="loginAndRegisterPage text-center p-4">
                <h2>S'inscrire</h2>
                <div class="group">
                    <input type="text" id="regUsername">
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Nom d'utilisateur</label>
                </div>
                <div class="group">
                    <input type="password" id="regPassword">
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Mot de passe</label>
                </div>
                <button class="loginAndRegisterButton btn btn-success" id="register">S'inscrire</button>
            </div>
       </div> 
       `
    return template
}

function getLoginTemplate(){
    let template = `  
      <div class="test d-flex justify-content-start flex-column align-items-center ">
        <div class="loginAndRegisterPage text-center p-4">
            <h2>Se connecter</h2>
            <div class="group">
                <input type="text" id="usernameLogin">
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Nom d'utilisateur</label>
            </div>
            <div class="group">
                <input type="password" id="passwordLogin">
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Mot de passe</label>
            </div>
            <button class="loginAndRegisterButton btn btn-success" id="loginButton">Connexion</button>
         </div>
       </div> 
    `
    return template
}


async function displayPostsPage(){
        let createPost = ""
        let postsPage = ""
        getPostsFromApi().then(posts=>{
            postsPage+=getPostsTemplate(posts)
            createPost+=getLinkCreatePostTemplate()
            display(postsPage)
            displaySecondContainer(createPost)

            const linkToCreatePostPage = document.querySelector("#linkToCreatePostPage")
            linkToCreatePostPage.addEventListener("click", ()=>{
                displayCreatePostPage()
            })

            const tests = document.querySelectorAll(".linkSpecificPostPage")
            tests.forEach(test=>{
                test.addEventListener('click', ()=>{
                    displaySpecificPostPage(test.id)
                })

            })
        })
}

function displayCreatePostPage(){
    display(getCreatePostTemplate())
    const createPostTextArea = document.querySelector("#createPostTextArea")
    const submitCreatePost = document.querySelector("#submitCreatePost")
    submitCreatePost.addEventListener("click", ()=>{
        createPost()
    })
}

function displaySpecificPostPage(idPost){
    getSpecificPostFromApi(idPost).then(specificPost=>{
        display(getSpecificPostTemplate(specificPost))
        displaySecondContainer(getCommentsTemplate(specificPost))

        const buttonsDelete = document.querySelectorAll('.buttonDelete')
        buttonsDelete.forEach(buttonDelete =>{
            buttonDelete.addEventListener('click', ()=>{
                displayDeletePage(buttonDelete.id)
            })
        })

        const buttonsModify = document.querySelectorAll('.buttonModify')
        buttonsModify.forEach(buttonModify=>{
            buttonModify.addEventListener('click', ()=>{
                displayModifyPage(buttonModify.id)
            })
        })
    })
}

function displayDeletePage(postId){
    display(getDeletePageTemplate())
    const buttonConfirmDelete = document.querySelector('#buttonConfirmDelete')
    const buttonCancelDelete = document.querySelector('#buttonCancelDelete')
    buttonConfirmDelete.addEventListener('click',()=>{
        deletePost(postId)
    })
    buttonCancelDelete.addEventListener('click', displayPostsPage)
}

function displayModifyPage(postId){
    display(getModifyPageTemplate())
    const buttonConfirmModify = document.querySelector('#buttonConfirmModify')
    const buttonCancelModify = document.querySelector('#buttonCancelModify')
    buttonConfirmModify.addEventListener('click', ()=>{
        modifyPost(postId)
    })
    buttonCancelModify.addEventListener('click', displayPostsPage)
}

function displayRegisterPage(){

    display(getRegisterTemplate())

    const regUsername = document.querySelector("#regUsername")
    const regPassword = document.querySelector("#regPassword")
    const regButton = document.querySelector("#register")
    regButton.addEventListener("click", ()=>{
        if (regUsername.value == null || regUsername.value =="", regPassword.value == null || regPassword.value =="" ){
            displayRegisterPage()
        }else{
            register(regUsername.value, regPassword.value)
        }
    })

}

function displayLoginPage(){
    display(getLoginTemplate())
    const usernameLogin = document.querySelector('#usernameLogin')
    const passwordLogin = document.querySelector('#passwordLogin')
    const loginButton = document.querySelector('#loginButton')
    loginButton.addEventListener("click", ()=>{
        if (usernameLogin.value == null || usernameLogin.value == "", passwordLogin.value == null || passwordLogin.value == ""){
            displayLoginPage()
        }else{
            login()
        }
    })
}


async function getPostsFromApi(){

    let url = `${baseURL}posts`

    let fetchParams = {
        method : 'GET',
        headers : {
            "Content-Type": "application/json"
        }
    }

    return await fetch(url, fetchParams)
        .then(response=>response.json())
        .then(posts=>{
            return posts
        })
}

async function getSpecificPostFromApi(idPost){
    let url = `${baseURL}posts/${idPost}`
    let fetchParams = {
        method : 'GET',
        headers : {
            "Content-Type":"application/json",
            "Authorization" : `Bearer ${token}`
        }
    }
    return await fetch(url, fetchParams)
        .then(response=> response.json())
        .then(specificPost=>{
            return specificPost
        })
}

function createPost(){
    let url = `${baseURL}post`
    let body = {
        content : createPostTextArea.value
    }
    let bodySerialise = JSON.stringify(body)
    let fetchParams = {
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        method : "POST",
        body : bodySerialise
    }
    fetch(url, fetchParams)
        .then(response=>response.json())
        .then(()=> {
            displayPostsPage()
        })
}

function deletePost(postId){
    let url = `${baseURL}posts/${postId}`
    console.log(postId)
    let fetchParams = {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    }
    fetch(url, fetchParams)
        .then(response=>response.json())
        .then(()=> {
            displayPostsPage()
        })
}

function modifyPost(postId){
    let url = `${baseURL}posts/${postId}`
    let body = {
        content : modifyPostTextArea.value
    }

    let bodySerialise = JSON.stringify(body)

    let fetchParams = {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body: bodySerialise
    }
    fetch(url, fetchParams)
        .then(response=>response.json())
        .then(()=>{
            displayPostsPage()
        })
}

function register(){
    let url = `${baseURL}registeruser`
    let body = {
        username : regUsername.value,
        password : regPassword.value
    }

    let bodySerialise = JSON.stringify(body)

    let fetchParams = {
        method : "POST",
        body: bodySerialise
    }
    fetch(url, fetchParams)
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            displayLoginPage()
        })
}

function login(){
    let url = `${baseURL}login_check`
    let body = {
        username : usernameLogin.value,
        password : passwordLogin.value
    }

    let bodySerialise = JSON.stringify(body)
    let fetchParams = {
        headers:{"Content-Type":"application/json"},
        method : "POST",
        body: bodySerialise
    }
    fetch(url, fetchParams)
        .then(response=>response.json())
        .then(data=> {

            if(data.token){
                console.log(data)
                token = data.token
                currentuser = usernameLogin.value
                displayPostsPage()

            }else{
                displayLoginPage()
            }
        })
}

