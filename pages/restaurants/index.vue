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
                <br/>
                <br/>
                <v-icon v-for="i in item.rating" :key="i">star</v-icon>
              </div>

            </v-card-title>
            <v-card-actions>
              <v-btn flat>Share</v-btn>
              <v-btn flat color="primary">Details</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</v-content>
</template>

<script>
var axios = require('axios');

export default {
  data() {
    return {
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
