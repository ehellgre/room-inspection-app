# Ohje

## Alkutoimet

1. Kun kloonaat repositorion, luo `.env` tiedosto backend kansion sisälle.

2. **Huom**: Sovelluksella on MongoDB tietokanta käytössä. Tee oma MongoDB clusteri ja kopioi sieltä tarvittavat username ja salasana talteen.

3. Kirjoita `.env` tiedostoon seuraavasti:
   ```plaintext
   PORT=valitsemasi portti backend serverille, esim. 5000
   MONGO_URI=mongodb+srv://käyttäjänimi:salasana@cluster0.kdfuc.mongodb.net/6s-app?retryWrites=true&w=majority
   ACCESS_TOKEN_SECRET=randommerkkijono
   REFRESH_TOKEN_SECRET=randommerkkijono
   ```
   Voit generoida "randommerkkijonot" esimerkiksi terminaalissa:
   ```bash
   node
   require('crypto').randomBytes(64).toString('hex')
   ```

## Backend

1. Navigoi backend kansioon.
2. Kirjoita terminaaliin:
   ```bash
   npm install
   npm run dev
   ```
   Tämä käynnistää node/express palvelimen.

## Frontend

   **Huom**: Frontendin package.json-tiedostossa rivillä 5 aseta proxyyn porttinumero jota backend käyttää! Esim. "proxy": "http://localhost:5000"

1. Siirry frontend kansion sisälle.
2. Kirjoita terminaaliin:

   ```bash
   npm install
   npm start
   ```

   Tämä käynnistää React-sovelluksen.

3. Testaa sovellusta selaimessa osoitteessa:
   ```
   localhost:3000
   ```
4. **Huom**: Admin-paneeliin pääsy
   Frontendistä ei pääse suoraan muuttamaan omaa roolia adminiksi, koska rekisteröityessä kaikki käyttäjät ovat oletusrooliltaan 'student'.
   Backendissä api/v1/users routet on tällä hetkellä suojattu backend/routes/user.js-tiedoston rivillä 20. Kommentoi kyseinen rivi niin voit lähettää esimerkiksi Postmanilla PATCH requestin routeen api/v1/users/:id. Tämän jälkeen 'Admin'-painike näkyy frontendin NavBarissa josta pääset Admin-paneeliin.
