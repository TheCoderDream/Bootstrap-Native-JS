// submit butonuna tıklanması halinde desteKaydet fonksiyonunu tetikle
document.getElementById("destek-form").addEventListener("submit",destekKaydet);

function destekKaydet(e){
 // form alanlarından gelen verileri çek
  var konu = document.getElementById("destek-konu").value;
  var aciliyet = document.getElementById("destek-aciliyet").value;
  var aciklama = document.getElementById("destek-aciklama").value;
  var id=change.guid();
  var statu = 'Açık';

// form alanlarından aldıgın verileri objeye aktar
   var destek = {
     id: id,
     konu:konu,
     aciliyet:aciliyet,
     aciklama:aciklama,
     statu:statu
   }

   if(localStorage.getItem("kayitlar") ==null){

     var destekKayitlari =[];
     destekKayitlari.push(destek);
     localStorage.setItem("kayitlar", JSON.stringfy(destekKayitlari));

   }else{
     var destekKayitlari = JSON.parse(localStorage.getItem("kayitlar"));
     destekKayitlari.push(destek);
     localStorage.setItem("kayitlar", JSON.stringfy(destekKayitlari));

   }

   document.getElementByID("destek-form").reset();
   fetchIssues();

   e.preventDefault();
}

function getirKayitlari(){
var destekKayitlari;
  if(localStorage.getItem("kayitlar") ==null){

    destekKayitlari =[];

  }else {
    destekKayitlari =  JSON.parse(localStorage.getItem('kayitlar'));
  }

var kayitListesi = document.getElementById("destek-kaydi-listesi");

kayitListesi.innerHTML ='';

  for(var i=0; i<destekKayitlari.length;i++){
    var id = kayitlar[i].id;
    var konu = kayitlar[i].konu;
    var aciliyet = kayitlar[i].aciliyet;
    var aciklama = kayitlar[i].aciklama;
    var statu = kayitlar[i].statu;

    kayitListesi.innerHTML += '<div class="bg-light"'+
    '<h6>Kayit id : ' +id+ '</h6>'+
    '<p><span class="badge badge-info"' +statu+ '</span>'+
    '<h3>'+konu+'</h3>'+
    '<p>'+aciklama+'</p>'+
    '<span class="badge badge-info">'+aciliyet+'</span>'+
    '<a href="#" onClick="setStatusClose(\''+id+'\')"class="btn btn-warning">Kapat</a>'+
    '<a href="#" onClick="setStatusClose(\''+id+'\')" class="btn btn-danger">Sil</a>'+
    '</div>';

  }
}
