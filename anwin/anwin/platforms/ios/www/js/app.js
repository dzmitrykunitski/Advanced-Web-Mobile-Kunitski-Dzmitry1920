

var $$ = Dom7;

var app = new Framework7({
  root: '#app', // App root element

  id: 'com.example.anwin', // App bundle ID
  name: 'Anwin', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },

    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: [
    {
      path: '/index/',
      url: 'index.html',
      on: {
        pageInit: function (event, page) {

        },
      }


    },
    {
      path: '/klant/',
      url: 'klant.html',
      options: {
        transition: 'f7-flip',
      },
      on: {
        pageInit: function (event, page) {

          afsluitenSessie();


        },
      }
    },
    {
      path: '/chat/',
      url: 'chat.html',
      options: {
        transition: 'f7-flip',
      },
      on: {
        pageInit: function (event, page) {

          TerugNaarIndex();


        },
      }
    },
    {
      path: '/onzemedewerker/',
      url: 'onzemedewerker.html',
      options: {
        transition: 'f7-flip',
      },
      on: {
        pageInit: function (event, page) {



        },
      }
    },
    {
      path: '/medewerkerpagina/',
      url: 'medewerkerpagina.html',
      options: {
        transition: 'f7-flip',
      },
      on: {
        pageInit: function (event, page) {

          afsluitenSessie();

        },
      }
    },
    {
      path: '/reservatiespagina/',
      url: 'reservatiespagina.html',
      options: {
        transition: 'f7-flip',
      },
      on: {
        pageInit: function (event, page) {

          getHistory();

        },
      }
    },
    {
      path: '/klantpagina/',
      url: 'klantpagina.html',
      options: {
        transition: 'f7-flip',
      },
      on: {
        pageInit: function (event, page) {
          postHotel();
          getHotel();

        },
      }
    },
    {
      name: 'calendar',
      path: '/calendar/',
      componentUrl: 'calendar.html',
      options: {
        transition: 'f7-flip',
      },
      on: {
        pageInit: function (e, page) {

          getHotel();
          getHotelLocatie();
          getMedewerkers();
          getCalender();
          sendReservatie();

        },
      }
    },
    {
      path: '/geschiedenisvoormedewerker/',
      url: 'geschiedenisvoormedewerker.html',
      options: {
        transition: 'f7-flip',
      },
      on: {

        pageInit: function (event, page) {
          getHistoryVoorMedewerker();

        },

      }
    },
    {
      path: '/calendervoormedewerker/',
      url: 'calendervoormedewerker.html',
      options: {
        transition: 'f7-flip',
      },
      on: {

        pageInit: function (event, page) {
          getCalenderVoorMedewerker();
          sendReservatieMedewerker();

        },

      }
    },
    {
      path: '/registreren/',
      url: 'registreren.html',
      options: {
        transition: 'f7-flip',
      },
      on: {
        pageInit: function (event, page) {
          getRegistApi();

        },

      }
    },

    {
      path: '/inloggenmedewerker/',
      url: 'inloggenmedewerker.html',
      options: {
        transition: 'f7-circle',
      },
      on: {
        pageInit: function (event, page) {
          getLoginApiMedewerker();
          TerugNaarIndex();

        },
      }

    },

  ],


  // Input settings
  input: {
    scrollIntoViewOnFocus: Framework7.device.cordova && !Framework7.device.electron,
    scrollIntoViewCentered: Framework7.device.cordova && !Framework7.device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },
});

var view = app.views.create('.view-main', {
  on: {
    pageInit: function () {

    }
  }
});



// ---------------------------
let id;
let klant_id;
let medewerker_id;

var uid, voornaam, naam, email, password, gebruikersnaam;
var urlRef = '';
// ----------------------------

