<template>
<v-app dark>
  <v-navigation-drawer :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" fixed app>
    <v-list>
      <v-list-tile router :to="item.to" :key="i" v-for="(item, i) in items" exact>
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
    <v-btn icon @click.stop="miniVariant = !miniVariant">
      <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
    </v-btn>
    <v-btn icon @click.stop="fixed = !fixed">
      <v-icon>remove</v-icon>
    </v-btn>
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-menu v-if="loggedIn && isBusinessUser" bottom offset-y>
        <v-btn slot="activator" flat>
          <v-icon left dark>add_box</v-icon>Add</v-btn>
        <v-list>
          <v-list-tile @click="addAccomodationDialog = true">
            <v-icon style="margin-right: 10px" dark>local_hotel</v-icon>
            <v-list-tile-title>Accomodation</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="addAttractionDialog = true">
            <v-icon style="margin-right: 10px" dark>favorite</v-icon>
            <v-list-tile-title>Attractions</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="addRestaurantDialog = true">
            <v-icon style="margin-right: 10px" dark>restaurant</v-icon>
            <v-list-tile-title>Restaurants</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn v-if="!loggedIn" @click="loginDialog = true" flat>
        <v-icon left dark>input</v-icon>Login</v-btn>
      <v-btn v-if="!loggedIn" @click="signUpDialog = true" flat>
        <v-icon left dark>launch</v-icon>Sign Up</v-btn>
      <v-menu v-if="loggedIn" bottom offset-y>
        <v-btn slot="activator" flat>
          <v-icon left dark>person</v-icon>{{ username }}</v-btn>
        <v-list>
          <v-list-tile @click="loggedIn = false; isBusinessUser = false; $store.commit('unsetLogin');">
            <v-icon style="margin-right: 10px" dark>cloud_off</v-icon>
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
  <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed>
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
              <v-text-field v-model="loginEmail" label="Email" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="loginPassword" label="Password" type="password" required></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="loginDialog = false">Cancel</v-btn>
        <v-btn color="primary" flat @click="login">Log In</v-btn>
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
              <v-text-field v-model="addAttractionName" label="Name" hint="Example: Burj Khalifa" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field v-model="addAttractionLocation" label="Location" hint="Example: Tokyo, Japan" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <input @change="onImageChange" type="file" hint="Select Image" required/>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.native="addAttractionDialog = false">Close</v-btn>
        <v-btn color="primary" flat @click="addAttraction">Add</v-btn>
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
              <v-text-field v-model="addRestaurantName" label="Name" hint="Example: KFC" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field v-model="addRestaurantLocation" label="Location" hint="Example: Tokyo, Japan" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 md4>
              <v-checkbox label="Japanese" v-model="addRestaurantCuisine" value="Japanese"></v-checkbox>
              <v-checkbox label="Thai" v-model="addRestaurantCuisine" value="Thai"></v-checkbox>
            </v-flex>
            <v-flex xs12 md4>
              <v-checkbox label="SE Asian" v-model="addRestaurantCuisine" value="SE Asian"></v-checkbox>
              <v-checkbox label="Turkish" v-model="addRestaurantCuisine" value="Turkish"></v-checkbox>
            </v-flex>
            <v-flex xs12 md4>
              <v-checkbox label="French" v-model="addRestaurantCuisine" value="French"></v-checkbox>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <input @change="onImageChange" type="file" hint="Select Image" required/>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.native="addRestaurantDialog = false">Close</v-btn>
        <v-btn color="primary" flat @click.native="addRestaurant">Add</v-btn>
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
              <v-text-field v-model="addAccomodationName" label="Name" hint="Example: Lahore Hotel" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field v-model="addAccomodationLocation" label="Location" hint="Example: Tokyo, Japan" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field v-model="addAccomodationPrice" label="Price" hint="Example: 10000" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 md6>
              <v-checkbox label="WiFi" v-model="addAccomodationFeatures" value="WiFi"></v-checkbox>
            </v-flex>
            <v-flex xs12 md6>
              <v-checkbox label="Pool" v-model="addAccomodationFeatures" value="Pool"></v-checkbox>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <input @change="onImageChange" type="file" hint="Select Image" required/>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.native="addAccomodationDialog = false">Close</v-btn>
        <v-btn color="primary" flat @click="addAccomodation">Add</v-btn>
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
      items: [{
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'favorite',
          title: 'Attractions',
          to: '/attractions'
        },
        {
          icon: 'restaurant',
          title: 'Restaurants',
          to: '/restaurants'
        },
        {
          icon: 'local_hotel',
          title: 'Accomodation',
          to: '/accommodation'
        },
        {
          icon: 'flight_takeoff',
          title: 'Travel',
          to: '/travel'
        }
      ],
      username: 'ali60351@gmail.com',
      miniVariant: true,
      rating: 1,
      right: true,
      rightDrawer: false,
      title: 'Tour Assist',
      loginDialog: false,
      loginEmail: '',
      loginPassword: '',
      signUpUsername: '',
      signUpEmail: '',
      signUpPassword: '',
      loggedIn: true,
      isBusinessUser: true,
      signUpRepeatPass: '',
      errorflag: false,
      errorMessage: '',
      signUpDialog: false,
      addAttractionDialog: false,
      addAttractionName: '',
      addAttractionLocation: '',
      selectedImage: '',
      addRestaurantDialog: false,
      addRestaurantName: '',
      addRestaurantLocation: '',
      addRestaurantCuisine: [],
      addAccomodationDialog: false,
      addAccomodationName: '',
      addAccomodationLocation: '',
      addAccomodationFeatures: [],
      addAccomodationPrice: '',
      AccomodationTypes: ['Hotel', 'Rental House'],
      cuisine: ['Italian', 'Thai', 'Japanese'],
      e1: []
    }
  },
  methods: {
    signUp: function() {
      this.errorflag = false;

      if (this.signUpPassword === this.signUpRepeatPass) {
        var fd = {
          'username': this.signUpUsername,
          'email': this.signUpEmail,
          'password': this.signUpPassword
        };

        axios.post('http://127.0.0.1:3000/signup', fd).then((res) => {
          console.log(res.status);

          if (res.data.message != null) {
            if (res.data.message.toLowerCase().indexOf('error') !== -1) {
              this.errorMessage = res.data.obj.message;
              this.errorflag = true;
            }
          } else {
            this.signUpDialog = false;
          }
        })
      }
    },
    login: function() {
      var fd = {
        email: this.loginEmail,
        password: this.loginPassword
      }

      axios.post('http://127.0.0.1:3000/login', fd).then((res) => {
        console.log(res.status);

        if (res.data.message != null) {
          if (res.data.message.toLowerCase().indexOf('error') !== -1) {
            this.errorMessage = res.data.obj.message;
            this.errorflag = true;
          } else {
            this.loggedIn = true;
            this.username = this.loginEmail;
            this.loginDialog = false;
            this.$store.commit('update', this.loginEmail);
            this.$store.commit('setLogin');

            if (this.loginEmail == 'ali60351@gmail.com') {
              this.isBusinessUser = true;
            }
          }
        }
      })
    },
    readFile: function() {
      return new Promise((resolve, reject) => {
        var reader = new FileReader();

        reader.onload = function() {
          var buffer = reader.result;
          // console.log(buffer);
          var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
          resolve(base64String);
        }

        // console.log(this.selectedImage);
        reader.readAsArrayBuffer(this.selectedImage);
      })
    },
    addAttraction: function() {
      this.errorflag = false;

      this.readFile().then(enc => {
        var fd = {
          title: this.addAttractionName,
          location: this.addAttractionLocation,
          image: enc
        };

        axios.post('http://127.0.0.1:3000/addAttraction', fd).then((res) => {
          console.log(res.status);

          if (res.data.message != null) {
            if (res.data.message.toLowerCase().indexOf('error') !== -1) {
              console.log(res.data);
              this.errorMessage = res.data.obj.message;
              this.errorflag = true;
            }
          }
        })
      })
    },
    addRestaurant: function() {
      this.errorflag = false;

      this.readFile().then(enc => {
        var fd = {
          title: this.addRestaurantName,
          location: this.addRestaurantLocation,
          cuisine: this.addRestaurantCuisine,
          image: enc
        };

        axios.post('http://127.0.0.1:3000/addRestaurant', fd).then((res) => {
          console.log(res.status);

          if (res.data.message != null) {
            if (res.data.message.toLowerCase().indexOf('error') !== -1) {
              console.log(res.data);
              this.errorMessage = res.data.obj.message;
              this.errorflag = true;
            }
          }
        })
      })
    },
    addAccomodation: function() {
      this.errorflag = false;

      this.readFile().then(enc => {
        var fd = {
          title: this.addAccomodationName,
          location: this.addAccomodationLocation,
          features: this.addAccomodationFeatures,
          price: this.addAccomodationPrice,
          image: enc
        };

        axios.post('http://127.0.0.1:3000/addAccomodation', fd).then((res) => {
          console.log(res.status);

          if (res.data.message != null) {
            if (res.data.message.toLowerCase().indexOf('error') !== -1) {
              console.log(res.data);
              this.errorMessage = res.data.obj.message;
              this.errorflag = true;
            }
          }
        })
      })
    },
    onImageChange: function(event) {
      var buffer;
      this.selectedImage = event.target.files[0];
    }
  }
}
</script>
