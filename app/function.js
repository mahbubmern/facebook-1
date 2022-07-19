const setAlert = (msg, type="danger") => {
    return	`<p class="alert alert-${type} d-flex justify-content-between">${msg}<button class="btn-close" data-bs-dismiss="alert"></button></p>`
}

const sendData = (key, value) =>{

    let data = [];

    if (localStorage.getItem(key)) {
        data = JSON.parse(localStorage.getItem(key));
    }
    data.push(value);
    localStorage.setItem(key, JSON.stringify(data));
}

const getData = (key)=>{
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    } else {
        return false;
    }
    }
    
    
const update = (key,array)=>{
    localStorage.setItem(key, JSON.stringify(array));
}