var notificationRegist = app.notification.create({
  icon: '<i class="fas fa-check-circle"></i>',
  title: 'ANWIN',
  titleRightText: 'Registreren',
  subtitle: 'Je bent geregistreerd.',
  text: 'Bedankt!',
  closeTimeout: 1700,
  on: {
    close: function () {
      view.router.navigate('/login-screen/', { transition: 'f7-circle' });
    },
  },

});
var notificationLogin = app.notification.create({
  icon: '<i class="fas fa-check-circle"></i>',
  title: 'ANWIN',
  titleRightText: 'Inloggen',
  subtitle: 'Je bent ingelogd.',
  text: 'Bedankt!',
  closeTimeout: 1700,
  on: {
    close: function () {
      view.router.navigate('/klant/', { transition: 'f7-circle' });
    },
  },

});

var notificationLoginMedewerker = app.notification.create({
  icon: '<i class="fas fa-check-circle"></i>',
  title: 'ANWIN',
  titleRightText: 'Inloggen',
  subtitle: 'Je bent ingelogd.',
  text: 'Bedankt!',
  closeTimeout: 1700,
  on: {
    close: function () {
      view.router.navigate('/medewerkerpagina/', { transition: 'f7-circle' });
    },
  },

});
var notificationLoginEnRegistrerenMedewerker = app.notification.create({
  icon: '<i class="fas fa-check-circle"></i>',
  title: 'ANWIN',
  titleRightText: 'Registreren',
  subtitle: 'Je bent geregistreerd.',
  text: 'Bedankt!',
  closeTimeout: 1700,
  on: {
    close: function () {
      view.router.navigate('/medewerkerpagina/', { transition: 'f7-circle' });
    },
  },

});
var notificationHotelToevoegen = app.notification.create({
  icon: '<i class="fas fa-check-circle"></i>',
  title: 'ANWIN',
  titleRightText: '',
  subtitle: 'Hotel is toegevoegd',
  closeTimeout: 1700,
  on: {
    close: function () {
      getHotel();
    },
  },

});

var notificationReservatie = app.notification.create({
  icon: '<i class="fas fa-check-circle"></i>',
  title: 'ANWIN',
  titleRightText: 'De reservatie is voltooid!',
  subtitle: 'Bedankt voor het gebruik van onze diensten!',
  closeTimeout: 1700,
  on: {
    close: function () {
      view.router.navigate('/klant/');

    },
  },

});
var notificationFull = app.notification.create({
  icon: '<i class="fas fa-exclamation-circle"></i>',
  title: 'Fout!',
  subtitle: 'Fout!',
  text: 'Probeer later opnieuw.',
  closeTimeout: 1700,
});
var notificationFoutLogin = app.notification.create({
  icon: '<i class="fas fa-exclamation-circle"></i>',
  title: 'Fout!',
  subtitle: 'Login mislukt!',
  text: 'Deze naam/paswoord combinatie bestaat niet',
  closeTimeout: 1700,
});

// ----------------------------

let opties = {
  method: "POST", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "omit", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }

};

// ----------------------------

function getLoginApiMedewerker() {
  $$('#btnLoginMedewerker').on('click', function () {
    var email = document.getElementById('emailMedewerker').value;
    var password = document.getElementById('wachtwoordMedewerker').value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function (firebaseUser) {

      notificationLoginMedewerker.open();
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      notificationFoutLogin.open();

      // ...
    });
    var userMedewerker = firebase.auth().currentUser;
    if (userMedewerker != null) {

      sessionStorage.setItem('id', userMedewerker.uid);




    }

  });
}

