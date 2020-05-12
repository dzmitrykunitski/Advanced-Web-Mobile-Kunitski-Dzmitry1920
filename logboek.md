# Advanced-Web-Mobile-Kunitski-Dzmitry1920

## Kunitski Dzmitry
### Week 1
* Topic: Introductie (Firebase), FriendlyChat maken.
* Referentie: http://firebase.google.com/


### Week 2 - 3
* Probleem: We werken met Cordova. Als we Google service beginnen implementeren, hebben we een probleem. Google (inloggen) werkt niet. Er was een probleem met "universal-link". Op de documentatie staat niet dat we eerst de command "cordova plugin add cordova-universal-links-plugin" moeten invoeren. Daarna moeten we de command "cordova plugin add cordova-universal-links-plugin-fix --save" invoeren.
* Referentie: https://firebase.google.com/docs/auth/web/cordova

### Week 4
* Topic: Werken met Firestore ( Een mogelijkheid om de foto's opladen op de klantpagina / de medewerkerpagina).
* Referentie: https://firebase.google.com/docs/firestore/quickstart

### Week 5
* Firestore op IOS + Framework7
* Probleem: Tijdends implementeren van Firestore hebben we tegen een probleem gekomen. Als framework7 project "WKWebView" plugin gebruikt, krijgen we bij de werkende app een fout van Firestore. ![](probleem1.png)
* Oplossing: "WKWebView"plugin verwijderen en gebruiken "UIWebView" plugin.

### Week 6 - 7
* Topic: Werken aan onze app. Alle gegevens van de klant en de medewerker opslaan in Firebase en opladen in onze app ( Hotel toevoegen, reservatie maken, foto's / namen van de medewerker / de klant opladen op de profilepagina).

### Week 8 - 9
* Topic: Chat maken (Onze chat moet de connectie maken tussen de medewerker en de klant. De klant kan alle vragen stellen).

### Week 10
* Topic: Testflight
* Probleem: Vanaf april weigert app's die "UIWebView" gebruikt. Maar het is een probleem met Firestore die "WKWebView" gebruikt.
* Oplossing: We hebben voor de oplossing op de forum van Framework7 gevraagd. Bij configuren van Firestore moeten we "settings" toevoegen: ```firebase.firestore().settings({ experimentalForceLongPolling: true });``` . 
* En we moeten bij "config.xml" de stuk code toevoegen om onze app op Testflight opladen.
* ``` <platform name="ios">
    <preference name="WKWebViewOnly" value="true" />

    <feature name="CDVWKWebViewEngine">
        <param name="ios-package" value="CDVWKWebViewEngine" />
    </feature>

    <preference name="CordovaWebViewEngine" value="CDVWKWebViewEngine" />
</platform> ```
* Referentie: https://forum.framework7.io/t/firebase-firestore-problem/10108/2 
* https://cordova.apache.org/howto/2020/03/18/wkwebviewonly.html

### Week 11
* Topic: Aap Review (opladen app)
* Probleem: We hebben onze app naar apple gestuurd voor review. We hebben het antwoord gekregen:

```From Apple
Hello,

Thank you for your continued patience. 

We are writing to let you know that we have completed our investigation of your Apple Developer Program account. Upon further investigation, we found that your app does not comply with the following guidelines:

Guideline 4.3 - Design

We noticed that your app provides the same feature set as other apps submitted to the App Store; it simply varies in content or language, which is considered a form of spam.

The next submission of this app may require a longer review time, and this app will not be eligible for an expedited review until this issue is resolved.

Next Steps

- Review the Design section of the App Store Review Guidelines.
- Ensure your app is compliant with all sections of the App Store Review Guidelines and the Terms & Conditions of the Apple Developer Program. 
- Once your app is fully compliant, resubmit your app for review.

When creating multiple apps where content is the only varying element, you should offer a single app to deliver differing content to customers. If you would like to offer this content for purchase, it would be appropriate to use the in-app purchase API.

Alternatively, you may consider creating a web app, which looks and behaves similar to a native app when the customer adds it to their Home screen. Refer to the Configuring Web Applications section of the Safari Web Content Guide for more information.

Submitting apps designed to mislead or harm customers or evade the review process may result in the termination of your Apple Developer Program account. Review the Terms & Conditions of the Apple Developer Program to learn more about our policies regarding termination.

All apps submitted to the App Store are reviewed against the App Store Review Guidelines, including the Developer Code of Conduct. If we find any issues during our review, your account will be re-investigated. In order to avoid future investigations, please ensure your apps don't attempt to mislead or harm customers or undermine the review process. 

We hope you will consider making the necessary changes to be in compliance with the App Store Review Guidelines and will resubmit your revised binary. 

Best regards,

App Store Review```





