// Firebase configuratie
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
firebase.firestore().settings({
  experimentalForceLongPolling: true
});
// FirebaseUi toevoegen op de pagina.
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
        firebase.firestore().collection("klant").doc(user.uid).set({
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          uid: user.uid
        })
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            app.dialog.alert(error);
          });
        sessionStorage.setItem('klant_id', user.uid);
        klant_id = sessionStorage.getItem('klant_id');

      }
      return false;
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

// Framework7 implemteren.
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
      // Home pagina
      path: '/index/',
      url: 'index.html',


    },

    {
      path: '/lijstMedewerker/',
      url: 'lijstMedewerker.html',
      options: {
        transition: 'f7-flip',
      },
      on: {
        pageInit: function (event, page) {
          lijstMedewerkers();

        },
      }
    },
    {
      path: '/lijstVanDeKlantenReserv/',
      url: 'lijstVanDeKlantenReserv.html',
      options: {
        transition: 'f7-flip',
      },
      on: {
        pageInit: function (event, page) {
          lijstVanDeKlanten();

        },
      }
    },
    {
      // Startpagina van de klant.
      path: '/klant/',
      url: 'klant.html',
      options: {
        transition: 'f7-flip',
      },
      on: {
        pageInit: function (event, page) {
          loadKlantGgegevens();
          afsluitenSessie();


        },
      }
    },
    {
      // De chatpagina voor de medewerker.
      path: '/berichtenVoorMedewerker/',
      url: 'berichtenVoorMedewerker.html',
      options: {
        transition: 'f7-flip',
      },
      on: {
        pageInit: function (event, page) {
          loadMessagesMedewerker();
          saveMessageMedewerker();
          $$('#terugNaarOnzeKlant').on('click', function () {
            view.router.navigate('/lijstKlanten/', { transition: 'f7-circle' });

          });


        },
      }
    },
    {
      // De chatpagina voor de klant.
      path: '/chat/',
      url: 'chat.html',
      options: {
        transition: 'f7-flip',
      },
      on: {
        pageInit: function (event, page) {
          loadMessages();
          saveMessage();

          $$('#terugNaarOnzeMedewerker').on('click', function () {
            view.router.navigate('/onzemedewerker/', { transition: 'f7-circle' });

          });



        },
      }
    },
    {
      // De pagina met de lijst van onze klanten.
      path: '/lijstKlanten/',
      url: 'lijstKlanten.html',
      options: {
        transition: 'f7-flip',
      },
      on: {
        pageInit: function (event, page) {
          lijstenVanDeKlanten();

          // De hulpsheet om de klant informatie te zien.
          app.sheet.create({
            el: '.my-sheet-swipe-to-close2',
            swipeToClose: true,
            backdrop: true,
          });



        },
      }
    },
    {
      // De pagina met de lijst van onze medewerkers.
      path: '/onzemedewerker/',
      url: 'onzemedewerker.html',
      options: {
        transition: 'f7-flip',
      },
      on: {
        pageInit: function (event, page) {
          onzeMedewerkerGegevens();




        },
      }
    },
    {
      // Startpagina van de medewerker.
      path: '/medewerkerpagina/',
      url: 'medewerkerpagina.html',
      options: {
        transition: 'f7-flip',
      },
      on: {
        pageInit: function (event, page) {
          loadMedewerkersGegegevens();
          afsluitenSessie();

        },
      }
    },
    {
      // Op deze pagina kan de klant zijn reservaties raadplegen.
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
      // Op deze pagina kan de klant zijn hotels toevoegen of verwijderen.
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
      // Via deze pagina kan de klant onze medewerkers reserveren die in zijn hotel gaat werken.
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
      // Op deze pagina kan de medewerker zijn reservaties raadplegen.
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
      path: '/wijzigMedewerkerGegevens/',
      url: 'wijzigMedewerkerGegevens.html',
      options: {
        transition: 'f7-flip',
      },
      on: {
        pageInit: function (event, page) {
          var file = "";
          wijzigWachtwoord();
          wijzigNaamVoornaam();
          $$('#fotoLabel').on('click', function () {
            document.getElementById('btnImg').click();
            $$('#FormLabelVerder').hide();
            $$('#FormLabelRegistreren').hide();
            $$('#fotoLabel').hide();
            $$('#uploadenFoto').show();



          });
          $$('#uploadenFoto').on('click', function () {
            file = document.getElementById("btnImg").files[0];
            if (document.getElementById("btnImg").files.length == 0) {
              app.dialog.alert('Selecteer een foto!');
              return;

            }
            else {
              fotoRef = storageRef.child(file.name);
              fotoRef.put(file).then(function (snapshot) {

              }).then(function () {
                var user = firebase.auth().currentUser;
                fotoRef.getDownloadURL().then(function (url) {
                  user.updateProfile({
                    photoURL: url

                  }).then(function () {


                  }).catch(function (error) {
                    app.dialog.alert(error);
                  });
                  firebase.firestore().collection("medewerker").doc(user.uid).set({
                    name: user.displayName,
                    email: user.email,
                    photoUrl: url,
                    uid: user.uid
                  })
                    .then(function () {
                      console.log("Document successfully written!");
                      view.router.navigate('/medewerkerpagina/', { transition: 'f7-circle' });

                    })
                    .catch(function (error) {
                      app.dialog.alert(error);
                    });
                }).catch(function (error) {
                  // Handle any errors
                });

              }).catch(function (error) {
                app.dialog.alert(error);
              });

            }


          });






        },

      }
    },
    {
      path: '/herstelWachtwoord/',
      url: 'herstelWachtwoord.html',
      options: {
        transition: 'f7-flip',
      },
      on: {
        pageInit: function (event, page) {
          $$('#btnHerstelWachtwoordVerder').on('click', function () {
            var email = document.getElementById('emailVerficatie').value;
            wachtwoord = document.getElementById('wachtwoord').value;
            herhaalWachtwoord = document.getElementById('herhaalWachtwoord').value;
            $$('#inputLabelWachtwoord').hide();
            $$('#btnHerstelWachtwoordLabel').hide();
            $$('#labelHerstelInput').css('display', 'block');
            $$('#labelHerstelBtn').css('display', 'block');

          });
          $$('#btnHerstelWachtwoord').on('click', function () {

            view.router.navigate('/inloggenmedewerker/', { transition: 'f7-circle' });

          });
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
      switchDarkTheme();
      app.sheet.create({
        el: '.my-sheet-swipe-to-close',
        swipeToClose: true,
        backdrop: true,
      });




    }
  }
});

