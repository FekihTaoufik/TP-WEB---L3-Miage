function previsualisation(file_path){
    var el,prev = document.querySelector('#previsualisation');
    prev.innerHTML ='';
    var ext = {
        image: ['jpeg','png','jpg','gif'],
        sound:['mp3','wav'],
        text:['js','html','php','css','txt']
    }
    var file_ext = file_path.split('.')[file_path.split('.').length-1] ;
    file_ext=file_ext.toLowerCase();
    if(ext.image.includes(file_ext) ){
        el = document.createElement('img');
        el.src = file_path
    }else if (ext.sound.includes(file_ext)){
        el = document.createElement('audio');
        el.setAttribute('controls','');
        source = document.createElement('source')
        source.setAttribute('src',file_path)
        el.appendChild(source)
    }else if (file_ext =='pdf'){
        pdfjsLib.disableStream = true;
        pdfjsLib.getDocument(file_path).then(function(pdfFile) {
            pdfFile.getPage(1).then(function(page) {
                var canvas = document.createElement('canvas');
                canvas.width=500;
                canvas.height=600
                var context = canvas.getContext('2d');

                var renderContext = {
                    canvasContext: context,
                    viewport:  page.getViewport(.7)
                };

                page.render(renderContext);
                prev.appendChild(canvas)
            });
        });
        return;
    }else if (ext.text.includes(file_ext)){
        get_text_file(file_path,prev)
        return;
    }else{
        alert('Fichier non pris en compte');
        return;
    }
    prev.appendChild(el)
}
function get_text_file(str,el){
    var xmlhttp=new XMLHttpRequest();      
    xmlhttp.open("GET","serveur.php?q="+str,true);
    xmlhttp.send();
            xmlhttp.onreadystatechange=function() {
               if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                   div = document.createElement('div');
                   div.setAttribute('style','max-height:400px;overflow:auto;');
                   div.innerText = xmlhttp.responseText;
                   el.appendChild(div);
               }
            }
}
function make_table(fichiers){
    if(document.getElementById('main_table'))
        document.getElementById('main_table').remove();

    var main_tbl = document.createElement('table');
    main_tbl.setAttribute('id','main_table')
    main_tbl.setAttribute('style','width:100%');
    main_tbl.appendChild(document.createElement('tbody'))
    main_tbl.children[0].appendChild(document.createElement('tr'))
    main_tbl.children[0].children[0].appendChild(document.createElement('td'))
    main_tbl.children[0].children[0].children[0].setAttribute('style','width:50%')
    var prev_td = document.createElement('td');
    prev_td.setAttribute('id','previsualisation');
    prev_td.setAttribute('style','width:50%')
    main_tbl.children[0].children[0].appendChild(prev_td)

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
        tr.file_type = f.type;

        console.log("this one ",f.type,tr.file_type)
        tr.addEventListener('mouseover',function(event){
            this.setAttribute('style','color:red;cursor:pointer;');
        });
        tr.addEventListener('mouseout',function(event){
            this.setAttribute('style','');
        });
        
        tr.addEventListener('click',function(event){
            if(this.file_type =='dir'){
                event.preventDefault();
                    document.getElementById('chemin').setAttribute('value',this.directory_path);
                    event.keyCode = 13;
                    ask(event);
        }else{
            previsualisation(this.directory_path,this.file_type)
        }
            })

        tbdy.appendChild(tr);
        
    }
       tbl.appendChild(thead);
       tbl.appendChild(tbdy);

       main_tbl.children[0].children[0].children[0].appendChild(tbl)

       return main_tbl;
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