let url = "http://pacific-fjord-61332.herokuapp.com"
async function loadObs(){
    let response = await fetch(url+"/observatories");
    let elements = await response.json();
    let select1 = document.querySelector("#obs1");
    let select2 = document.querySelector("#obs2");
    let i = 0;
    for (let elt of elements){
        elt = elt.replace("[","")
        elt = elt.replace("]","")
        elt = elt.replaceAll("'","")
        for (let sel of [select1,select2]){
            let option = document.createElement("option");
            option.text = elt;
            option.value = i;
            sel.appendChild(option);
        }   
        i++
    }
    select2.value = 1
}
loadObs()
async function obsInfo(){
    let id1 = document.querySelector("#obs1").value;
    let id2 = document.querySelector("#obs2").value;
    let response = await fetch(url+"/observatories_info?id1="+id1+"&id2="+id2+"&remarks=false");
    let obj_json = await response.json()

    let dom_obj = document.querySelector("#dom_obj")
    dom_obj.innerHTML = "<h2>Observatory Data</h2>"
    
    for (let key in obj_json){
        newElement(dom_obj,"h4",obj_json[key]["Name"])
        for (let key2 in obj_json[key]){
            if (key2 != "Name"){
                newElement(dom_obj,"p",key2+": "+obj_json[key][key2])
            }
        }
    }
    console.log(obj_json)
}

async function ephemInfo(){
    let id1 = document.querySelector("#obs1").value;
    let id2 = document.querySelector("#obs2").value;
    let response = await fetch(url+"/ephemeris_info?id1="+id1+"&id2="+id2);
    let obj_json = await response.json()
    console.log(obj_json)

    let dom_obj = document.querySelector("#eph_data")
    dom_obj.innerHTML = "<h2>Ephemeris Data</h2>"

    for (let key in obj_json){
        newElement(dom_obj,"h4",obj_json[key]["Name"])
        for (let key2 in obj_json[key]){
            if ((key2 != "Name")&&(key2 != "Max Elevation")){
                newElement(dom_obj,"p",key2+": "+obj_json[key][key2])
            }
            if (key2 == "Max Elevation"){
                newElement(dom_obj,"h5","Max Elevation:")
                for (let key3 in obj_json[key][key2]) {
                    newElement(dom_obj,"p","\t"+key3+": "+obj_json[key][key2][key3])
                }
            }
        }
    }
}

function newElement(dom_obj,tag_,cont_) {
    let tag = document.createElement(tag_)
    let text = document.createTextNode(cont_)
    tag.appendChild(text)
    dom_obj.appendChild(tag)
}

async function update(){
    ephemInfo()
    obsInfo()
}
