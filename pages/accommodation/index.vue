<template>
<v-content class="accommodation">
  <section>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field label="Search by name or location" single-line append-icon="search" v-model="search" @keyup="filterResults"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-expansion-panel expand>
            <v-expansion-panel-content ripple>
              <div slot="header">Price</div>
              <v-card>
                <v-container>
                  <v-layout row wrap>
                    <v-flex xs10>
                      <v-slider step="1000" @mouseup="filterResults" label="Max Price" :max="50000" v-model="accommodationFilters.price"></v-slider>
                    </v-flex>
                    <v-flex xs2>
                      <v-text-field @keyup="filterResults" :disabled="true" v-model="accommodationFilters.price"></v-text-field>
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
                      <v-checkbox label="WiFi" v-model="accommodationFilters.features" @change="filterResults" value="WiFi" hide-details></v-checkbox>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <v-flex xs12 sm6 md4 lg3 xl2 v-for="item in filteredAccommodation" :key="item.title">
          <v-card>
            <v-card-media v-bind:src="item.imgUrl" height="200px">
            </v-card-media>
            <v-card-title primary-title>
              <div class="text-xs-left">
                <div class="headline">{{item.title}}</div>
                <div class="grey--text">{{item.location}}</div>
                <span class="grey--text">{{'Price: Rs' + item.price}}</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn @click="rateTitle = item.title; rateDialog = true;" v-if="$store.state.loggedIn" flat> Review </v-btn>
              <nuxt-link :to="'/accommodation/' + identify(item.title)">
                <v-btn flat color="primary">Details</v-btn>
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
      accommodation: [],
      filteredAccommodation: [],
      search: '',
      accommodationFilters: {
        price: 50000,
        features: []
      }
    };
  },
  asyncData() {
    return new Promise((resolve, reject) => {
      axios.get('http://127.0.0.1:3000/fetchAccomodations').then(res => {
        resolve({
          accommodation: res.data,
          filteredAccommodation: res.data
        })
      }).catch(err => {
        console.log(err);
        reject(arr);
      })
    });
  },
  methods: {
    filterResults: function() {
      this.filteredAccommodation = this.accommodation.filter(post => {
        if (this.accommodationFilters.price > post.price) {
          if (
            this.accommodationFilters.features.some(r =>
              post.features.includes(r)
            ) ||
            this.accommodationFilters.features.length === 0
          ) {
            if (
              post.title.toLowerCase().includes(this.search.toLowerCase())
            ) {
              return true;
            }

            if (
              post.location.toLowerCase().includes(this.search.toLowerCase())
            ) {
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

      axios.post('http://127.0.0.1:3000/addAccomodationRating', fd).then((res) => {
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
.accommodation {
  background-image: url('~/static/3b.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  z-index: 2;
}
</style>
