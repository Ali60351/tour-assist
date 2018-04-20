<template>
<v-content class="travel">
  <section>
    <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
              label="Search by name or location"
              single-line
              append-icon="search"
              v-model="search"
              @keyup="filterResults"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-expansion-panel expand>
                <v-expansion-panel-content ripple>
                  <div slot="header">Price</div>
                  <v-card>
                    <v-container>
                      <v-layout row wrap>
                        <v-flex xs10>
                          <v-slider step="10000" @mouseup="filterResults" label="Max Price" :max="200000" v-model="travelFilters.price"></v-slider>
                        </v-flex>
                        <v-flex xs2>
                          <v-text-field @keyup="filterResults" :disabled=true v-model="travelFilters.price"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-expansion-panel-content>
                <v-expansion-panel-content ripple>
                  <div slot="header">Class</div>
                  <v-card>
                    <v-container>
                      <v-layout row wrap>
                        <v-flex xs12 sm6 md4 lg3 xl2>
                          <v-checkbox
                            label="First Class"
                            v-model="travelFilters.class"
                            @change="filterResults"
                            value="First Class"
                            hide-details
                          ></v-checkbox>
                        </v-flex>
                        <v-flex xs12 sm6 md4 lg3 xl2>
                          <v-checkbox
                            label="Business"
                            v-model="travelFilters.class"
                            @change="filterResults"
                            value="Business"
                            hide-details
                          ></v-checkbox>
                        </v-flex>
                        <v-flex xs12 sm6 md4 lg3 xl2>
                          <v-checkbox
                            label="Economy"
                            v-model="travelFilters.class"
                            @change="filterResults"
                            value="Economy"
                            hide-details
                          ></v-checkbox>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-expansion-panel-content>
                <v-expansion-panel-content ripple>
                  <div slot="header">Airline</div>
                  <v-card>
                    <v-container>
                      <v-layout row wrap>
                        <v-flex xs12 sm6 md4 lg3 xl2>
                          <v-checkbox
                            label="Emirates Airlines"
                            v-model="travelFilters.title"
                            @change="filterResults"
                            value="Emirates Airlines"
                            hide-details
                          ></v-checkbox>
                        </v-flex>
                        <v-flex xs12 sm6 md4 lg3 xl2>
                          <v-checkbox
                            label="Qatar Airlines"
                            v-model="travelFilters.title"
                            @change="filterResults"
                            value="Qatar Airlines"
                            hide-details
                          ></v-checkbox>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 xl2 v-for="item in filteredTravel" :key="item.title">
              <v-card>
                <v-card-media
                  v-bind:src="item.imgUrl"
                  height="200px"
                >
                </v-card-media>
                <v-card-title primary-title>
                  <div class="text-xs-left">
                    <div class="white--text">{{item.source + ' - ' + item.destination}}</div>
                    <div class="grey--text">{{item.title}}</div>
                    <span class="grey--text">{{'Price: Rs' + item.price}}</span>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat>Share</v-btn>
                  <nuxt-link :to="'/travel/' + identify(item.title)">
                    <v-btn flat color="primary">Details</v-btn>
                  </nuxt-link>
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
var camelCase = require('camel-case');

export default {
  data () {
    return {
      travel: [],
      filteredTravel: [],
      search: '',
      travelFilters: {
        price: 200000,
        class: [],
        title: []
      }
    };
  },
  asyncData() {
    return new Promise((resolve, reject) => {
      axios.get('http://127.0.0.1:3000/fetchTravels').then(res => {
        resolve({
          filteredTravel: res.data,
          travel: res.data
        })
      }).catch(err => {
        console.log(err);
        reject(arr);
      })
    });
  },
  methods: {
    filterResults: function() {
      this.filteredTravel = this.travel.filter(post => {
          if (this.travelFilters.price > post.price) {
            if (
              this.travelFilters.class.includes(post.class) ||
              this.travelFilters.class.length === 0
            ) {
              if (
                this.travelFilters.title.includes(post.title) ||
                this.travelFilters.title.length === 0
              ) {
                if (
                  post.source.toLowerCase().includes(this.search.toLowerCase())
                ) {
                  return true;
                }

                if (
                  post.destination
                    .toLowerCase()
                    .includes(this.search.toLowerCase())
                ) {
                  return true;
                }
              }
            }
          }

          return false;
        });
    },
    identify: function(str) {
      return camelCase(str);
    }
  }
};
</script>

<style>
.travel {
    background-image: url('~/static/5b.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    z-index: 2;
}
</style>
