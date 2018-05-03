// form elementini id ye göre getir ve event ekle
document.getElementById('destek-form').addEventListener('submit', destekKaydet);

// bu fonksiyon forumdan gerekli alanları getirerek bir destek objesine atıp localStorage
// kayıt ediyor
function destekKaydet(e) {
  var destekKonu = document.getElementById('destek-konu').value;
  var destekAciliyet = document.getElementById('destek-aciliyet').value;
  var destekAciklama = document.getElementById('destek-aciklama').value;
  var destekId = chance.guid();
  var destekStatu = 'Açık';

  var destek = {
    id: destekId,
    aciklama: destekAciklama,
    aciliyet: destekAciliyet,
    konu: destekKonu,
    statu: destekStatu
  }
  // localStroge eger null ise boş bir array oluşturup objeyi içine at degilse çekip objeyi içine json olarak at
  if (localStorage.getItem('destekKayitlari') == null) {
    var destekler = [];
    destekler.push(destek);
    localStorage.setItem('destekKayitlari', JSON.stringify(destekler));
  } else {
    var destekler = JSON.parse(localStorage.getItem('destekKayitlari'));
    destekler.push(destek);
    localStorage.setItem('destekKayitlari', JSON.stringify(destekler));
  }

  document.getElementById('destek-form').reset();
  // her kayittan sonra listeyi güncelleyip ekrana getir
  destekKayitlariniGetir();

  e.preventDefault();
}



function destegiKapat(id) {
  var destekKayitlari = JSON.parse(localStorage.getItem('destekKayitlari'));

  for (var i = 0; i < destekKayitlari.length; i++) {
    if (destekKayitlari[i].id == id) {
      destekKayitlari[i].statu = 'Kapalı';
    }
  }

  localStorage.setItem('destekKayitlari', JSON.stringify(destekKayitlari));

  destekKayitlariniGetir();
}
function destegiSil(id) {
  var destekKayitlari = JSON.parse(localStorage.getItem('destekKayitlari'));

  for (var i = 0; i < destekKayitlari.length; i++) {
    if (destekKayitlari[i].id == id) {
      destekKayitlari.splice(i, 1);
    }
  }

  localStorage.setItem('destekKayitlari', JSON.stringify(destekKayitlari));

  destekKayitlariniGetir();
}

function destekKayitlariniGetir() {
  var destekKayitlari = JSON.parse(localStorage.getItem('destekKayitlari'));
  var destekKayitListesi = document.getElementById('destek-kaydi-listesi');

  destekKayitListesi.innerHTML = '';

  for (var i = 0; i < destekKayitlari.length; i++) {
    var id = destekKayitlari[i].id;
    var aciklama = destekKayitlari[i].aciklama;
    var aciliyet = destekKayitlari[i].aciliyet;
    var konu = destekKayitlari[i].konu;
    var statu = destekKayitlari[i].statu;

    destekKayitListesi.innerHTML += '<div class="card bg-light mb-3">' +
      '<div class="card-body">' +
      '<h6>Konu id: ' + id + '</h6>' +
      '<p>Destek Statüsü : <span class="badge badge-info">' + statu + '</span></p>' +
      '<h3>Destek Konu : ' + konu + '</h3>' +
      '<p class="lead"><strong>Aciliyet : </strong>' + aciliyet + '</p>' +
      '<p><strong>Açıklama :</strong> ' + aciklama + '</p>' +
      '<a href="#" onclick="destegiKapat(\''+id+'\')" class="btn btn-warning">Kapat</a> ' +
      '<a href="#" onclick="destegiSil(\'' + id + '\')" class="btn btn-danger">Sil</a>' +
      '</div>' +
      '</div>';
  }
}
