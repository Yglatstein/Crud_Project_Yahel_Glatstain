let tags = {
  "tag-red": "Social",
  "tag-brown": "Economics",
  "tag-blue": "Technology"
}

async function handleUserLogin(event){
    event.preventDefault();
    try {
        const password = event.target.elements.passwordLogin.value;
        const email = event.target.elements.emailLogin.value;
        console.log("password: " , password)
        //@ts-ignore
        const { data } = await axios.post("/api/users/login", {email, password});
        console.log("recived: ", data);
        if(data.success){
            window.location.href= "welcome.html"
        }
      } catch (error) {
        console.error(error);
      }
  }

  async function handleUserRegistration(event){
    event.preventDefault();
    try {
        const email = event.target.elements.emailRegister.value;
        console.log(email)
        const name = event.target.elements.nameRegister.value;
        console.log(name)
        const imageLink = event.target.elements.imageLinkRegister.value;
        const password = event.target.elements.passwordRegister.value;
        console.log("password: " , password)
        //@ts-ignore
        const { data } = await axios.post("/api/users/register", {email, password, imageLink, name});
        console.log("recived: ", data);
      } catch (error) {
        console.error(error);
      }
  }

  async function getUserDataByCookie(){
    try {
        //@ts-ignore
        const { data } = await axios.get("/api/users/by-cookie");

        getAllPosts()
        
      } catch (error) {
        console.error(error);
      }
  }

  async function getAllPosts() {
    //@ts-ignore
    const { data } = await axios.get("/api/posts");

    let blogHtml = document.getElementsByClassName("blog-area")[0] as HTMLDivElement

    blogHtml.innerHTML = ''
    for(let i = 0; i < data.postsDB.length; i++){
      renderPosts(data.postsDB[i])
    }
  }

  async function renderPosts(post) {
    let blogHtml = document.getElementsByClassName("blog-area")[0] as HTMLDivElement

    let tags = {
      "tag-red": "Social",
      "tag-brown": "Economics",
      "tag-blue": "Technology"
    }

    //@ts-ignore
    const { data } = await axios.get("/api/users/by-cookie");

    const id = post._id
    const title = post.title
    const text = post.text
    const tag = post.tag
    const userId = post.userId

    let newPost = document.createElement("div")
    newPost.classList.add('post')
    newPost.id = id

    let postBody = document.createElement("div")
    postBody.classList.add('post_body')
    let postTag = document.createElement("span")
    postTag.classList.add("tag")
    postTag.classList.add(tag)

    postTag.innerText = tags[tag]
    let postTitle = document.createElement("h4")
    postTitle.innerText = title
    let postText = document.createElement("p")
    postText.innerText = text
    postBody.appendChild(postTag)
    postBody.appendChild(postTitle)
    postBody.appendChild(postText)

    let postFooter = document.createElement("div")
    postFooter.classList.add('post_footer')
    let postUser = document.createElement("div")
    postUser.classList.add("user")
    let userImage = document.createElement("img")
    userImage.classList.add("user_image")
    userImage.src = data.image
    let userInfo = document.createElement("div")
    userInfo.classList.add("user_info")
    let userName = document.createElement("h5")
    let editPost = document.createElement("img")
    editPost.src = "https://cdn.icon-icons.com/icons2/931/PNG/512/edit_modify_icon-icons.com_72390.png"
    editPost.classList.add("edit_image")
    editPost.setAttribute("id", id)
    editPost.addEventListener('click', openUpdateForm)
    let deletePost = document.createElement("img")
    deletePost.src = "https://cdn-icons-png.flaticon.com/512/2891/2891491.png"
    deletePost.classList.add("delete_image", id)
    deletePost.addEventListener('click', handleDeletePost)
    userName.innerText = data.name
    userInfo.appendChild(userName)
    postUser.appendChild(userImage)
    postUser.appendChild(userInfo)
    postUser.appendChild(editPost)
    postUser.appendChild(deletePost)
    postFooter.appendChild(postUser)
    
    newPost.appendChild(postBody)
    newPost.appendChild(postFooter)

    blogHtml.appendChild(newPost)

  }

  async function handleCheckAvailableConnection(){
    try{
      //@ts-ignore
      const { data } = await axios.get("/api/users/by-cookie");
      const { userName } = data;
      if(data){
        window.location.href = "./welcome.html";
      }
      console.log("here" , data)
    } catch (error){
      console.log(error);
    }
  }

  async function handleLogout(event){
    event.preventDefault();
    try{
      //@ts-ignore
      const { data } = await axios.get("/api/users/logout");
      window.location.href = "./index.html";
    } catch (error){
      console.log(error)
    }
    
  }

  async function handleDeletePost(event){
    try {
      event.preventDefault();
      let tempId = event.target.className as string;
      const id = tempId.split(" ")[1]
      
      console.log("API: ", `/api/posts/${id}`)
      //@ts-ignore
      const { data } = await axios.delete(`/api/posts/${id}`);
      console.log(data);
      getAllPosts()

    } catch (error) {
      console.error(error.messasge)
    }
  }

  async function handleAddPost(event) {
    event.preventDefault()  
    try{
      console.log("here")
      const title = event.target.elements.newPostTitle.value;
      console.log(title)
      const text = event.target.elements.newPostText.value;
      console.log(text)
      const tag = event.target.elements.newPostTag.value;
      //@ts-ignore
      const { data } = await axios.post("/api/posts/add", {title, text, tag});
      console.log("recived: ", data);
      getAllPosts()

      event.target.elements.newPostTitle.value =''
      event.target.elements.newPostText.value = ''
      event.target.elements.newPostTag.value = '' 

      let newPostForm = document.getElementById("addNewPostForm")
      newPostForm.style.display = 'none'

    }catch (error) {
      console.error(error.messasge)
    }
  }


  async function handleEditPost(event){
    event.preventDefault()
    try{
      console.log("here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      
      let id = event.target.id
      console.log("target", event.target)
      // const postId = id.split(" ")[1]
    
      let updatePostTitle = document.getElementById("updatePostTitle") as HTMLInputElement
      let updatedTitle = updatePostTitle.value
      let updatePostText = document.getElementById("updatePostText") as HTMLInputElement
      let updatedText = updatePostText.value
      let updatePostTag = document.getElementById("updatePostTag") as HTMLInputElement  
      let updatedTag = updatePostTag.value    

      
      //@ts-ignore
      const { data } = await axios.patch(`/api/posts/${id}` , {updatedTitle, updatedText, updatedTag});
      console.log("recived: ", data);

      getAllPosts()

      event.target.elements.updatedTitle.value =''
      event.target.elements.updatedText.value = ''
      event.target.elements.updatedTag.value = '' 

      let updatePostForm = document.getElementById("updatePostForm")
      updatePostForm.style.display = 'none'


    }catch (error) {
      console.error(error.messasge)
    }
  }

  function closeForm(){
    let newPostForm = document.getElementById("addNewPostForm")
    newPostForm.style.display = 'none'
    let updatePostForm = document.getElementById("updatePostForm")
    updatePostForm.style.display = 'none'
  }

  function openAddForm(){
    let newPostForm = document.getElementById("addNewPostForm")
    newPostForm.style.display = 'block'
  }

  async function openUpdateForm(event){
    let postId = event.target.id
    
    let updatePostForm = document.getElementById("updatePostForm")
    updatePostForm.style.display = 'block'

    const editForm = document.querySelector('.editForm');
    console.log(editForm)
    editForm.setAttribute("id", postId)

     //@ts-ignore
     const { data } = await axios.get(`/api/posts/${postId}`);
     console.log("recived: ", data);

    let updatePostTitle = document.getElementById("updatePostTitle") as HTMLInputElement
    updatePostTitle.value = data.title
    let updatePostText = document.getElementById("updatePostText") as HTMLInputElement
    updatePostText.value = data.text
    let updatePostTag = document.getElementById("updatePostTag") as HTMLInputElement
    updatePostTag.value = data.tag

  }
  

  async function handleSearch(event) {
    event.preventDefault()
    try {

      console.log("here")
      const searchString = event.target.elements[0].value;
      console.log(searchString);
      
      //@ts-ignore
      const { data } = await axios.post(`/api/posts/search`, {searchString});
      const { postsDB } = data;
      console.log(postsDB);

      if(postsDB){
        let blogHtml = document.getElementsByClassName("blog-area")[0] as HTMLDivElement
        blogHtml.innerHTML = ''
        for(let i = 0; i<= postsDB.length; i++){
          renderPosts(postsDB[i])
        }
      }
      
  
      // // renderListToRoot(usersDB)
    } catch (error) {
      console.error(error);
    }
  }