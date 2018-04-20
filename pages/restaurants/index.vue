<template>
<v-content class="restaurants">
  <section>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field label="Search by name or location" single-line append-icon="search" v-model="search" @keyup="filterResults"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-expansion-panel expand>
            <v-expansion-panel-content ripple>
              <div slot="header">Cuisine</div>
              <v-card>
                <v-container>
                  <v-layout row wrap>
                    <v-flex xs12 sm6 md4 lg3 xl2>
                      <v-checkbox label="Thai" v-model="restaurantFilters.cuisine" @change="filterResults" value="Thai" hide-details></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm6 md4 lg3 xl2>
                      <v-checkbox label="Japanese" v-model="restaurantFilters.cuisine" @change="filterResults" value="Japanese" hide-details></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm6 md4 lg3 xl2>
                      <v-checkbox label="Turkish" v-model="restaurantFilters.cuisine" @change="filterResults" value="Turkish" hide-details></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm6 md4 lg3 xl2>
                      <v-checkbox label="Italian" v-model="restaurantFilters.cuisine" @change="filterResults" value="Italian" hide-details></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm6 md4 lg3 xl2>
                      <v-checkbox label="French" v-model="restaurantFilters.cuisine" @change="filterResults" value="French" hide-details></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm6 md4 lg3 xl2>
                      <v-checkbox label="SE Asian" v-model="restaurantFilters.cuisine" @change="filterResults" value="SE Asian" hide-details></v-checkbox>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content ripple>
              <div slot="header">Features</div>
              <v-card>
                <v-container>
                  <v-layout row wrap>
                    <v-flex xs12 sm6 md4 lg3 xl2>
                      <v-checkbox label="Delivery" v-model="restaurantFilters.features" @change="filterResults" value="Delivery" hide-details></v-checkbox>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <v-flex xs12 sm6 md4 lg3 xl2 v-for="item in filteredRestaurants" :key="item.title">
          <v-card>
            <v-card-media v-bind:src="item.imgUrl" height="200px">
            </v-card-media>
            <v-card-title primary-title>
              <div class="text-xs-left">
                <div class="headline">{{item.title}}</div>
                <br/>
                <span class="grey--text">{{item.location}}</span>
                <br/>
                <span class="grey--text" v-for="cuisine in item.cuisine" :key="cuisine">{{cuisine + ' '}}</span>
              </div>

            </v-card-title>
            <v-card-actions>
              <v-btn @click="rateTitle = item.title; rateDialog = true;" v-if="$store.state.loggedIn" flat> Review </v-btn>
              <nuxt-link :to="'/restaurants/' + identify(item.title)">
                <v-btn flat color="primary"> Details </v-btn>
              </nuxt-link>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
  <v-dialog v-model="rateDialog" max-width="800">
    <v-card>
      <v-card-title>
        <span class="headline">Provide Review</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12>
              <p>Select Rating</p>
              <v-icon v-for="i in rateRating" :key="i">star</v-icon>
              <v-slider v-model="rateRating" min="1" max="5" thumb-label step="1" ticks></v-slider>
            </v-flex>
            <v-flex xs12>
              <v-card-text>
                <v-container fluid>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field label="Review" v-model="rateReview" textarea></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="rateDialog = false">Cancel</v-btn>
        <v-btn color="primary" flat @click="rate">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-content>
</template>

<script>
var axios = require('axios');
var camelCase = require('camel-case');

export default {
  data() {
    return {
      rateDialog: false,
      rateTitle: '',
      rateRating: 1,
      rateReview: '',
      restaurants: [],
      filteredRestaurants: [],
      search: '',
      restaurantFilters: {
        cuisine: [],
        features: []
      }
    };
  },
  asyncData() {
    return new Promise((resolve, reject) => {
      axios.get('http://127.0.0.1:3000/fetchRestaurants').then(res => {
        resolve({
          filteredRestaurants: res.data,
          restaurants: res.data
        })
      }).catch(err => {
        console.log(err);
        reject(arr);
      })
    });
  },
  methods: {
    filterResults: function() {
      this.filteredRestaurants = this.restaurants.filter(post => {
        if (this.restaurantFilters.cuisine.some(r => post.cuisine.includes(r)) || this.restaurantFilters.cuisine.length === 0) {
          if (this.restaurantFilters.features.some(r => post.features.includes(r)) || this.restaurantFilters.features.length === 0) {
            if (post.title.toLowerCase().includes(this.search.toLowerCase())) {
              return true;
            }

            if (post.location.toLowerCase().includes(this.search.toLowerCase())) {
              return true;
            }
          }
        }

        return false;
      });
    },
    identify: function(str) {
      return camelCase(str);
    },
    rate: function() {
      var fd = {
        title: this.rateTitle,
        user: this.$store.state.username,
        rating: this.rateRating,
        review: this.rateReview
      };

      axios.post('http://127.0.0.1:3000/addRestaurantRating', fd).then((res) => {
        console.log(res.status);

        if (res.data.message != null) {
          if (res.data.message.toLowerCase().indexOf('error') !== -1) {
            this.errorMessage = res.data.obj.message;
            this.errorflag = true;
          }
        }

        this.rateDialog = false;
      });
    }
  }
};
</script>

<style>
.restaurants {
  background-image: url('~/static/2b.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  z-index: 2;
}
</style>
