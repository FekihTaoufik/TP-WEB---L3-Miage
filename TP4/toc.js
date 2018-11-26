window.onload = toc_v4();
function toc_v4(){
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    var tbdy = document.createElement('tbody');
    var thead = document.createElement('thead');
    var tr_head = document.createElement('tr');
    var td_head = document.createElement('td');
    td_head.appendChild(document.createTextNode('Table des matieres'));
    tr_head.appendChild(td_head);
    thead.appendChild(tr_head);
    // Partie v4 : récupération des h1 et h2 avec querySelectorAll
    for (var i = 0; i < document.querySelectorAll('h1,h2').length; i++) {
        var el = document.querySelectorAll('h1,h2')[i];
        // On génére un id de cette forme : itérateur(i)-texte(H1)(tous les espaces remplacé par des -)(tout en minuscule)
        var tr =  document.createElement('tr');
        var td = document.createElement('td');
        el.setAttribute('id',i+'-'+el.innerText.replace(' ','-').toLocaleLowerCase());

        var a = document.createElement('a');
        a.innerText = el.innerText;
        a.setAttribute('href',"#"+el.id);
        // Partie v4 === Début ===
        a.style_destine = 'color:white;background-color:'+(el.tagName =='H1'?'red':'green')+';';
        a.origin_header = el;
        
        if(el.tagName == 'H2')
            a.setAttribute('style','margin-left:15px;');
            
        a.addEventListener('mouseover',function(event){
                this.setAttribute('data-hovered','');
                this.setAttribute('style',this.getAttribute('style')+this.style_destine);
                this.origin_header.setAttribute('style',this.style_destine);
        });

        a.addEventListener('mouseout',function(event){
            this.removeAttribute('data-hovered');
            this.setAttribute('style',this.getAttribute('style').replace(this.style_destine,''));
            this.origin_header.removeAttribute('style');
        });
        // Partie v4 === Fin ===
        td.appendChild(a);
        tr.appendChild(td);
        tbdy.appendChild(tr);
    }
    tbl.appendChild(thead);
    tbl.appendChild(tbdy);
    body.prepend(tbl)
}
function toc_v3(){
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    var tbdy = document.createElement('tbody');
    var thead = document.createElement('thead');
    var tr_head = document.createElement('tr');
    var td_head = document.createElement('td');
    td_head.appendChild(document.createTextNode('Table des matieres'));
    tr_head.appendChild(td_head);
    thead.appendChild(tr_head);
    for (var i = 0; i < document.getElementsByTagName('h1').length; i++) {
        var el = document.getElementsByTagName('h1')[i];
        // On génére un id de cette forme : itérateur(i)-texte(H1)(tous les espaces remplacé par des -)(tout en minuscule)
        var tr =  document.createElement('tr');
        var td = document.createElement('td');
        el.setAttribute('id',i+'-'+el.innerText.replace(' ','-').toLocaleLowerCase());
        var a = document.createElement('a');
        a.innerText = el.innerText;
        a.setAttribute('href',"#"+el.id);
        // Partie v3 === Début ===
        a.style_destine = el.tagName =='H1'?'color:white;background-color:red;':'color:white;background-color:green;';
        a.origin_header = el;
        
        a.addEventListener('mouseover',function(event){
            this.setAttribute('data-hovered','');
            this.setAttribute('style',this.style_destine);
            this.origin_header.setAttribute('style','background-color:whitesmoke');
        });
        a.addEventListener('mouseout',function(event){
            this.removeAttribute('data-hovered');
            this.removeAttribute('style');
            this.origin_header.removeAttribute('style');
        });
        // Partie v3 === Fin ===
        td.appendChild(a);
        tr.appendChild(td);
        tbdy.appendChild(tr);
    }
    tbl.appendChild(thead);
    tbl.appendChild(tbdy);
    body.prepend(tbl)
}
function toc_v2(){
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    var tbdy = document.createElement('tbody');
    var thead = document.createElement('thead');
    var tr_head = document.createElement('tr');
    var td_head = document.createElement('td');
    td_head.appendChild(document.createTextNode('Table des matieres'));
    tr_head.appendChild(td_head);
    thead.appendChild(tr_head);
    for (var i = 0; i < document.getElementsByTagName('h1').length; i++) {
        var el = document.getElementsByTagName('h1')[i];
        var tr =  document.createElement('tr');
        var td = document.createElement('td');
        // Partie v2 === Début ===
        el.setAttribute('id',i+'-'+el.innerText.replace(' ','-').toLocaleLowerCase());
        var a = document.createElement('a');
        a.innerText = el.innerText;
        a.setAttribute('href',"#"+el.id);
        // Partie v2 === Fin ===
        td.appendChild(a);
        tr.appendChild(td);
        tbdy.appendChild(tr);
    }
    tbl.appendChild(thead);
    tbl.appendChild(tbdy);
    body.prepend(tbl)
}
function toc_v1(){
    // Partie v1
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    var tbdy = document.createElement('tbody');
    var thead = document.createElement('thead');
    var tr_head = document.createElement('tr');
    var td_head = document.createElement('td');
    td_head.appendChild(document.createTextNode('Table des matieres'));
    tr_head.appendChild(td_head);
    thead.appendChild(tr_head);
    for (var i = 0; i < document.getElementsByTagName('h1').length; i++) {
        var el = document.getElementsByTagName('h1')[i];
        var tr =  document.createElement('tr');
        var td = document.createElement('td');
        td.innerText = el.innerText;
        tr.appendChild(td);
        tbdy.appendChild(tr);
    }
    tbl.appendChild(thead);
    tbl.appendChild(tbdy);

    body.prepend(tbl)
}