function switchDarkTheme() {
  var toggle = app.toggle.create({
    el: '#toggleLabel',
    on: {
      change: function () {
        if (toggle.checked) {
          $$('#app').removeClass('theme-dark');
          // do something
        }
        else {
          $$('#app').addClass('theme-dark');
        }

        console.log('Toggle changed')
      }
    }
  })
}

// verwijzen naar de opslag
// ---------------------------
var storage = firebase.storage();
var storageRef = storage.ref();

// id's voor de klant en de medewerker.
// ---------------------------
let id;
let klant_id;
var medewerker_id;

// de variablen om de gegevens te bewaren
// ----------------------------
var email = "";
var wachtwoord = "";
var herhaalWachtwoord = "";
var displayNaam = "";
var fotoRef = "";
var fileNaam = "";


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
      view.router.navigate('/lijstMedewerker/');

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
      var userMedewerker = firebase.auth().currentUser;
      if (userMedewerker != null) {

        sessionStorage.setItem('id', userMedewerker.uid);

      }
      notificationLoginMedewerker.open();
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      notificationFoutLogin.open();

      // ...
    });


  });
}

function getRegistApi() {

  var file = "";

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
    else {

      // Create user with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, wachtwoord).then(function () {
        $$('#FormLabelVerder').hide();
        $$('#FormLabelNaamVoornaam').css('display', 'block');

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
        app.dialog.alert(error);
        // [END_EXCLUDE]
      });

    }


  });
  $$('#btnVerderFoto').on('click', function () {
    displayNaam = document.getElementById('naamVoornaam').value;
    if (displayNaam.length <= 0) {

      app.dialog.alert('Vul een naam en voornaam!');
      return;
    }
    else {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: document.getElementById('naamVoornaam').value,
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/anwin-fa985.appspot.com/o/avatar.png?alt=media&token=5801b53c-a777-42dc-bddf-8a51809a631c'

      }).then(function () {

        //$$('#FormLabelNaamVoornaam').hide();
        $$('#labelRegistreren').css('display', 'block');

      }).catch(function (error) {
        app.dialog.alert(error);
      });
    }




  });
  $$('#labelRegistreren').on('click', function () {
    var user = firebase.auth().currentUser;
    firebase.firestore().collection("medewerker").doc(user.uid).set({
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
      uid: user.uid,
    })
      .then(function () {
        console.log("Document successfully written!");
        notificationLoginEnRegistrerenMedewerker.open();
      })
      .catch(function (error) {
        app.dialog.alert(error);
      });

  });
  /* $$('#fotoLabel').on('click', function () {
     document.getElementById('btnImg').click();
 
 
 
   });
   $$('#verderNaarRegestreren').on('click', function () {
     file = document.getElementById("btnImg").files[0];
     if (document.getElementById("btnImg").files.length == 0) {
       app.dialog.alert('Selecteer een foto!');
       return;
 
     }
     else {
       fileNaam = file.name;
       fotoRef = storageRef.child(file.name);
       fotoRef.put(file).then(function (snapshot) {
 
 
       }).catch(function (error) {
         app.dialog.alert(error);
       });
 
     }
 
   });*/

}
function wijzigWachtwoord() {
  $$('#btnWijzigenWachtwoord').on('click', function () {
    wachtwoord = document.getElementById('wachtwoord').value;
    herhaalWachtwoord = document.getElementById('herhaalWachtwoord').value;

    if (wachtwoord.length < 4) {
      app.dialog.alert('Vul een een sterke wachtwoord aub!');
      return;
    }
    if (herhaalWachtwoord != wachtwoord) {
      app.dialog.alert('De combinatie van de wachtwoord is niet juist!');
      return;
    }
    else {
      var user = firebase.auth().currentUser;
      user.updatePassword(wachtwoord).then(function () {
        app.dialog.alert('Uw wachtwoord is gewijzigd!');
        document.getElementById('wachtwoord').value = " ";
        document.getElementById('herhaalWachtwoord').value = " ";
        // Update successful.
      }).catch(function (error) {
        app.dialog.alert(error);

        // An error happened.
      });
    }
  });
}
function wijzigNaamVoornaam() {
  $$('#wijzigNaamVoornaam').on('click', function () {
    var user = firebase.auth().currentUser;

    if (document.getElementById('naamVoornaam').value < 0) {
      app.dialog.alert('Vul de juiste naam en voornaam');
      return;

    }
    else {
      user.updateProfile({
        displayName: document.getElementById('naamVoornaam').value,

      }).then(function () {
        app.dialog.alert('Uw naam is gewijzigd!');
        document.getElementById('naamVoornaam').value = " ";
        // Update successful.
      }).catch(function (error) {
        // An error happened.
      });

    }

  });
}
function bewaarMedewerker() {
  var line = "";
  var line2 = "";

  var fotoRef = storageRef.child(fileNaam);

  $$('#btnRegistrerenMedewerker').on('click', function () {
    var fotoRef2 = storageRef.child(fileNaam);
    fotoRef2.getDownloadURL().then(function (url) {

      var user = firebase.auth().currentUser;
      user.updateProfile({
        photoURL: url


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




    }).catch(function (error) {
      app.dialog.alert(error);


    });
  });

  fotoRef.getDownloadURL().then(function (url) {
    line += '<img style="width: 120px; height: 120px; border-radius: 50%" src="' + url + '">';
    line2 += '<div class="login-screen-title">Welkom, ' + displayNaam + '</div>';
    $$('.fotoContanier').append(line);
    $$('#mede_profileVoorRegistreren').prepend(line2);


  }).catch(function (error) {


  });
}
// De lijst van de medewerkers ophalen.
function getMedewerkers() {

  firebase.firestore().collection("medewerker").get().then(function (querySnapshot) {
    let line = "";
    querySnapshot.forEach(function (doc) {

      line += '<li><label class="item-radio item-content"><input type="radio" name="medewerker" value="' + doc.id + '"/><i class="icon icon-radio"></i><div class="item-media"><img src="' + doc.data().photoUrl + '"width="44"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title medewerkerNaam">' + doc.data().name + " " + '</div></div><div class="item-subtitle">Night Auditor</div></div></label></li>';

    });
    $$('#optieMedewerker').html(line);
  });


}
// Via deze functie kan de klant zijn hotel toevoegen of verwijderen.
function postHotel() {
  $$('#btnToevoegenHotel').on('click', function () {
    var uidKlant = sessionStorage.getItem('klant_id');
    firebase.firestore().collection('klant').doc(uidKlant)
      .collection('hotels').add({
        hotelNaam: document.getElementById('hotelNaam').value,
        adres: document.getElementById('adres').value,
        nummer: document.getElementById('nummer').value,
        postcode: document.getElementById('postcode').value,
        gemeente: document.getElementById('gemeente').value,
      }).then(function () {
        notificationHotelToevoegen.open();


      }).catch(function (error) {
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
// De reservaties opslaan in Firebase.
function sendReservatie() {
  $$('#btnVerderHotel').on('click', function () {
    $$('#hotelLabel').css('display', 'block');
    $$('#btnVerderStartdatum').css('display', 'block');
    $$('#medewerkerLabel').css('display', 'none');
    $$('#btnVerderHotel').css('display', 'none');


  });
  $$('#btnVerderStartdatum').on('click', function () {
    $$('#hotelLabel').css('display', 'none');
    $$('#startDatumLabel').css('display', 'block');
    $$('#btnVerderStartdatum').css('display', 'none');
    $$('#btnVerderEinddatum').css('display', 'block');


  });
  $$('#btnVerderEinddatum').on('click', function () {
    $$('#startDatumLabel').css('display', 'none');
    $$('#eindDatumLabel').css('display', 'block');
    $$('#btnVerderEinddatum').css('display', 'none');
    $$('#btnReserveer').css('display', 'block');


  });

  $$('#btnReserveer').on('click', function () {
    var uidKlant = sessionStorage.getItem('klant_id');
    let start_datum = document.getElementById('demo-calendar-range_start').value;
    let eind_datum = document.getElementById('demo-calendar-range_end').value;
    let start_tijd = document.getElementById('picker-starttijd').value;
    let eind_tijd = document.getElementById('picker-eindtijd').value;
    //var selected_medewerker = $$('input[name="medewerker"]:checked').val();
    var uidMedewerker = $$('input[name="medewerker"]:checked').val();
    var hotelNaam = $$('input[name="hotel"]:checked').val();
    firebase.firestore().collection('klant').doc(uidKlant)
      .collection('reservaties').doc(uidMedewerker).collection('reserv').add({
        start_datum: start_datum,
        eind_datum: eind_datum,
        start_tijd: start_tijd,
        eind_tijd: eind_tijd,
        hotelNaam: hotelNaam,
      }).then(function () {
        notificationReservatie.open();
      }).catch(function (error) {
        app.dialog.alert(error);
      });
    firebase.firestore().collection('medewerker').doc(uidMedewerker)
      .collection('reservaties').add({
        start_datum: start_datum,
        eind_datum: eind_datum,
        start_tijd: start_tijd,
        eind_tijd: eind_tijd,
        hotelNaam: hotelNaam,
      }).then(function () {
      }).catch(function (error) {
        app.dialog.alert(error);
      });

  });
}
// de lijst van de klanten ophalen.
function getHotel() {
  let line = "";

  firebase.firestore().collection('klant').doc(klant_id)
    .collection('hotels').get()
    .then(function (querySnapshot) {
      let line = "";
      querySnapshot.forEach(function (doc) {
        line += '<li value="' + doc.id + '"  class="swipeout deleted-callback"> <div class="item-content swipeout-content"><div class="item-inner"> <div class="item-title-row"><div class="item-title">' + doc.data().hotelNaam + '</div></div><div class="item-subtitle">' + doc.data().adres + ' ' + doc.data().nummer + ', ' + doc.data().postcode + ' ' + doc.data().gemeente + '</div></div></div><div class="swipeout-actions-right"><a href="#" data-confirm="Wil je die hotel verwijderen?" class="swipeout-delete swipeout-overswipe">Verwijderen</a></div></li>';

      });
      $$('#hotelGegegevens').html(line);
      $$('.deleted-callback').on('swipeout:deleted', function () {

        var locatie_id = $$(this).attr('value');
        firebase.firestore().collection('klant').doc(klant_id)
          .collection('hotels').doc(locatie_id).delete().then(function () {
            app.dialog.alert("Document successfully deleted!");
          }).catch(function (error) {
            console.error("Error removing document: ", error);
          });



      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

}

// De lijst van de hotels ophalen.
function getHotelLocatie() {

  firebase.firestore().collection('klant').doc(klant_id)
    .collection('hotels').get()
    .then(function (querySnapshot) {
      let line2 = "";
      querySnapshot.forEach(function (doc) {
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


// Datum ophalen voor de bepaalde medewerker
function getCalender() {
  defaultCalendar();
  $$('#optieMedewerker').on('change', function (e) {
    app.calendar.destroy(calendarRange);
    app.calendar.destroy(calendarRange_end);

    var selected_value = $$('input[name="medewerker"]:checked').val();
    var datum = [];


    firebase.firestore().collection('klant').doc(klant_id).collection('reservaties').doc(selected_value)
      .collection('reserv').get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          datum.push({ from: doc.data().start_datum, to: doc.data().eind_datum });




        });
        console.log("Current cities in CA: ", datum.join(", "));


      }).then(function () {
        console.log(datum);
        calendarRange = app.calendar.create({
          inputEl: '#demo-calendar-range_start',
          locale: 'en-US',
          openIn: 'customModal',
          header: true,
          footer: true,
          dateFormat: 'yyyy-mm-dd',
          disabled: datum,


        });
        calendarRange_end = app.calendar.create({
          inputEl: '#demo-calendar-range_end',
          locale: 'en-US',
          openIn: 'customModal',
          header: true,
          footer: true,
          dateFormat: 'yyyy-mm-dd',
          disabled: datum,
        });

      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });


  });
}
// Default kalender bij opstarten van de pagina.
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
    dateFormat: 'yyyy-mm-dd',

  });
  calendarRange_end = app.calendar.create({
    inputEl: '#demo-calendar-range_end',
    locale: 'en-US',
    openIn: 'customModal',
    header: true,
    footer: true,
    dateFormat: 'yyyy-mm-dd',
    disabled: [
      {
        from: new Date(2020, 5, 10),
        to: new Date(2020, 5, 15)
      }

    ],

  });


}
// De reservaties voor de klant ophalen.
function getHistory() {
  firebase.firestore().collection("medewerker").where("uid", "==", sessionStorage.getItem('mede_id'))
    .get()
    .then(function (querySnapshot) {

      let navbardisplayNaam = "";
      let navbardisplayFoto = "";
      querySnapshot.forEach(function (doc) {
        navbardisplayNaam += doc.data().name;
        navbardisplayFoto += '<img style="border-radius: 50%;" width="42" height="42" src="' + doc.data().photoUrl + '">';


      });
      $$('#navbarNaam').text(navbardisplayNaam);
      $$('#navbarFoto').html(navbardisplayFoto);


    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
  
    $$('.my-sheet-top').on('sheet:opened', function (e) {

      firebase.firestore().collection("medewerker").where("uid", "==", sessionStorage.getItem('mede_id'))
        .get()
        .then(function (querySnapshot) {
          let line = "";
          querySnapshot.forEach(function (doc) {
            line += '<div class="block-title block-title-large">' + doc.data().name + '</div><span style="font-size: 22px;"><i class="fas fa-envelope"></i> ' + doc.data().email + '</span><div id="fotoKlant"><img style="width: 120px; height: 120px; border-radius: 50%" src="' + doc.data().photoUrl + '"></div>';
  
  
          });
          $$('#sheetMederwerkerGegevens').html(line);
  
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
  
  
    });
  firebase.firestore().collection('klant').doc(sessionStorage.getItem('klant_id'))
    .collection('reservaties').doc(sessionStorage.getItem('mede_id')).collection('reserv').get()
    .then(function (querySnapshot) {
      let line = "";
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        line += '<div class="timeline-item"><div class="timeline-item-date">' + doc.data().start_datum + '</div> <div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="list media-list"><ul>' + '<li value="' + doc.id + '" class="swipeout deleted-callback"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="timeline-item-title">' + doc.data().hotelNaam + '</div></div><div class="timeline-item-title">' + ' ' + '</div><div class="item-subtitle">Start datum: ' + doc.data().start_datum + '</div><div class="item-subtitle">Start tijd: ' + doc.data().start_tijd + '</div><div class="item-subtitle">Eind datum: ' + doc.data().eind_datum + '</div> <div class="item-subtitle">Eind tijd: ' + doc.data().eind_tijd + '<div></div></div></div></div><div class="swipeout-actions-right"><a href="#" class="swipeout-delete" data-confirm="Wil je deze reservatie verwijderen?"class="swipeout-delete swipeout-overswipe">Verwijderen</a></div></li>' + '</ul></div></div></div>';


      });
      $$('#reservatieHistory').html(line);
      $$('.deleted-callback').on('swipeout:deleted', function () {
        var reservatie_id = $$(this).attr('value');
        firebase.firestore().collection('klant').doc(sessionStorage.getItem('klant_id'))
          .collection('reservaties').doc(sessionStorage.getItem('mede_id')).collection('reserv').doc(reservatie_id).delete().then(function () {
            app.dialog.alert("De reservering is verwijderd!");
          }).catch(function (error) {
            console.error("Error removing document: ", error);
          });


      });


    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

}

// De reservaties voor de medewerker ophalen.
function getHistoryVoorMedewerker() {
  firebase.firestore().collection("klant").where("uid", "==", sessionStorage.getItem('kl_id'))
    .get()
    .then(function (querySnapshot) {

      let navbardisplayNaam = "";
      let navbardisplayFoto = "";
      querySnapshot.forEach(function (doc) {
        navbardisplayNaam += doc.data().name;
        navbardisplayFoto += '<img style="border-radius: 50%;" width="42" height="42" src="' + doc.data().photoUrl + '">';


      });
      $$('#navbarNaam').text(navbardisplayNaam);
      $$('#navbarFoto').html(navbardisplayFoto);


    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

    $$('.my-sheet-top').on('sheet:opened', function (e) {

      firebase.firestore().collection("klant").where("uid", "==", sessionStorage.getItem('kl_id'))
        .get()
        .then(function (querySnapshot) {
          let line = "";
          querySnapshot.forEach(function (doc) {
            line += '<div class="block-title block-title-large">' + doc.data().name + '</div><span style="font-size: 22px;"><i class="fas fa-envelope"></i> ' + doc.data().email + '</span><div id="fotoKlant"><img style="width: 120px; height: 120px; border-radius: 50%" src="' + doc.data().photoUrl + '"></div>';
  
  
          });
          $$('#sheetKlantGegevens').html(line);
  
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
  
  
    });
  
  firebase.firestore().collection('klant').doc(sessionStorage.getItem('kl_id'))
    .collection('reservaties').doc(sessionStorage.getItem('id')).collection('reserv').get()
    .then(function (querySnapshot) {
      let line = "";
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        line += '<div class="timeline-item"><div class="timeline-item-date">' + doc.data().start_datum + '</div> <div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="list media-list"><ul>' + '<li value="' + doc.id + '" class="swipeout deleted-callback"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="timeline-item-title">' + doc.data().hotelNaam + '</div></div><div class="timeline-item-title">' + ' ' + '</div><div class="item-subtitle">Start datum: ' + doc.data().start_datum + '</div><div class="item-subtitle">Start tijd: ' + doc.data().start_tijd + '</div><div class="item-subtitle">Eind datum: ' + doc.data().eind_datum + '</div> <div class="item-subtitle">Eind tijd: ' + doc.data().eind_tijd + '<div></div></div></div></div><div class="swipeout-actions-right"><a href="#" class="swipeout-delete" data-confirm="Wil je deze reservatie verwijderen?"class="swipeout-delete swipeout-overswipe">Verwijderen</a></div></li>' + '</ul></div></div></div>';


      });
      $$('#reservatieHistoryVoorMedewerker').html(line);
      $$('.deleted-callback').on('swipeout:deleted', function () {
        var reservatie_id = $$(this).attr('value');
        firebase.firestore().collection('klant').doc(sessionStorage.getItem('kl_id'))
          .collection('reservaties').doc(sessionStorage.getItem('id')).collection('reserv').doc(reservatie_id).delete().then(function () {
            app.dialog.alert("De reservering is verwijderd!");
          }).catch(function (error) {
            console.error("Error removing document: ", error);
          });


      });


    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });


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
// uitloggen functie
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

// de functie die de gegevens van de medewerker (via Firebase) op de pagina toont.
function loadMedewerkersGegegevens() {
  var user = firebase.auth().currentUser;
  let line = "";
  let line2 = "";

  if (user != null) {
    user.providerData.forEach(function (profile) {


      line += '<div class="login-screen-title">' + profile.displayName + '</div>';
      line2 += '<div class="fotoContanier" class="item-media"><a href="/wijzigMedewerkerGegevens/"><img style="width: 120px; border: 7px solid #fff; height: 120px; border-radius: 50%" src="' + profile.photoURL + '"></a></div>';


    });
    $$('#medewerkerProfile').append(line);
    $$('#medewerkerProfile').append(line2);


  }
}
// de functie die de gegevens van de klant (via Firebase) op de pagina toont.
function loadKlantGgegevens() {
  var user = firebase.auth().currentUser;
  let line = "";
  let line2 = "";

  if (user != null) {
    user.providerData.forEach(function (profile) {

      line += '<div class="login-screen-title">' + profile.displayName + '</div>';
      line2 += '<div class="item-media"><img style="width: 120px;  height: 120px; border-radius: 50%" src="' + profile.photoURL + '"></div>';


    });
    $$('#titleKlant').append(line);
    $$('#fotoKlant').append(line2);



  }
}

// de functie die de lijst van onze medewerkers ophaalt.
function onzeMedewerkerGegevens() {
  let line = "";
  var mede_id = "";

  firebase.firestore().collection("medewerker").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // line += '<li class="medeList"  value="' + doc.id + '"><a href="#" data-sheet=".my-sheet-swipe-to-close1" class="item-link item-content sheet-open"><div class="item-media"><img src="' + doc.data().photoUrl + '" width="80" height="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + doc.data().name + '</div></div><div class="item-subtitle"></div></div></a></li>';
      line += '<li class="medeList"  value="' + doc.id + '"><a href="#" class="item-link item-content"><div class="item-media"><img src="' + doc.data().photoUrl + '" width="80" height="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + doc.data().name + '</div></div><div class="item-subtitle"></div></div></a></li>';

    });
    $$('#medewerkersGegevens').html(line);

    $$('.medeList').on('click', function () {
      mede_id = $$(this).attr('value');
      sessionStorage.setItem('medewerker_id', mede_id);
      view.router.navigate('/chat/', { transition: 'f7-circle' });

    });


  });

}
function lijstMedewerkers() {
  let line = "";
  var mede_id = "";

  firebase.firestore().collection("medewerker").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // line += '<li class="medeList"  value="' + doc.id + '"><a href="#" data-sheet=".my-sheet-swipe-to-close1" class="item-link item-content sheet-open"><div class="item-media"><img src="' + doc.data().photoUrl + '" width="80" height="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + doc.data().name + '</div></div><div class="item-subtitle"></div></div></a></li>';
      line += '<li class="medeList"  value="' + doc.id + '"><a href="#" class="item-link item-content"><div class="item-media"><img src="' + doc.data().photoUrl + '" width="80" height="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + doc.data().name + '</div></div><div class="item-subtitle"></div></div></a></li>';

    });
    $$('#lijstVanMedewerkers').html(line);

    $$('.medeList').on('click', function () {
      mede_id = $$(this).attr('value');
      sessionStorage.setItem('mede_id', mede_id);
      view.router.navigate('/reservatiespagina/', { transition: 'f7-circle' });

    });


  });

}
function lijstVanDeKlanten() {
  let line = "";
  var kl_id = "";

  firebase.firestore().collection("klant").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // line += '<li class="medeList"  value="' + doc.id + '"><a href="#" data-sheet=".my-sheet-swipe-to-close1" class="item-link item-content sheet-open"><div class="item-media"><img src="' + doc.data().photoUrl + '" width="80" height="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + doc.data().name + '</div></div><div class="item-subtitle"></div></div></a></li>';
      line += '<li class="klList"  value="' + doc.id + '"><a href="#" class="item-link item-content"><div class="item-media"><img src="' + doc.data().photoUrl + '" width="80" height="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + doc.data().name + '</div></div><div class="item-subtitle"></div></div></a></li>';

    });
    $$('#lijstVanDeKlanten').html(line);

    $$('.klList').on('click', function () {
      kl_id = $$(this).attr('value');
      sessionStorage.setItem('kl_id', kl_id);
      view.router.navigate('/geschiedenisvoormedewerker/', { transition: 'f7-circle' });

    });


  });

}


// functies om van een ingelogde gebruiker gegevens te krijgen.
function getUserName() {
  return firebase.auth().currentUser.displayName;
}
function getUserUid() {
  return firebase.auth().currentUser.uid;
}
function getUserPhoto() {
  return firebase.auth().currentUser.photoURL;
}
// Berichten van de klant opslaan in Firebase.
function saveMessage() {

  $$('#sendMessageButton').on('click', function () {
    var uidKlant = getUserUid();
    var naamKlant = getUserName();
    //var photoKlant = getUserPhoto();

    var uidMedewerker = sessionStorage.getItem('medewerker_id');

    var messageText = document.getElementById('textMessage').value;

    var messageRef = firebase.firestore().collection('klant').doc(uidKlant)
      .collection('messages').doc(uidMedewerker);
    messageRef.collection('ms').add({
      uidUser: uidKlant,
      text: messageText,
      naamKlant: naamKlant,
      //photoKlant: photoKlant,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function () {
      document.getElementById('textMessage').value = '';
    }).catch(function (error) {
      console.error('Error writing new message to Firebase Database', error);
    });

    var messageRefMed = firebase.firestore().collection('medewerker').doc(uidMedewerker)
      .collection('messages').doc(uidKlant);
    messageRefMed.collection('ms').add({
      uidUser: uidKlant,
      text: messageText,
      naamKlant: naamKlant,
      // photoKlant: photoKlant,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function () {

    }).catch(function (error) {
      console.error('Error writing new message to Firebase Database', error);
    });

  });

}
// de berichten voor de klant ophalen van Firebase en opladen deze berichten op onze app.
function loadMessages() {

  let line = "";

  var uidKlant = sessionStorage.getItem('klant_id');
  var uidMedewerker = sessionStorage.getItem('medewerker_id');

  firebase.firestore().collection("medewerker").where("uid", "==", uidMedewerker)
    .get()
    .then(function (querySnapshot) {

      let navbardisplayNaam = "";
      let navbardisplayFoto = "";
      querySnapshot.forEach(function (doc) {
        navbardisplayNaam += doc.data().name;
        navbardisplayFoto += '<img style="border-radius: 50%;" width="42" height="42" src="' + doc.data().photoUrl + '">';


      });
      $$('#navbarNaam').text(navbardisplayNaam);
      $$('#navbarFoto').html(navbardisplayFoto);


    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
  // Gegevens van de medewerker opladen.
  $$('.my-sheet-top').on('sheet:opened', function (e) {

    firebase.firestore().collection("medewerker").where("uid", "==", uidMedewerker)
      .get()
      .then(function (querySnapshot) {
        let line = "";
        querySnapshot.forEach(function (doc) {
          line += '<div class="block-title block-title-large">' + doc.data().name + '</div><span style="font-size: 22px;"><i class="fas fa-envelope"></i> ' + doc.data().email + '</span><div id="fotoKlant"><img style="width: 120px; height: 120px; border-radius: 50%" src="' + doc.data().photoUrl + '"></div>';


        });
        $$('#sheetMederwerkerGegevens').html(line);

      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });


  });

  var messageRef = firebase.firestore().collection('klant').doc(uidKlant)
    .collection('messages').doc(uidMedewerker);

  messageRef.collection('ms').orderBy('timestamp').onSnapshot(function (snapshot) {

    snapshot.docChanges().forEach(function (change) {
      if (change.type === 'removed') {



      } else if (change.type === 'added') {
        var message = change.doc.data();

        if (message.uidUser == uidKlant) {

          line += '<div class="message message-sent"><div class="message-content"><div class="message-bubble"><div class="message-text">' + message.text + '</div></div></div></div>';

        }
        else if (message.uidUser == uidMedewerker) {
          line += '<div class="message message-received"><div class="message-content"><div class="message-bubble"><div class="message-text">' + message.text + '</div></div></div></div>';


        }
      }
    });
    $$('#berichten').html(line);

  });
}
// de functie die de lijst van onze klanten ophaalt.
function lijstenVanDeKlanten() {
  let line = "";
  var kl_id = "";
  firebase.firestore().collection("klant").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      //line += '<li class="klantList"  value="' + doc.id + '"><a href="#" class="item-link item-content" data-sheet=".my-sheet-swipe-to-close2"><div class="item-media"><img src="' + doc.data().photoUrl + '" width="80" height="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + doc.data().name + '</div></div><div class="item-subtitle">Meer ...</div></div></a></li>';
      //line += '<li class="klantList"  value="' + doc.id + '"><a href="#" data-sheet=".my-sheet-swipe-to-close2" class="item-link item-content sheet-open"><div class="item-media"><img src="' + doc.data().photoUrl + '" width="80" height="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + doc.data().name + '</div></div><div class="item-subtitle"></div></div></a></li>';
      line += '<li class="klantList"  value="' + doc.id + '"><a href="#" class="item-link item-content"><div class="item-media"><img src="' + doc.data().photoUrl + '" width="80" height="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + doc.data().name + '</div></div><div class="item-subtitle"></div></div></a></li>';


    });
    $$('#lijstKlanten').html(line);

    $$('.klantList').on('click', function () {
      kl_id = $$(this).attr('value');
      sessionStorage.setItem('kl_id', kl_id);
      view.router.navigate('/berichtenVoorMedewerker/', { transition: 'f7-circle' });


    });
    $$('.my-sheet-swipe-to-close2').on('sheet:opened', function (e) {

      firebase.firestore().collection("klant").where("uid", "==", kl_id)
        .get()
        .then(function (querySnapshot) {
          let line = "";
          querySnapshot.forEach(function (doc) {
            line += '<div class="block-title block-title-large">' + doc.data().name + '</div><div id="fotoKlant"><img style="width: 120px; height: 120px; border-radius: 50%" src="' + doc.data().photoUrl + '"></div>';


          });
          $$('#popupKlantGegevens').html(line);
          $$('#popupKlantGegevens').append('<div class="fab fab-right-bottom fab-morph" data-morph-to=".toolbar.fab-morph-target"><a href="/berichtenVoorMedewerker/" class="popup-open"><span style="font-size: 50px;"><i class="fab fa-facebook-messenger"></i></span></a></div>');

        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });


    });

  });

}
// Berichten van de medewerker opslaan in Firebase 
function saveMessageMedewerker() {

  $$('#sendMessageButton').on('click', function () {
    var uidMedewerker = getUserUid();
    var uidKlant = sessionStorage.getItem('kl_id');
    var naamMedewerker = getUserName();
    // var photoMedewerker = getUserPhoto();

    var messageText = document.getElementById('textMessage').value;

    var messageRef = firebase.firestore().collection('medewerker').doc(uidMedewerker)
      .collection('messages').doc(uidKlant);
    messageRef.collection('ms').add({
      uidUser: uidMedewerker,
      text: messageText,
      naamMedewerker: naamMedewerker,
      // photoMedewerker: photoMedewerker,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function () {
      document.getElementById('textMessage').value = '';
    }).catch(function (error) {
      console.error('Error writing new message to Firebase Database', error);
    });

    var messageRefKlant = firebase.firestore().collection('klant').doc(uidKlant)
      .collection('messages').doc(uidMedewerker);
    messageRefKlant.collection('ms').add({
      uidUser: uidMedewerker,
      text: messageText,
      naamMedewerker: naamMedewerker,
      //photoMedewerker: photoMedewerker,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function () {

    }).catch(function (error) {
      console.error('Error writing new message to Firebase Database', error);
    });

  });

}
// de berichten voor de medewerker ophalen van Firebase en opladen deze berichten op onze app.
function loadMessagesMedewerker() {
  let line = "";
  var uidKlant = sessionStorage.getItem('kl_id');
  var uidMedewerker = getUserUid();


  firebase.firestore().collection("klant").where("uid", "==", uidKlant)
    .get()
    .then(function (querySnapshot) {

      let navbardisplayNaam = "";
      let navbardisplayFoto = "";
      querySnapshot.forEach(function (doc) {
        navbardisplayNaam += doc.data().name;
        navbardisplayFoto += '<img style="border-radius: 50%;" width="42" height="42" src="' + doc.data().photoUrl + '">';


      });
      $$('#navbarNaam').text(navbardisplayNaam);
      $$('#navbarFoto').html(navbardisplayFoto);


    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
    $$('.my-sheet-top').on('sheet:opened', function (e) {

      firebase.firestore().collection("klant").where("uid", "==", uidKlant)
        .get()
        .then(function (querySnapshot) {
          let line = "";
          querySnapshot.forEach(function (doc) {
            line += '<div class="block-title block-title-large">' + doc.data().name + '</div><span style="font-size: 22px;"><i class="fas fa-envelope"></i> ' + doc.data().email + '</span><div id="fotoKlant"><img style="width: 120px; height: 120px; border-radius: 50%" src="' + doc.data().photoUrl + '"></div>';
  
  
          });
          $$('#sheetKlantGegevens').html(line);
  
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
  
  
    });

  var messageRef = firebase.firestore().collection('medewerker').doc(uidMedewerker)
    .collection('messages').doc(uidKlant);
  /*messageRef.collection('ms').orderBy('timestamp').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      if (doc.data().uidUser == uidMedewerker) {
        line += '<div class="message message-sent"><div class="message-content"><div class="message-bubble"><div class="message-text">' + doc.data().text + '</div></div></div></div>'

      }
      else if (doc.data().uidUser == uidKlant) {
        line += '<div class="message message-received"><div class="message-content"><div class="message-bubble"><div class="message-text">' + doc.data().text + '</div></div></div></div>'

      }
      // doc.data() is never undefined for query doc snapshots
      // line += '<div class="message message-sent"><div class="message-content"><div class="message-bubble"><div class="message-text">' + doc.data().text + '</div></div></div></div>'
      //console.log(doc.id, " => ", doc.data());
    });
    $$('#berichten').html(line);

  })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });*/

  messageRef.collection('ms').orderBy('timestamp').onSnapshot(function (snapshot) {

    snapshot.docChanges().forEach(function (change) {
      if (change.type === 'removed') {



      } else if (change.type === 'added') {
        var message = change.doc.data();

        if (message.uidUser == uidMedewerker) {
          line += '<div class="message message-sent"><div class="message-content"><div class="message-bubble"><div class="message-text">' + message.text + '</div></div></div></div>';

        }
        else if (message.uidUser == uidKlant) {
          line += '<div class="message message-received"><div class="message-content"><div class="message-bubble"><div class="message-text">' + message.text + '</div></div></div></div>';


        }
      }
    });
    $$('#berichten').html(line);

  });

  // Create the query to load the last 12 messages and listen for new ones.
  /*if (loadMessageQuery === undefined) {
     loadMessageQuery = firebase.firestore().collection('messages').where("idKlant", "==", sessionStorage.getItem('klant_id')).where("idMedewerker", "==", sessionStorage.getItem('medewerker_id'));

  // Start listening to the query.
  loadMessageQuery.onSnapshot(function (snapshot) {
    snapshot.docChanges().forEach(function (change) {
      console.log(performance.now());
      if (change.type === 'removed') {

      } else {
        var message = change.doc.data();

        line += '<div class="message message-sent"><div class="message-content"><div class="message-bubble"><div class="message-text">' + message.text + '</div></div></div></div>'

      }
    });
    $$('#berichten').html(line);

  });
  }*/
  /*var query = firebase.firestore().collection('messages').orderBy('idKlant').orderBy('timestamp');

  // var query = firebase.firestore().collection('messages').where("idKlant", "==", sessionStorage.getItem('klant_id')).where("idMedewerker", "==", sessionStorage.getItem('medewerker_id'));

  // Start listening to the query.
  query.onSnapshot(function (snapshot) {

    snapshot.docChanges().forEach(function (change) {
      console.log(performance.now());
      if (change.type === 'added') {
        var message = change.doc.data();
        line += '<div class="message message-sent"><div class="message-content"><div class="message-bubble"><div class="message-text">' + message.text + '</div></div></div></div>'
      } else {


      }
    });
    $$('#berichten').html(line);


  });*/
}

