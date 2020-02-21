var $$ = Dom7;

var app = new Framework7({
  root: '#app', // App root element

  id: 'io.framework7.myapp', // App bundle ID
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
    },
    {
      path: '/klant/',
      url: 'klant.html',
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
      path: '/form/',
      url: 'form.html',
      options: {
        transition: 'f7-flip',
      },
      on: {

        pageInit: function (event, page) {
          getContact();
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
      path: '/login-screen/',
      url: 'login-screen.html',
      options: {
        transition: 'f7-circle',
      },
      on: {
        pageInit: function (event, page) {
          getLoginApi();
          TerugNaarIndex();

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

    // Default route (404 page). MUST BE THE LAST

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
      //$$('#loginNaam').html('log in');


    }
  }
});
// Login Screen Demo


// ---------------------------
let id;
let klant_id;
let medewerker_id;
// ----------------------------

var notificationClickToClose = app.notification.create({
  icon: '<i class="fas fa-check-circle"></i>',
  title: 'ANWIN',
  titleRightText: 'Contact Form',
  subtitle: 'Verzonden',
  text: 'We nemen met u contact zo snel mogelijk op.',
  closeTimeout: 1700,

});
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
  titleRightText: 'Log in',
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
  titleRightText: 'Log in',
  subtitle: 'Je bent ingelogd.',
  text: 'Bedankt!',
  closeTimeout: 1700,
  on: {
    close: function () {
      view.router.navigate('/medewerkerpagina/', { transition: 'f7-circle' });
    },
  },

});
var notificationHotrelToevoegen = app.notification.create({
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
let optiesDelete = {
  method: "DELETE", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "omit", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }

};

// ----------------------------

function getLoginApi() {

  $$('#btnLogin').on('click', function () {
    let apiAddress = "https://anwin.be/src/public/login";


    opties.body = JSON.stringify({
      gebruikersnaam: document.getElementById('gebruikersnaamLogin').value,
      wachtwoord: document.getElementById('wachtwoordLogin').value,
    });
    fetch(apiAddress, opties)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {

        if (Object.keys(response).length > 0) {
          var i = 0;
          sessionStorage.setItem('klant_id', response[i]['klantId']);
          klant_id = sessionStorage.getItem('klant_id');
          notificationLogin.open();
        } else {
          notificationFoutLogin.open();
        }
      })


  });
}
function getLoginApiMedewerker() {

  $$('#btnLoginMedewerker').on('click', function () {
    let apiAddress = "https://anwin.be/src/public/loginMedewerker";


    opties.body = JSON.stringify({
      gebruikersnaam: document.getElementById('gebruikersnaamMedewerker').value,
      wachtwoord: document.getElementById('wachtwoordMedewerker').value,
    });
    fetch(apiAddress, opties)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {

        if (Object.keys(response).length > 0) {
          var i = 0;
          sessionStorage.setItem('id', response[i]['id']);
          id = sessionStorage.getItem('id');
          notificationLoginMedewerker.open();
        } else {
          notificationFoutLogin.open();
        }
      })


  });
}

function getRegistApi() {
  $$('#btnRegistreren').on('click', function () {
    firebase.firestore().collection("medewerker").add({
      naam: document.getElementById('naam').value,
      voornaam: document.getElementById('voornaam').value,
      gebruikersnaam: document.getElementById('gebruikersnaam').value,
      e_mail: document.getElementById('e_mail').value,
      wachtwoord: document.getElementById('wachtwoord').value,
    })
      .then(function (docRef) {
        
        firebase.firestore().collection("medewerker").doc(docRef.id)
          .onSnapshot(function (doc) {
            app.dialog.alert("Je bent geregistrer", doc.data().naam);
          });
      })
      
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  

  });

}



function getContact() {
  $$('#btnVerzenden').on('click', function () {
    let apiAddress = "https://anwin.be/anwin/www/mailApi.php";


    opties.body = JSON.stringify({
      naam: document.getElementById('naam').value,
      voornaam: document.getElementById('voornaam').value,
      onderwerp: document.getElementById('onderwerp').value,
      email: document.getElementById('email').value,
      tel: document.getElementById('tel').value,
      bericht: document.getElementById('bericht').value,

    });
    fetch(apiAddress, opties)
      .then(function (response) {
        if (response.ok) {
          notificationClickToClose.open();
        }
        else {
          notificationFull.open();
        }
      })
  });

}