function getRegistApi() {
  $$('#btnFoto').on('click', function () {
    document.getElementById('btnImg').click();

  });
  $$('#btnVerder').on('click', function () {
    email = document.getElementById('email').value;
    wachtwoord = document.getElementById('wachtwoord').value;
    herhaalWachtwoord = document.getElementById('herhaalWachtwoord').value;
    if (email.length < 4) {

      app.dialog.alert('Vul een e-mail aub!');
      return;
    }
    if (wachtwoord.length < 4) {
      app.dialog.alert('Vul een een wachtwoord aub!');
      return;
    }
    if (herhaalWachtwoord != wachtwoord) {
      app.dialog.alert('De combinatie van de wachtwoord is niet juist!');
      return;
    }

    // Create user with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, wachtwoord).then(function () {
      $$('#fotoLabel').css('display', 'block');
      $$('#FormLabelRegistreren').css('display', 'block');
      $$('#FormLabelVerder').hide();



    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        app.dialog.alert('Vul een een sterke wachtwoord aub!');
      } else {
        app.dialog.alert(errorMessage);

      }
      console.log(error);
      // [END_EXCLUDE]
    });
  });
  $$('#btnRegistreren').on('click', function () {
    var storage = firebase.storage();
    // Create a storage reference from our storage service
    var storageRef = storage.ref();
    var fileRef;


    var file = document.getElementById("btnImg").files[0];
    fileRef = storageRef.child(file.name);

    fileRef.put(file).then(function (snapshot) {
      console.log('Uploaded a blob or file!');


    }).catch(function (error) {
      app.dialog.alert(error);
    });

    var recentUrl;
    fileRef.getDownloadURL().then(function (url) {
      recentUrl = String(url);
      urlRef += recentUrl;


    }).catch(function (error) { });
    app.dialog.confirm('Wil je verder gaan?', function () {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: document.getElementById('naamVoornaam').value,
        photoURL: urlRef


      }).then(function () {
        firebase.firestore().collection("medewerker").doc(user.uid).set({
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          uid: user.uid
        })
          .then(function () {
            console.log("Document successfully written!");
            notificationLoginEnRegistrerenMedewerker.open();
          })
          .catch(function (error) {
            app.dialog.alert(error);
          });
      }).catch(function (error) {
        app.dialog.alert(error);
      });

    });


  });

}


function getMedewerkers() {

  firebase.firestore().collection("medewerker").get().then(function (querySnapshot) {
    let line = "";
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      line += '<li><label class="item-radio item-content"><input type="radio" name="medewerker" value="' + doc.id + '"/><i class="icon icon-radio"></i><div class="item-media"><img src="' + doc.data().photoUrl + '"width="44"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + doc.data().name + " " + '</div></div><div class="item-subtitle">Night Auditor</div></div></label></li>';

    });
    $$('#optieMedewerker').html(line);
  });


}

function postHotel() {
  $$('#btnToevoegenHotel').on('click', function () {

    firebase.firestore().collection("hotel").add({
      hotelNaam: document.getElementById('hotelNaam').value,
      adres: document.getElementById('adres').value,
      nummer: document.getElementById('nummer').value,
      postcode: document.getElementById('postcode').value,
      gemeente: document.getElementById('gemeente').value,
      klant_id: sessionStorage.getItem('klant_id'),

    })
      .then(function () {
        notificationHotelToevoegen.open();
      })
      .catch(function (error) {
        notificationFull.open();
      });

  });
}

function TerugNaarIndex() {
  $$('.TerugNaarHome').on('click', function () {
    // view.router.navigate('/index/', { transition: 'f7-circle' });
    window.location.href = "index.html";

  });
}


