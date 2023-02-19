var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var tags = {
    "tag-red": "Social",
    "tag-brown": "Economics",
    "tag-blue": "Technology"
};
function handleUserLogin(event) {
    return __awaiter(this, void 0, void 0, function () {
        var password, email, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    password = event.target.elements.passwordLogin.value;
                    email = event.target.elements.emailLogin.value;
                    console.log("password: ", password);
                    return [4 /*yield*/, axios.post("/api/users/login", { email: email, password: password })];
                case 2:
                    data = (_a.sent()).data;
                    console.log("recived: ", data);
                    if (data.success) {
                        window.location.href = "welcome.html";
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function handleUserRegistration(event) {
    return __awaiter(this, void 0, void 0, function () {
        var email, name, imageLink, password, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    email = event.target.elements.emailRegister.value;
                    console.log(email);
                    name = event.target.elements.nameRegister.value;
                    console.log(name);
                    imageLink = event.target.elements.imageLinkRegister.value;
                    password = event.target.elements.passwordRegister.value;
                    console.log("password: ", password);
                    return [4 /*yield*/, axios.post("/api/users/register", { email: email, password: password, imageLink: imageLink, name: name })];
                case 2:
                    data = (_a.sent()).data;
                    console.log("recived: ", data);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getUserDataByCookie() {
    return __awaiter(this, void 0, void 0, function () {
        var data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("/api/users/by-cookie")];
                case 1:
                    data = (_a.sent()).data;
                    getAllPosts();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getAllPosts() {
    return __awaiter(this, void 0, void 0, function () {
        var data, blogHtml, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.get("/api/posts")];
                case 1:
                    data = (_a.sent()).data;
                    blogHtml = document.getElementsByClassName("blog-area")[0];
                    blogHtml.innerHTML = '';
                    for (i = 0; i < data.postsDB.length; i++) {
                        renderPosts(data.postsDB[i]);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function renderPosts(post) {
    return __awaiter(this, void 0, void 0, function () {
        var blogHtml, tags, data, id, title, text, tag, userId, newPost, postBody, postTag, postTitle, postText, postFooter, postUser, userImage, userInfo, userName, editPost, deletePost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blogHtml = document.getElementsByClassName("blog-area")[0];
                    tags = {
                        "tag-red": "Social",
                        "tag-brown": "Economics",
                        "tag-blue": "Technology"
                    };
                    return [4 /*yield*/, axios.get("/api/users/by-cookie")];
                case 1:
                    data = (_a.sent()).data;
                    id = post._id;
                    title = post.title;
                    text = post.text;
                    tag = post.tag;
                    userId = post.userId;
                    newPost = document.createElement("div");
                    newPost.classList.add('post');
                    newPost.id = id;
                    postBody = document.createElement("div");
                    postBody.classList.add('post_body');
                    postTag = document.createElement("span");
                    postTag.classList.add("tag");
                    postTag.classList.add(tag);
                    postTag.innerText = tags[tag];
                    postTitle = document.createElement("h4");
                    postTitle.innerText = title;
                    postText = document.createElement("p");
                    postText.innerText = text;
                    postBody.appendChild(postTag);
                    postBody.appendChild(postTitle);
                    postBody.appendChild(postText);
                    postFooter = document.createElement("div");
                    postFooter.classList.add('post_footer');
                    postUser = document.createElement("div");
                    postUser.classList.add("user");
                    userImage = document.createElement("img");
                    userImage.classList.add("user_image");
                    userImage.src = data.image;
                    userInfo = document.createElement("div");
                    userInfo.classList.add("user_info");
                    userName = document.createElement("h5");
                    editPost = document.createElement("img");
                    editPost.src = "https://cdn.icon-icons.com/icons2/931/PNG/512/edit_modify_icon-icons.com_72390.png";
                    editPost.classList.add("edit_image");
                    editPost.setAttribute("id", id);
                    editPost.addEventListener('click', openUpdateForm);
                    deletePost = document.createElement("img");
                    deletePost.src = "https://cdn-icons-png.flaticon.com/512/2891/2891491.png";
                    deletePost.classList.add("delete_image", id);
                    deletePost.addEventListener('click', handleDeletePost);
                    userName.innerText = data.name;
                    userInfo.appendChild(userName);
                    postUser.appendChild(userImage);
                    postUser.appendChild(userInfo);
                    postUser.appendChild(editPost);
                    postUser.appendChild(deletePost);
                    postFooter.appendChild(postUser);
                    newPost.appendChild(postBody);
                    newPost.appendChild(postFooter);
                    blogHtml.appendChild(newPost);
                    return [2 /*return*/];
            }
        });
    });
}
function handleCheckAvailableConnection() {
    return __awaiter(this, void 0, void 0, function () {
        var data, userName, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("/api/users/by-cookie")];
                case 1:
                    data = (_a.sent()).data;
                    userName = data.userName;
                    if (data) {
                        window.location.href = "./welcome.html";
                    }
                    console.log("here", data);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.log(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleLogout(event) {
    return __awaiter(this, void 0, void 0, function () {
        var data, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.get("/api/users/logout")];
                case 2:
                    data = (_a.sent()).data;
                    window.location.href = "./index.html";
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    console.log(error_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function handleDeletePost(event) {
    return __awaiter(this, void 0, void 0, function () {
        var tempId, id, data, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    event.preventDefault();
                    tempId = event.target.className;
                    id = tempId.split(" ")[1];
                    console.log("API: ", "/api/posts/" + id);
                    return [4 /*yield*/, axios["delete"]("/api/posts/" + id)];
                case 1:
                    data = (_a.sent()).data;
                    console.log(data);
                    getAllPosts();
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    console.error(error_6.messasge);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleAddPost(event) {
    return __awaiter(this, void 0, void 0, function () {
        var title, text, tag, data, newPostForm, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    console.log("here");
                    title = event.target.elements.newPostTitle.value;
                    console.log(title);
                    text = event.target.elements.newPostText.value;
                    console.log(text);
                    tag = event.target.elements.newPostTag.value;
                    return [4 /*yield*/, axios.post("/api/posts/add", { title: title, text: text, tag: tag })];
                case 2:
                    data = (_a.sent()).data;
                    console.log("recived: ", data);
                    getAllPosts();
                    event.target.elements.newPostTitle.value = '';
                    event.target.elements.newPostText.value = '';
                    event.target.elements.newPostTag.value = '';
                    newPostForm = document.getElementById("addNewPostForm");
                    newPostForm.style.display = 'none';
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _a.sent();
                    console.error(error_7.messasge);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function handleEditPost(event) {
    return __awaiter(this, void 0, void 0, function () {
        var id, updatePostTitle, updatedTitle, updatePostText, updatedText, updatePostTag, updatedTag, data, updatePostForm, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    console.log("here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    id = event.target.id;
                    console.log("target", event.target);
                    updatePostTitle = document.getElementById("updatePostTitle");
                    updatedTitle = updatePostTitle.value;
                    updatePostText = document.getElementById("updatePostText");
                    updatedText = updatePostText.value;
                    updatePostTag = document.getElementById("updatePostTag");
                    updatedTag = updatePostTag.value;
                    return [4 /*yield*/, axios.patch("/api/posts/" + id, { updatedTitle: updatedTitle, updatedText: updatedText, updatedTag: updatedTag })];
                case 2:
                    data = (_a.sent()).data;
                    console.log("recived: ", data);
                    getAllPosts();
                    event.target.elements.updatedTitle.value = '';
                    event.target.elements.updatedText.value = '';
                    event.target.elements.updatedTag.value = '';
                    updatePostForm = document.getElementById("updatePostForm");
                    updatePostForm.style.display = 'none';
                    return [3 /*break*/, 4];
                case 3:
                    error_8 = _a.sent();
                    console.error(error_8.messasge);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function closeForm() {
    var newPostForm = document.getElementById("addNewPostForm");
    newPostForm.style.display = 'none';
    var updatePostForm = document.getElementById("updatePostForm");
    updatePostForm.style.display = 'none';
}
function openAddForm() {
    var newPostForm = document.getElementById("addNewPostForm");
    newPostForm.style.display = 'block';
}
function openUpdateForm(event) {
    return __awaiter(this, void 0, void 0, function () {
        var postId, updatePostForm, editForm, data, updatePostTitle, updatePostText, updatePostTag;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postId = event.target.id;
                    updatePostForm = document.getElementById("updatePostForm");
                    updatePostForm.style.display = 'block';
                    editForm = document.querySelector('.editForm');
                    console.log(editForm);
                    editForm.setAttribute("id", postId);
                    return [4 /*yield*/, axios.get("/api/posts/" + postId)];
                case 1:
                    data = (_a.sent()).data;
                    console.log("recived: ", data);
                    updatePostTitle = document.getElementById("updatePostTitle");
                    updatePostTitle.value = data.title;
                    updatePostText = document.getElementById("updatePostText");
                    updatePostText.value = data.text;
                    updatePostTag = document.getElementById("updatePostTag");
                    updatePostTag.value = data.tag;
                    return [2 /*return*/];
            }
        });
    });
}
function handleSearch(event) {
    return __awaiter(this, void 0, void 0, function () {
        var searchString, data, postsDB, blogHtml, i, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    console.log("here");
                    searchString = event.target.elements[0].value;
                    console.log(searchString);
                    return [4 /*yield*/, axios.post("/api/posts/search", { searchString: searchString })];
                case 2:
                    data = (_a.sent()).data;
                    postsDB = data.postsDB;
                    console.log(postsDB);
                    if (postsDB) {
                        blogHtml = document.getElementsByClassName("blog-area")[0];
                        blogHtml.innerHTML = '';
                        for (i = 0; i <= postsDB.length; i++) {
                            renderPosts(postsDB[i]);
                        }
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_9 = _a.sent();
                    console.error(error_9);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
