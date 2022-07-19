const add_post_form = document.getElementById('add_post_form');
const edit_post_form = document.getElementById('edit_post_form');
const msg = document.querySelector('.msg');
const dyes = document.querySelector('.dyes');
const all_post = document.querySelector('.all-post');


const getAllData = () => {
	let data = getData('fpost');
    let list = '';
	if (!data) {
		all_post.innerHTML = '';
	}
	if (data) {
		data.map((item, index) => {

			list += all_post.innerHTML = `
            <div class="timeline shadow-sm my-3">
            <div class="card">
                <div class="card-body">
                    <div class="user-info">
                        <img src="${item.aphoto}" alt="">
                        <div class="info-details">
                            <span>${item.aname}</span>
                            <span>2 h . <i class="fas fa-globe-asia"></i></span>
                        </div>
                    </div>
                    <div class="dropdown">
                        <a class="dropdown-toggle" href="#" data-bs-toggle="dropdown">
                            <i class="fas fa-ellipsis-h"></i>
                        </a>
                      
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                          <li><a class="dropdown-item post_edit" data-bs-toggle="modal" post_index = "${index}" href="#edit_post_modal">Edit</a></li>
                          <li><a class="dropdown-item post_delete dyes" post_index = "${index}" data-bs-toggle="modal" href="#delete_post_modal">Delete</a></li>                                      
                        </ul>
                    </div>


                </div>
                <div class="post-content my-2">
                    <p>${item.acontent}</p>
                </div>
                <div class="post-content-image my-2">
                    <img class="w-100" src="${item.cphoto}" alt="">
                </div>
            </div>
            
        </div>
        `;
		});
	
		all_post.innerHTML = list;
	}
};
getAllData();



add_post_form.onsubmit = (e) =>{
    e.preventDefault();

    let form_data = new FormData(e.target);
    let data = Object.fromEntries(form_data.entries());
    let {aname,aphoto,acontent,cphoto} = Object.fromEntries(form_data.entries());
    
    if (!aname || !aphoto || !acontent || !cphoto) {
        msg.innerHTML = setAlert('All Fields are Required !');
    }else{
        msg.innerHTML = setAlert('Post Upload Successfully !', 'success');


       
       let timeout =  setTimeout(() => {
        msg.innerHTML = '';
        }, 1500);
        clearTimeout(timeout);

        sendData('fpost', data );
        getAllData();
        e.target.reset();

    }
}


all_post.onclick =(e) => {
    e.preventDefault();

    if (e.target.classList.contains('post_edit')) {
        let index = e.target.getAttribute('post_index');
        
        let data = getData('fpost');
        let {aname,aphoto,acontent,cphoto} = data[index];

        edit_post_form.innerHTML = `
                <div class="my-3">
                    <label for="">Author's Name</label>
                    <input class="form-control" name="aname" type="text" value="${aname}">
                </div>

                <div class="my-3">
                    <label for="">Author's Photo</label>
                    <input class="form-control" name="aphoto" type="text" value="${aphoto}">
                </div>

                <div class="my-3">
                    <label for="">Author's Content</label>
                    <input name="acontent" type="text" value="${acontent}" class="form-control">
                </div>

                <div class="my-3">
                    <input class="form-control" name="index" type="hidden" value="${index}">
                </div>

                <div class="my-3">
                    <label for="">Content Photo</label>
                    <input class="form-control" name="cphoto" type="text" value="${cphoto}">
                </div>

                <div class="my-3">
                    <input class="btn btn-info w-100" type="submit" data-bs-dismiss="modal" value="Edit Post">
                </div>
                    
                    
        `

        
    }

    if (e.target.classList.contains('post_delete')) {
        
       if (e.target.classList.contains('dyes')) {
          let index =   e.target.getAttribute('post_index');
          dyes.onclick = (e)=>{
             let data = getData('fpost');
        
          data.splice(index, 1);
          update('fpost', data);
          getAllData();
          }
       }

      
}
}




edit_post_form.onsubmit = (e)=>{
    e.preventDefault();

    let form_data = new FormData(e.target);
    // let fdata = Object.fromEntries(form_data.entries());
    let {aname,aphoto,acontent,cphoto,index} = Object.fromEntries(form_data.entries());


    let data = getData('fpost');
 
    data[index] = {aname,aphoto,acontent,cphoto};
    update('fpost', data);
    getAllData();



}