function sendReservatie() {
  $$('#btnReserveer').on('click', function () {
    // let startENstartTijd = document.getElementById('demo-calendar-range_start').value + ' ' + document.getElementById('picker-starttijd').value;
    //let eindEneindTijd = document.getElementById('demo-calendar-range_end').value + ' ' + document.getElementById('picker-eindtijd').value;
    let start_datum = document.getElementById('demo-calendar-range_end').value;
    let eind_datum = document.getElementById('demo-calendar-range_end').value;
    let start_tijd = document.getElementById('picker-starttijd').value;
    let eind_tijd = document.getElementById('picker-eindtijd').value;
    var selected_medewerker = $$('input[name="medewerker"]:checked').val();
    var selected_hotel = $$('input[name="hotel"]:checked').val();

    firebase.firestore().collection("reservaties").add({
      klant_fr_id: sessionStorage.getItem('klant_id'),
      naamHotel: selected_hotel,
      start_datum: start_datum,
      eind_datum: eind_datum,
      start_tijd: start_tijd,
      eind_tijd, eind_tijd,
      medewerker_fr_id: selected_medewerker,

    })
      .then(function () {
        notificationHotelToevoegen.open();
      })
      .catch(function (error) {
        notificationFull.open();
      });

  });
}
function getHotel() {

  firebase.firestore().collection("hotel").where("klant_id", "==", klant_id)
    .get()
    .then(function (querySnapshot) {
      let line = "";
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        line += '<li value="' + doc.id + '"  class="swipeout deleted-callback"> <div class="item-content swipeout-content"><div class="item-inner"> <div class="item-title-row"><div class="item-title">' + doc.data().hotelNaam + '</div></div><div class="item-subtitle">' + doc.data().adres + ' ' + doc.data().nummer + ', ' + doc.data().postcode + ' ' + doc.data().gemeente + '</div></div></div><div class="swipeout-actions-right"><a href="#" data-confirm="Wil je die hotel verwijderen?" class="swipeout-delete swipeout-overswipe">Verwijderen</a></div></li>';



      });
      $$('#hotelGegegevens').html(line);
      $$('.deleted-callback').on('swipeout:deleted', function () {

        var locatie_id = $$(this).attr('value');
        app.dialog.alert(locatie_id);
        firebase.firestore().collection("hotel").doc(locatie_id).delete().then(function () {
          app.dialog.alert("Document successfully deleted!");
        }).catch(function (error) {
          console.error("Error removing document: ", error);
        });



      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });



  /*let apiAddress = "https://anwin.be/src/public/hotel";
  opties.body = JSON.stringify({
    klant_id: sessionStorage.getItem('klant_id'),

  });
  fetch(apiAddress, opties)
    .then(function (response) {
      return response.json();
    })
    .then(function (responseData) {

      var list = responseData;

      if (list.length > 0) {
        let line = "";
        let line2 = "";

        for (var i = 0; i < list.length; i++) {


          //line += '<tr>' + '<td>' + '<label class="radio">' + '<input type="radio" value="' + list[i].locatie_id + '" name="hotel"/>' + '<i class="icon-radio"></i>' + '</label>' + '</td>' + '<td>' + list[i].naamHotel + '</td>' + '<td>' + list[i].adres + ' ' + list[i].nummer + ', ' + list[i].postcode + ' ' + list[i].gemeente + '</td>' + '</tr>';
          line += '<li value="' + list[i].locatie_id + '"  class="swipeout deleted-callback"> <div class="item-content swipeout-content"><div class="item-inner"> <div class="item-title-row"><div class="item-title">' + list[i].naamHotel + '</div></div><div class="item-subtitle">' + list[i].adres + ' ' + list[i].nummer + ', ' + list[i].postcode + ' ' + list[i].gemeente + '</div></div></div><div class="swipeout-actions-right"><a href="#" data-confirm="Wil je die hotel verwijderen?" class="swipeout-delete swipeout-overswipe">Verwijderen</a></div></li>';

        }
        $$('#hotelGegegevens').html(line);
        $$('.deleted-callback').on('swipeout:deleted', function () {
          var locatie_id = $$(this).attr('value');
          opties.body = JSON.stringify({
            locatie_id: locatie_id,

          });
          let apiAddress = "https://anwin.be/src/public/hotelDelete";
          fetch(apiAddress, opties)
            .then(function (response) {
              return response.text();
            })
            .then(function (responseData) {
              app.dialog.alert(responseData);

            })

        });


      }
    })*/


}
function getHotelLocatie() {

  firebase.firestore().collection("hotel").where("klant_id", "==", klant_id)
    .get()
    .then(function (querySnapshot) {
      let line2 = "";
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        line2 += '<li><label class="item-radio item-content"><input type="radio" name="hotel" value="' + doc.data().hotelNaam + '"/><i class="icon icon-radio" checked></i><div class="item-inner"><div class="item-title-row"><div class="item-title">' + doc.data().hotelNaam + '</div></div></div></label></li>';

      });
      $$('#optieHotel').append(line2);

    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

  /*let apiAddress = "https://anwin.be/src/public/hotel";
  opties.body = JSON.stringify({
    klant_id: sessionStorage.getItem('klant_id'),

  });
  fetch(apiAddress, opties)
    .then(function (response) {
      return response.json();
    })
    .then(function (responseData) {

      var list = responseData;

      if (list.length > 0) {

        let line2 = "";

        for (var i = 0; i < list.length; i++) {
          //line2 += '<option value="' + list[i].naamHotel + '">' + list[i].naamHotel + " " + '</option>';
          line2 += '<li><label class="item-radio item-content"><input type="radio" name="hotel" value="' + list[i].naamHotel + '"/><i class="icon icon-radio" checked></i><div class="item-inner"><div class="item-title-row"><div class="item-title">' + list[i].naamHotel + '</div></div></div></label></li>';
        }

        $$('#optieHotel').append(line2);

      }
    })*/


}
var calendarRange;
var calendarRange_end;

