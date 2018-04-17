<template>
  <v-app dark>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu bottom offset-y>
          <v-btn v-if="loggedIn" slot="activator" flat><v-icon left dark>add_box</v-icon>Add</v-btn>
          <v-list>
            <v-list-tile @click="addAccomodationDialog = true">
              <v-icon style="margin-right: 10px" dark>local_hotel</v-icon><v-list-tile-title>Accommodation</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="addAttractionDialog = true">
              <v-icon style="margin-right: 10px" dark>favorite</v-icon><v-list-tile-title>Attractions</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="addRestaurantDialog = true">
              <v-icon style="margin-right: 10px" dark>restaurant</v-icon><v-list-tile-title>Restaurants</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn v-if="!loggedIn" @click="loginDialog = true" flat><v-icon left dark>input</v-icon>Login</v-btn>
        <v-btn v-if="!loggedIn" @click="signUpDialog = true" flat><v-icon left dark>launch</v-icon>Sign Up</v-btn>
        <v-menu v-if="loggedIn" bottom offset-y>
          <v-btn slot="activator" flat><v-icon left dark>person</v-icon>{{ username }}</v-btn>
          <v-list>
            <v-list-tile @click="loggedIn = false">
              <v-icon style="margin-right: 10px" dark>cloud_off</v-icon><v-list-tile-title>Log Out</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <nuxt />
    <v-dialog v-model="loginDialog" max-width="290">
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Username or Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.native="signUpDialog = false">Cancel</v-btn>
          <v-btn color="primary" flat @click.native="signUpDialog = false">Log In</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="signUpDialog" max-width="500">
      <v-card>
        <v-card-title>
          <span class="headline">Sign Up</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field v-model="signUpUsername" label="Username" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="signUpEmail" label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="signUpPassword" label="Password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="signUpRepeatPass" label="Repeat Password" type="password" required></v-text-field>
              </v-flex>
              <v-alert type="error" :value="errorflag">
                {{ errorMessage }}
              </v-alert>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.native="signUpDialog = false">Cancel</v-btn>
          <v-btn color="primary" flat @click="signUp">Sign Up</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addAttractionDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Add New Attraction</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Name" hint="Example: Burj Khalifa" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="City" hint="Example: Dubai" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Country" hint="Example: UAE" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.native="addAttractionDialog = false">Close</v-btn>
          <v-btn color="primary" flat @click.native="addAttractionDialog = false">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addRestaurantDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Add New Restaurant</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Name" hint="Example: Salt N Pepper" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="City" hint="Example: London" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Country" hint="Example: UK" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <p>Select Rating</p>
                <star-rating text-class="starLabel" active-color="#7DB8DE" inactive-color="#333" :star-size="20" :increment="0.5"></star-rating>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-select
                  :items="cuisine"
                  label="Select Cuisine"
                  single-line
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.native="addRestaurantDialog = false">Close</v-btn>
          <v-btn color="primary" flat @click.native="addRestaurantDialog = false">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addAccomodationDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Add New Accomodation</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Name" hint="Example: Pearl Continental" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="City" hint="Example: Lahore" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Country" hint="Example: PK" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <p>Select Rating</p>
                <star-rating text-class="starLabel" active-color="#7DB8DE" inactive-color="#333" :star-size="20" :increment="0.5"></star-rating>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  name="input"
                  label="Price"
                  id="price"
                  mask="#"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-select
                  :items="accommodationTypes"
                  v-model="e1"
                  label="Select Type"
                  single-line
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-expansion-panel expand>
                  <v-expansion-panel-content ripple>
                    <div slot="header">Features</div>
                    <v-card>
                      <v-container>
                        <v-layout row wrap>
                          <v-flex xs12>
                            <v-checkbox
                              label="Pool"
                              value="Pool"
                              hide-details
                            ></v-checkbox>
                          </v-flex>
                          <v-flex xs12>
                            <v-checkbox
                              label="Spa"
                              value="Spa"
                              hide-details
                            ></v-checkbox>
                          </v-flex>
                          <v-flex xs12>
                            <v-checkbox
                              label="WiFi"
                              value="WiFi"
                              hide-details
                            ></v-checkbox>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.native="addAccomodationDialog = false">Close</v-btn>
          <v-btn color="primary" flat @click.native="addAccomodationDialog = false">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  var axios = require('axios');

  export default {
    data() {
      return {
        clipped: true,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'favorite', title: 'Attractions', to: '/attractions' },
          { icon: 'restaurant', title: 'Restaurants', to: '/restaurants' },
          { icon: 'local_hotel', title: 'Accommodation', to: '/accommodation' },
          { icon: 'flight_takeoff', title: 'Travel', to: '/travel' }
        ],
        username: 'Ali60351',
        miniVariant: true,
        right: true,
        rightDrawer: false,
        title: 'Tour Assist',
        loginDialog: false,
        signUpUsername: '',
        signUpEmail: '',
        signUpPassword: '',
        loggedIn: true,
        signUpRepeatPass: '',
        errorflag: false,
        errorMessage: '',
        signUpDialog: false,
        addAttractionDialog: false,
        addRestaurantDialog: false,
        addAccomodationDialog: false,
        accommodationTypes: ['Hotel', 'Rental House'],
        cuisine: ['Italian', 'Thai', 'Japanese'],
        e1: []
      }
    },
    methods: {
      signUp: function () {
        this.errorflag = false;

        if (this.signUpPassword === this.signUpRepeatPass) {
          var fd = {
            'username': this.signUpUsername,
            'email': this.signUpEmail,
            'password': this.signUpPassword
          };

          axios.post('http://127.0.0.1:3000/signup', fd).then((res) => {
            console.log(res.status);
            
            if(res.data.message.toLowerCase().indexOf('error') !== -1)
            {
              this.errorMessage = res.data.obj.message;
              this.errorflag = true;
            }
          })
        }
      }
    }
  }
</script>
