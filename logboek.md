# Advanced-Web-Mobile-Kunitski-Dzmitry1920

## Kunitski Dzmitry
### Week 1
* Topic: Introductie (Firebase), FriendlyChat maken.
* Referentie: http://firebase.google.com/


### Week 2 - 3
* Probleem: We werken met Cordova. Als we Google service beginnen implementeren, hebben we een probleem. Google (inloggen) werkt niet. Er was een probleem met "universal-link". Op de documentatie staat niet dat we eerst de command "cordova plugin add cordova-universal-links-plugin" moeten invoeren. Daarna moeten we de command "cordova plugin add cordova-universal-links-plugin-fix --save" invoeren.
* Referentie: https://firebase.google.com/docs/auth/web/cordova

### Week 4
* Topic: Werken met Firestore ( De foto's van onze werkers opslaan in Firestore als ze op onze platform beginnen registreren. 
* Probleem: De link van de foto ( Firestore ) te krijgen om deze foto op te slaan in de userprofile. 
* Referentie: https://firebase.google.com/docs/firestore/quickstart

### Week 5
* Firestore op IOS + Framework7
* Probleem: Tijdends implementeren van Firestore hebben we tegen een probleem gekomen. Als framework7 project "WKWebView" plugin gebruikt, krijgen we bij de werkende app een fout van Firestore. ![](probleem1.png)
* Oplossing: "WKWebView"plugin verwijderen en gebruiken "UIView" plugin.

### Week 6 - 7
* Topic: Werken aan onze app. Alle gegevens van de klant en de medewerker opslaan in Firebase en opladen in onze app ( Hotel toevoegen, reservatie maken, foto's / namen van de medewerker / de klant opladen op de profilepagina).

### Week 8 - 9
* Topic: Chat maken ( Onze chat moet de connectie maken tussen de medewerker en de klant. De klant kan alle vragen stellen).

### Week 10
* Topic: Testflight
* Probleem: Vanaf april weigert app's die "UIView" gebruikt. Maar het is een probleem met Firestore die "WKWebView" gebruikt.
* Oplossing: We hebben voor de oplossing op de forum van Framework7 gevraagd. Bij configuren van Firestore moeten we "settings" toevoegen: ```firebase.firestore().settings({ experimentalForceLongPolling: true });```
* Referentie: https://forum.framework7.io/t/firebase-firestore-problem/10108/2