function getCalender() {

  defaultCalendar();

  /*$$('#optieMedewerker').on('change', function (e) {
    var selected_value = $$('input[name="medewerker"]:checked').val();

    app.calendar.destroy(calendarRange);
    app.calendar.destroy(calendarRange_end);
    let apiAddress = "https://anwin.be/src/public/calendar";
    opties.body = JSON.stringify({
      //medewerker_fr_id: document.getElementById('optieMedewerker').value,
      medewerker_fr_id: selected_value,

    });
    fetch(apiAddress, opties)
      .then(function (response) {

        return response.json();
      })
      .then(function (responseData) {

        var list = responseData;

        calendarRange = app.calendar.create({
          inputEl: '#demo-calendar-range_start',
          locale: 'en-US',
          openIn: 'customModal',
          header: true,
          footer: true,
          dateFormat: 'yyyy-mm-dd',
          disabled: list,
        });
        calendarRange_end = app.calendar.create({
          inputEl: '#demo-calendar-range_end',
          locale: 'en-US',
          openIn: 'customModal',
          header: true,
          footer: true,
          dateFormat: 'yyyy-mm-dd',
          disabled: list,
        });


      })


  });*/

}

function defaultCalendar() {

  var today = new Date();
  var pickerStartijd = app.picker.create({

    inputEl: '#picker-starttijd',
    toolbar: true,
    rotateEffect: true,
    value: [

      today.getHours(),
      today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()
    ],
    formatValue: function (values, displayValues) {
      return values[0] + ':' + values[1];
    },
    cols: [

      // Hours
      {
        values: (function () {
          var arr = [];
          for (var i = 0; i <= 23; i++) { arr.push(i); }
          return arr;
        })(),
      },
      // Divider
      {
        divider: true,
        content: ':'
      },
      // Minutes
      {
        values: (function () {
          var arr = [];
          for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
          return arr;
        })(),
      }
    ],
    on: {
      change: function (picker, values, displayValues) {
        var daysInMonth = new Date(picker.value[2], picker.value[0] * 1 + 1, 0).getDate();
        if (values[1] > daysInMonth) {
          picker.cols[1].setValue(daysInMonth);
        }
      },
    }
  });

  var pickereindtijd = app.picker.create({

    inputEl: '#picker-eindtijd',
    toolbar: true,
    rotateEffect: true,
    value: [

      today.getHours(),
      today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()
    ],
    formatValue: function (values, displayValues) {
      return values[0] + ':' + values[1];
    },
    cols: [

      // Hours
      {
        values: (function () {
          var arr = [];
          for (var i = 0; i <= 23; i++) { arr.push(i); }
          return arr;
        })(),
      },
      // Divider
      {
        divider: true,
        content: ':'
      },
      // Minutes
      {
        values: (function () {
          var arr = [];
          for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
          return arr;
        })(),
      }
    ],
    on: {
      change: function (picker, values, displayValues) {
        var daysInMonth = new Date(picker.value[2], picker.value[0] * 1 + 1, 0).getDate();
        if (values[1] > daysInMonth) {
          picker.cols[1].setValue(daysInMonth);
        }
      },
    }
  });
  calendarRange = app.calendar.create({
    inputEl: '#demo-calendar-range_start',
    locale: 'en-US',
    openIn: 'customModal',
    header: true,
    footer: true,
    dateFormat: 'dd/mm/yy',

  });
  calendarRange_end = app.calendar.create({
    inputEl: '#demo-calendar-range_end',
    locale: 'en-US',
    openIn: 'customModal',
    header: true,
    footer: true,
    dateFormat: 'dd/mm/yy',

  });

  /*let apiAddress = "https://anwin.be/src/public/calendar";
  opties.body = JSON.stringify({
    medewerker_fr_id: 1,

  });
  fetch(apiAddress, opties)
    .then(function (response) {

      return response.json();
    })
    .then(function (responseData) {

      var list = responseData;

      calendarRange = app.calendar.create({
        inputEl: '#demo-calendar-range_start',
        locale: 'en-US',
        openIn: 'customModal',
        header: true,
        footer: true,
        dateFormat: 'yyyy-mm-dd',
        disabled: list,
      });
      calendarRange_end = app.calendar.create({
        inputEl: '#demo-calendar-range_end',
        locale: 'en-US',
        openIn: 'customModal',
        header: true,
        footer: true,
        dateFormat: 'yyyy-mm-dd',
        disabled: list,
      });


    })*/

}

