function show(name,air_date,episode){
    let li = document.createElement('li');
    let br = document.createElement('br');
    li.innerHTML= "NAME: "+name+ "<br />AIR DATE: "+air_date+"<br />EPISODE: "+episode;
    let list = document.getElementById("list")
    list.appendChild(li);
    list.appendChild(br)
}

function pages(page){
    let nextPage = null;
    if (page != null){
        fetch(page)
        .then (response => response.json())
        .then (ep => {
            ep.results.forEach(ep => show(ep.name,ep.air_date,ep.episode))
        })
        .catch (function(){console.log('didnt work :c')});
    }
}

function search(){
    const list = document.getElementById("list");
    const value = document.getElementById("t1").value;
    if (value != ""){
        let URL= "https://rickandmortyapi.com/api/episode/?name="+value;
        fetch(URL)
        .then (response => response.json())
        .then (ep => {
            while(list.firstChild!= null){
                list.removeChild(list.firstChild);
            }
            ep.results.forEach(ep => show(ep.name,ep.air_date,ep.episode))
        })
        .catch (function(){list.innerHTML='That text is not in the title of any episode. Try another!'});
    }
    else
    list.innerHTML='That text is not in the title of any episode. Try another!'
}    

function change(){
    const value = document.getElementById("page").value; 
    const list = document.getElementById("list");
    while(list.firstChild!= null){
        list.removeChild(list.firstChild);
    }
    let page = 'https://rickandmortyapi.com/api/episode?page='+value;
    pages(page);
}