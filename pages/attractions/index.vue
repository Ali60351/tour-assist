<template>
  <v-content class="attractions">
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
          <v-flex xs12 sm6 md4 lg3 xl2 v-for="item in filteredAttractions" :key="item.title">
            <v-card>
              <v-card-media
                v-bind:src="item.imgUrl"
                height="200px"
              >
              </v-card-media>
              <v-card-title primary-title>
                <div class="text-xs-left">
                  <div class="headline">{{item.title}}</div>
                  <span class="grey--text">{{item.location}}</span>
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
  data () {
    return {
      attractions: [],
      filteredTravel: [],
      filteredAccommodation: [],
      filteredRestaurants: [],
      filteredAttractions: [],
      search: ''
    };
  },
  asyncData () {
      return new Promise((resolve, reject) => {
          axios.get('http://127.0.0.1:3000/fetchAttractions').then(res => {
              resolve({
                  filteredAttractions: res.data,
                  attractions: res.data
              })
          }).catch(err => {
              console.log(err);
              reject(arr);
          })
      });
  },
  methods: {
    filterResults: function() {
      this.filteredAttractions = this.attractions.filter(post => {
        if (post.title.toLowerCase().includes(this.search.toLowerCase())) {
          return true;
        }

        if (post.location.toLowerCase().includes(this.search.toLowerCase())) {
          return true;
        }

        return false;
      });
    }
  }
};
</script>

<style>
.attractions {
  background-image: url('~/static/1b.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  z-index: 2;
}
</style>