function getHistory() {
  firebase.firestore().collection("reservaties").where("klant_fr_id", "==", sessionStorage.getItem('klant_id'))
    .get()
    .then(function (querySnapshot) {
      let line = "";
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        line += '<div class="timeline-item"><div class="timeline-item-date">' + doc.data().start_datum + '</div> <div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="list media-list"><ul>' + '<li value="' + doc.id + '" class="swipeout deleted-callback"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="timeline-item-title">' + doc.data().naamHotel + '</div></div><div class="timeline-item-title">' + ' ' + '</div><div class="item-subtitle">Start datum: ' + doc.data().start_datum + '</div><div class="item-subtitle">Start tijd: ' + doc.data().start_tijd + '</div><div class="item-subtitle">Eind datum: ' + doc.data().eind_datum + '</div class="item-subtitle">Eind tijd: ' + doc.data().eind_tijd + '<div></div></div></div></div><div class="swipeout-actions-right"><a href="#" class="swipeout-delete" data-confirm="Wil je deze reservatie verwijderen?"class="swipeout-delete swipeout-overswipe">Verwijderen</a></div></li>' + '</ul></div></div></div>';


      });
      $$('#reservatieHistory').html(line);
      $$('.deleted-callback').on('swipeout:deleted', function () {
        var reservatie_id = $$(this).attr('value');
        app.dialog.alert(reservatie_id);
        firebase.firestore().collection("reservaties").doc(reservatie_id).delete().then(function () {
          app.dialog.alert("Document successfully deleted!");
        }).catch(function (error) {
          console.error("Error removing document: ", error);
        });


      });


    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

  /*let apiAddress = "https://anwin.be/src/public/history3";
  opties.body = JSON.stringify({
    klant_fr_id: sessionStorage.getItem('klant_id'),

  });
  fetch(apiAddress, opties)
    .then(function (response) {
      return response.json();
    })
    .then(function (responseData) {

      var list = responseData;

      if (list.length > 0) {
        let line = "";
        for (var i = 0; i < list.length; i++) {
          line += '<div class="timeline-item"><div class="timeline-item-date">' + list[i].start_datum_D_M_Y + '</div> <div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="list media-list"><ul>' + '<li value="' + list[i].reservatie_id + '" class="swipeout deleted-callback"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="timeline-item-title">' + list[i].naamHotel + '</div></div><div class="timeline-item-title">' + list[i].naam + ' ' + list[i].voornaam + '</div><div class="item-subtitle">' + list[i].start_datum + '</div><div class="item-subtitle">' + list[i].eind_datum + '</div></div></div></div><div class="swipeout-actions-right"><a href="#" class="swipeout-delete" data-confirm="Wil je deze reservatie verwijderen?"class="swipeout-delete swipeout-overswipe">Verwijderen</a></div></li>' + '</ul></div></div></div>';
        }
        $$('#reservatieHistory').html(line);
        $$('.deleted-callback').on('swipeout:deleted', function () {
          var reservatie_id = $$(this).attr('value');
          opties.body = JSON.stringify({
            reservatie_id: reservatie_id,
          });
          let apiAddress = "https://anwin.be/src/public/deleteReservatie";
          fetch(apiAddress, opties)
            .then(function (response) {
              return response.text();
            })
            .then(function (responseData) {
              app.dialog.alert(responseData);

            })

        });

      }
    })*/

}
function getHistoryVoorMedewerker() {
  firebase.firestore().collection("reservaties").where("medewerker_fr_id", "==", sessionStorage.getItem('id'))
    .get()
    .then(function (querySnapshot) {
      let line = "";
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        line += '<div class="timeline-item"><div class="timeline-item-date">' + doc.data().start_datum + '</div> <div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="list media-list"><ul>' + '<li value="' + doc.id + '" class="swipeout deleted-callback"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="timeline-item-title">' + doc.data().naamHotel + '</div></div><div class="timeline-item-title">' + ' ' + '</div><div class="item-subtitle">Start datum: ' + doc.data().start_datum + '</div><div class="item-subtitle">Start tijd: ' + doc.data().start_tijd + '</div><div class="item-subtitle">Eind datum: ' + doc.data().eind_datum + '</div class="item-subtitle">Eind tijd: ' + doc.data().eind_tijd + '<div></div></div></div></div><div class="swipeout-actions-right"><a href="#" class="swipeout-delete" data-confirm="Wil je deze reservatie verwijderen?"class="swipeout-delete swipeout-overswipe">Verwijderen</a></div></li>' + '</ul></div></div></div>';


      });
      $$('#reservatieHistoryVoorMedewerker').html(line);
      $$('.deleted-callback').on('swipeout:deleted', function () {
        var reservatie_id = $$(this).attr('value');
        app.dialog.alert(reservatie_id);
        firebase.firestore().collection("reservaties").doc(reservatie_id).delete().then(function () {
          app.dialog.alert("Document successfully deleted!");
        }).catch(function (error) {
          console.error("Error removing document: ", error);
        });


      });


    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
  /*
    let apiAddress = "https://anwin.be/src/public/historyVoormedewerker";
    opties.body = JSON.stringify({
      medewerker_fr_id: sessionStorage.getItem('id'),
  
    });
    fetch(apiAddress, opties)
      .then(function (response) {
        return response.json();
      })
      .then(function (responseData) {
  
        var list = responseData;
  
        if (list.length > 0) {
          let line = "";
          for (var i = 0; i < list.length; i++) {
            line += '<div class="timeline-item"><div class="timeline-item-date">' + list[i].start_datum_D_M_Y + '</div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="list media-list"><ul>' + '<li value="' + list[i].reservatie_id + '" class="swipeout deleted-callback"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"></div><div class="timeline-item-title">' + 'Hotel: ' + list[i].naamHotel + '</div><div class="timeline-item-subtitle">' + list[i].start_datum + '</div><div class="timeline-item-subtitle">' + list[i].eind_datum + '</div></div></div></div><div class="swipeout-actions-right"><a href="#" class="swipeout-delete" data-confirm="Wil je deze reservatie verwijderen?"class="swipeout-delete swipeout-overswipe">Verwijderen</a></div></li>' + '</ul></div></div></div>';
  
          }
          $$('#reservatieHistoryVoorMedewerker').html(line);
          $$('.deleted-callback').on('swipeout:deleted', function () {
            var reservatie_id = $$(this).attr('value');
            opties.body = JSON.stringify({
              reservatie_id: reservatie_id,
  
            });
            let apiAddress = "https://anwin.be/src/public/deleteReservatie";
            fetch(apiAddress, opties)
              .then(function (response) {
                return response.text();
              })
              .then(function (responseData) {
                app.dialog.alert(responseData);
  
              })
  
          });
  
        }
      })*/


}


