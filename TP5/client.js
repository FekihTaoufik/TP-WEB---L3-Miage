
function make_table(fichiers){
    if(document.getElementById('resultats'))
        document.getElementById('resultats').remove();
    var tbl = document.createElement('table');
    tbl.setAttribute('id','resultats');
    var tbdy = document.createElement('tbody');
    var thead = document.createElement('thead');
    var tr_head = document.createElement('tr');

    var td_head_titre = document.createElement('td');
    var td_head_date_modification = document.createElement('td');
    var td_head_taille = document.createElement('td');
    var td_head_extension = document.createElement('td');

    td_head_titre.innerText='Titre';
    td_head_date_modification.innerText='Date de modification';
    td_head_taille.innerText='Taille';
    td_head_extension.innerText='Extension';

    tr_head.appendChild(td_head_titre);
    tr_head.appendChild(td_head_date_modification);
    tr_head.appendChild(td_head_taille);
    tr_head.appendChild(td_head_extension);
    thead.appendChild(tr_head);
    for (var i = 0; i < fichiers.length; i++) {
        var f = fichiers[i];
        var tr =  document.createElement('tr');
        var td_titre = document.createElement('td');
        var td_date_modification = document.createElement('td');
        var td_taille = document.createElement('td');
        var td_extension = document.createElement('td');
        var img = document.createElement('img');
        img.setAttribute('src','./img/icones/'+(f.extension==null?'dir':f.extension)+'.png');
        img.setAttribute('height',30);
        img.setAttribute('title','Fichier/Dossier');
        td_titre.innerHTML=img.outerHTML+f.nom_fichier;
        td_date_modification.innerText=f.date_modification;
        td_taille.innerText=f.type=='dir'?'':f.taille;
        td_extension.innerText=f.extension!=null?f.extension.toUpperCase():'';
    
        tr.appendChild(td_titre);
        tr.appendChild(td_date_modification);
        tr.appendChild(td_taille);
        tr.appendChild(td_extension);
        tr.directory_path = f.path_fichier;
        tr.addEventListener('mouseover',function(event){
            this.setAttribute('style','color:red;cursor:pointer;');
        });
        tr.addEventListener('mouseout',function(event){
            this.setAttribute('style','');
        });
        if(f.type =='dir')
            tr.addEventListener('click',function(event){
                event.preventDefault();
                console.log(this.directory_path);
                document.getElementById('chemin').value = this.directory_path;
                event.keyCode = 13;
                ask(event);
            })

        tbdy.appendChild(tr);
        
    }
       tbl.appendChild(thead);
       tbl.appendChild(tbdy);
       return tbl;
}
function ask(event) {
    if (typeof event !='undefined') {
        if(event.keyCode != 13)
            return;
        var str = document.getElementById('chemin').value;
    }else
        var str = '';
    xmlhttp=new XMLHttpRequest();      
    xmlhttp.onreadystatechange=function() {
       if (xmlhttp.readyState==4 && xmlhttp.status==200) {
           var data = JSON.parse(xmlhttp.responseText);
           if(data.success){
               console.log(data);
            document.getElementsByTagName('body')[0].append(make_table(data.fichiers));
            }else{
                alert('Il ya eu une erreur du serveur : ' + data.message)
            }
       }
    }
    xmlhttp.open("GET","serveur.php?q="+str,true);
    xmlhttp.send();
 }

 window.onload=ask();