function getMedewerkers() {
  fetch('https://anwin.be/src/public/medewerker')
    .then(function (response) {
      return response.json();
    })
    .then(function (responseData) {

      var list = responseData;
      let line = "";

      if (list.length > 0) {

        for (var i = 0; i < list.length; i++) {
          //$$('#optieMedewerker').append('<option value="' + list[i].id + '">' + list[i].naam + " " + list[i].voornaam + '</option>');
          // line += '<option value="' + list[i].id + '">' + list[i].naam + " " + list[i].voornaam + '</option>';
          line += '<li><label class="item-radio item-content"><input type="radio" name="medewerker" value="' + list[i].id + '"/><i class="icon icon-radio"></i><div class="item-media"><img src="./img/' + list[i].naam + '.jpeg"width="44"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + list[i].naam + " " + list[i].voornaam + '</div></div><div class="item-subtitle">Night Auditor</div></div></label></li>';

        }
        $$('#optieMedewerker').html(line);

      }
    })


}

function postHotel() {
  $$('#btnToevoegenHotel').on('click', function () {

    let apiAddress = "https://anwin.be/src/public/hotelToevoegen";
    opties.body = JSON.stringify({

      hotelNaam: document.getElementById('hotelNaam').value,
      adres: document.getElementById('adres').value,
      nummer: document.getElementById('nummer').value,
      postcode: document.getElementById('postcode').value,
      gemeente: document.getElementById('gemeente').value,
      klant_id: sessionStorage.getItem('klant_id'),

    });

    fetch(apiAddress, opties)
      .then(function (response) {
        if (response.ok) {
          notificationHotrelToevoegen.open();

        }
        else {
          notificationFull.open();
        }
      })

  });
}

function TerugNaarIndex() {
  $$('.TerugNaarHome').on('click', function () {
    view.router.navigate('/index/', { transition: 'f7-circle' });
  });
}


function sendReservatie() {
  $$('#btnReserveer').on('click', function () {
    let startENstartTijd = document.getElementById('demo-calendar-range_start').value + ' ' + document.getElementById('picker-starttijd').value;
    let eindEneindTijd = document.getElementById('demo-calendar-range_end').value + ' ' + document.getElementById('picker-eindtijd').value;
    var selected_medewerker = $$('input[name="medewerker"]:checked').val();
    var selected_hotel = $$('input[name="hotel"]:checked').val();
    let apiAddress = "https://anwin.be/src/public/reservatie";
    opties.body = JSON.stringify({
      klant_fr_id: sessionStorage.getItem('klant_id'),
      naamHotel: selected_hotel,
      //naamHotel: document.getElementById('optieHotel').value,
      //medewerker_fr_id: document.getElementById('optieMedewerker').value,
      medewerker_fr_id: selected_medewerker,
      start_datum: startENstartTijd,
      eind_datum: eindEneindTijd,

    });

    fetch(apiAddress, opties)
      .then(function (response) {
        if (response.ok) {
          notificationReservatie.open();
        }
        else {
          notificationFull.open();
        }
      })

  });
}
function getHotel() {

  let apiAddress = "https://anwin.be/src/public/hotel";
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
    })


}
function getHotelLocatie() {

  let apiAddress = "https://anwin.be/src/public/hotel";
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
    })


}
var calendarRange;
var calendarRange_end;

function getCalender() {

  defaultCalendar();

  $$('#optieMedewerker').on('change', function (e) {
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


  });

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


  let apiAddress = "https://anwin.be/src/public/calendar";
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


    })

}

function getHistory() {

  let apiAddress = "https://anwin.be/src/public/history3";
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
    })

}
function getHistoryVoorMedewerker() {

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
    })


}


function sendReservatieMedewerker() {
  $$('#btnReserveer').on('click', function () {
    let apiAddress = "https://anwin.be/src/public/reservatieMedewerker";
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
      })

  });
}

function getCalenderVoorMedewerker() {

  let apiAddress = "https://anwin.be/src/public/calendar";
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


    })




}