function sendReservatieMedewerker() {
  $$('#btnReserveer').on('click', function () {

    let start_datum = document.getElementById('demo-calendar-range_end').value;
    let eind_datum = document.getElementById('demo-calendar-range_end').value;


    firebase.firestore().collection("reservaties").add({
      klant_fr_id: 'N.V.T.',
      start_datum: start_datum,
      eind_datum: eind_datum,
      medewerker_fr_id: sessionStorage.getItem('id'),
      naamHotel: 'N.V.T.',
      start_tijd: 'N.V.T.',
      eind_tijd: 'N.V.T.',



    })
      .then(function () {
        notificationHotelToevoegen.open();
      })
      .catch(function (error) {
        notificationFull.open();
      });


    /* let apiAddress = "https://anwin.be/src/public/reservatieMedewerker";
     opties.body = JSON.stringify({
       id: sessionStorage.getItem('id'),
       start_datum: document.getElementById('demo-calendar-range_start').value,
       eind_datum: document.getElementById('demo-calendar-range_end').value,
     });
 
     fetch(apiAddress, opties)
       .then(function (response) {
         if (response.ok) {
           app.dialog.alert('Deze datums zijn onbeschikbaar voor de klanten!');
         }
         else {
           notificationFull.open();
         }
       })*/

  });
}

