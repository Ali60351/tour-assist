<template>
  <v-content class="home"> <!-- Insert Main Content here -->
    <section>
      <v-parallax :src="require('@/static/1.jpg')" height="400">
        <v-layout
          column
          align-center
          justify-center
          class="white--text"
        >
          <img :src="require('@/static/logo.png')" height="150px" alt="Vuetify.js">
          <h1 class="white--text mb-2 display-1 text-xs-center">Tour Assist</h1>
          <div class="subheading mb-3 text-xs-center">Supercharge your Tours!</div>
        </v-layout>
      </v-parallax>
    </section>
    <section>
      <v-layout
        column
        wrap
        class="my-5"
        align-center
      >
        <v-flex xs12 sm4 class="my-3">
          <div class="text-xs-center">
            <h2 class="headline">The best way to start traveling</h2>
            <span class="subheading">
              Convenient and efficient
            </span>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">attach_money</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Cheap</div>
                  </v-card-title>
                  <v-card-text>
                    Find the cheapest deals on meals and rest places you love
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Fast</div>
                  </v-card-title>
                  <v-card-text>
                    Grab the deals from your favorite restaurants and hotels before anyone else
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Customizable</div>
                  </v-card-title>
                  <v-card-text>
                    Find hotels and restaurants near you that suit all your needs and desires 
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
    <section>
      <v-parallax :src="require('@/static/2.jpg')" height="400">
        <v-layout column align-center justify-center>
          <div class="headline white--text mb-3 text-xs-center">Planning trips has never been easier</div>
          <em>Kick-start your journey today</em>
        </v-layout>
      </v-parallax>
    </section>
    <section>
      <v-layout row wrap>
        <v-flex class="quickLink" id="attractionLink" xs12 sm3>
          <nuxt-link to="/attractions">
            <p>Attractions<br/><v-icon>details</v-icon></p>
          </nuxt-link>
        </v-flex>
        <v-flex class="quickLink" id="restaurantLink" xs12 sm3>
          <nuxt-link to="/restaurants">
            <p>Restaurants<br/><v-icon>details</v-icon></p>
          </nuxt-link>
        </v-flex>
        <v-flex class="quickLink" id="accommodationLink" xs12 sm3>
          <nuxt-link to="/accommodation">
            <p>Accommodations<br/><v-icon>details</v-icon></p>
          </nuxt-link>
        </v-flex>
        <v-flex class="quickLink" id="travelLink" xs12 sm3>
          <nuxt-link to="/travel">
            <p>Travel<br/><v-icon>details</v-icon></p>
          </nuxt-link>
        </v-flex>
      </v-layout>
    </section>
    <section>
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-5">
          <v-flex xs12 sm4>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Company info</div>
              </v-card-title>
              <v-card-text>
                We are always working our hardest to provide our users with the cheapest deals and help you explore the beautiful world around you.
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4 offset-sm1>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Contact us</div>
              </v-card-title>
              <v-card-text>
                Feel free to contact us if you have some suggestions or queries.
              </v-card-text>
              <v-list class="transparent">
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="blue--text text--lighten-2">phone</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>111-222-3333</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="blue--text text--lighten-2">place</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Lahore, Pakistan</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="blue--text text--lighten-2">email</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-btn color="primary" href="mailto:mail@example.org">Email</v-btn>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </v-content>
</template>

<style>
.quickLink {
  min-height: 400px;
  text-align: center;
  display: table-cell;
  line-height: 200px;
  font-size: 1.35em;
  transition: box-shadow 0.4s;
}

.quickLink a {
  text-decoration: none;
  color: #FFF;
}

.quickLink:hover {
  box-shadow: inset 0px 0px 30px 5px #7DB8DE;
  cursor: pointer;
}

#attractionLink {
  background-image: url('~/static/1b.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
          
#restaurantLink {
  background-image: url('~/static/2b.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
        
#accommodationLink {
  background-image: url('~/static/3b.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
        
#travelLink {
  background-image: url('~/static/5b.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
</style>