function getCalenderVoorMedewerker() {
  var calendarRange = app.calendar.create({
    inputEl: '#demo-calendar-range_start',
    locale: 'en-US',
    openIn: 'customModal',
    header: true,
    footer: true,
    dateFormat: 'dd/mm/yy',
    //disabled: list,
  });
  var calendarRange_end = app.calendar.create({
    inputEl: '#demo-calendar-range_end',
    locale: 'en-US',
    openIn: 'customModal',
    header: true,
    footer: true,
    dateFormat: 'dd/mm/yy',
    //disabled: list,
  });
  /*let apiAddress = "https://anwin.be/src/public/calendar";
  opties.body = JSON.stringify({
    medewerker_fr_id: id

  });
  fetch(apiAddress, opties)
    .then(function (response) {

      return response.json();
    })
    .then(function (responseData) {

      var list = responseData;

      var calendarRange = app.calendar.create({
        inputEl: '#demo-calendar-range_start',
        locale: 'en-US',
        openIn: 'customModal',
        header: true,
        footer: true,
        dateFormat: 'yyyy-mm-dd',
        disabled: list,
      });
      var calendarRange_end = app.calendar.create({
        inputEl: '#demo-calendar-range_end',
        locale: 'en-US',
        openIn: 'customModal',
        header: true,
        footer: true,
        dateFormat: 'yyyy-mm-dd',
        disabled: list,
      });


    })*/




}
function afsluitenSessie() {
  $$('#afsluiten').on('click', function () {
    app.dialog.confirm('Wil je echt uitloggen?', function () {
      firebase.auth().signOut().then(function () {

        app.dialog.alert('uitgelogd!');
        window.location.href = "index.html";
        // Sign-out successful.
      }).catch(function (error) {
        // An error happened.
      });

    });

  });
}



var firebaseConfig = {
  apiKey: "AIzaSyD9S37G8dNCnZWYe7eAD4R3MaFXq9B2ggY",
  authDomain: "anwin-fa985.firebaseapp.com",
  databaseURL: "https://anwin-fa985.firebaseio.com",
  projectId: "anwin-fa985",
  storageBucket: "anwin-fa985.appspot.com",
  messagingSenderId: "326563094597",
  appId: "1:326563094597:web:b32a9fbe42cbb78e05832c",
  measurementId: "G-Y1X3EJGMDF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth();
firebase.storage();


var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      notificationLogin.open();

      var user = firebase.auth().currentUser;
      if (user != null) {

        sessionStorage.setItem('klant_id', user.uid);
        klant_id = sessionStorage.getItem('klant_id');

      }
      return true;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.

    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.


  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.

    firebase.auth.GoogleAuthProvider.PROVIDER_ID,


  ],
  // Terms of service url.

  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};
ui.start('#firebaseui-auth-container', uiConfig);

