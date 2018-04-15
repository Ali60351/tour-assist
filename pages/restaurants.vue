<template>
<v-content class="restaurants">
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
                  <div slot="header">Cuisine</div>
                  <v-card>
                    <v-container>
                      <v-layout row wrap>
                        <v-flex xs12 sm6 md4 lg3 xl2>
                          <v-checkbox
                            label="Thai"
                            v-model="restaurantFilters.cuisine"
                            @change="filterResults"
                            value="Thai"
                            hide-details
                          ></v-checkbox>
                        </v-flex>
                        <v-flex xs12 sm6 md4 lg3 xl2>
                          <v-checkbox
                            label="Japanese"
                            v-model="restaurantFilters.cuisine"
                            @change="filterResults"
                            value="Japanese"
                            hide-details
                          ></v-checkbox>
                        </v-flex>
                        <v-flex xs12 sm6 md4 lg3 xl2>
                          <v-checkbox
                            label="Turkish"
                            v-model="restaurantFilters.cuisine"
                            @change="filterResults"
                            value="Turkish"
                            hide-details
                          ></v-checkbox>
                        </v-flex>
                        <v-flex xs12 sm6 md4 lg3 xl2>
                          <v-checkbox
                            label="Italian"
                            v-model="restaurantFilters.cuisine"
                            @change="filterResults"
                            value="Italian"
                            hide-details
                          ></v-checkbox>
                        </v-flex>
                        <v-flex xs12 sm6 md4 lg3 xl2>
                          <v-checkbox
                            label="French"
                            v-model="restaurantFilters.cuisine"
                            @change="filterResults"
                            value="French"
                            hide-details
                          ></v-checkbox>
                        </v-flex>
                        <v-flex xs12 sm6 md4 lg3 xl2>
                          <v-checkbox
                            label="SE Asian"
                            v-model="restaurantFilters.cuisine"
                            @change="filterResults"
                            value="SE Asian"
                            hide-details
                          ></v-checkbox>
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
                          <v-checkbox
                            label="Delivery"
                            v-model="restaurantFilters.features"
                            @change="filterResults"
                            value="Delivery"
                            hide-details
                          ></v-checkbox>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 xl2 v-for="item in filteredRestaurants" :key="item.title">
              <v-card>
                <v-card-media
                  v-bind:src="item.image"
                  height="200px"
                >
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
export default {
  data () {
    return {
      attractions: [
        {
          title: 'Mount Fuji',
          location: 'Tokyo, Japan',
          image: require('@/static/fuji.jpg')
        },
        {
          title: 'Hiroshima Peace Memorial',
          location: 'Hiroshima, Japan',
          image: require('@/static/hiroshima_peace_memorial.jpg')
        },
        {
          title: 'Osaka Aquarium',
          location: 'Osaka, Japan',
          image: require('@/static/Osaka_Aquarium.jpg')
        },
        {
          title: 'Tokyo Skytree',
          location: 'Tokyo, Japan',
          image: require('@/static/tokyo_skytree.jpg')
        },
        {
          title: 'Tokyo Tower',
          location: 'Tokyo, Japan',
          image: require('@/static/tokyo_tower.jpg')
        }
      ],
      restaurants: [
        {
          title: 'Pai Thai',
          location: 'Dubai, United Arab Emirates (UAE)',
          features: ['Delivery'],
          rating: 4,
          cuisine: ['Thai', 'SE Asian'],
          image: require('@/static/paithai.jpg')
        },
        {
          title: 'Nusr-Et',
          location: 'Dubai, United Arab Emirates (UAE)',
          features: [],
          rating: 5,
          cuisine: ['Turkish'],
          image: require('@/static/nusret.jpg')
        },
        {
          title: 'Zuma',
          location: 'Dubai, United Arab Emirates (UAE)',
          features: [],
          rating: 4,
          cuisine: ['Japanese'],
          image: require('@/static/zuma.jpg')
        },
        {
          title: 'Solo Bistronomia & Vino Bar',
          location: 'Dubai, United Arab Emirates (UAE)',
          features: [],
          rating: 5,
          cuisine: ['Italian'],
          image: require('@/static/solo.jpg')
        },
        {
          title: 'La Petite Maison',
          location: 'Dubai, United Arab Emirates (UAE)',
          features: [],
          rating: 4,
          cuisine: ['French'],
          image: require('@/static/lapetit.jpg')
        }
      ],
      accommodation: [
        {
          title: 'Holiday Inn Express Dubai Airport',
          location: 'Dubai, United Arab Emirates (UAE)',
          rating: 4,
          features: [],
          price: 8500,
          image: require('@/static/Holiday_Inn.png')
        },
        {
          title: 'Crowne Plaza Dubai',
          location: 'Dubai, United Arab Emirates (UAE)',
          rating: 4,
          features: ['WiFi'],
          price: 16000,
          image: require('@/static/Crowne_Plaza_Dubai.png')
        },
        {
          title: 'Hawthorn Suites',
          location: 'Dubai, United Arab Emirates (UAE)',
          rating: 5,
          features: [],
          price: 17000,
          image: require('@/static/Hawthorn_Suites.png')
        },
        {
          title: 'Melia Dubai Hotel',
          location: 'Dubai, United Arab Emirates (UAE)',
          rating: 4,
          features: [],
          price: 11000,
          image: require('@/static/Melia_Dubai_Hotel.png')
        },
        {
          title: 'Gloria Hotel',
          location: 'Dubai, United Arab Emirates (UAE)',
          rating: 5,
          features: [],
          price: 19000,
          image: require('@/static/Gloria_Hotel.png')
        }
      ],
      travel: [
        {
          source: 'Lahore, Pakistan',
          destination: 'Tokyo, Japan',
          airline: 'Emirates Airlines',
          class: 'Business',
          price: 50000,
          image: require('@/static/emirates.png')
        },
        {
          source: 'Lahore, Pakistan',
          destination: 'Tokyo, Japan',
          airline: 'Qatar Airlines',
          class: 'First Class',
          price: 100000,
          image: require('@/static/qatar.png')
        },
        {
          source: 'Lahore, Pakistan',
          destination: 'Dubai, United Arab Emirates (UAE)',
          airline: 'Emirates Airlines',
          class: 'Economy',
          price: 150000,
          image: require('@/static/emirates.png')
        }
      ],
      filteredTravel: [],
      filteredAccommodation: [],
      filteredRestaurants: [
        {
          title: 'Pai Thai',
          location: 'Dubai, United Arab Emirates (UAE)',
          features: ['Delivery'],
          rating: 4,
          cuisine: ['Thai', 'SE Asian'],
          image: require('@/static/paithai.jpg')
        },
        {
          title: 'Nusr-Et',
          location: 'Dubai, United Arab Emirates (UAE)',
          features: [],
          rating: 5,
          cuisine: ['Turkish'],
          image: require('@/static/nusret.jpg')
        },
        {
          title: 'Zuma',
          location: 'Dubai, United Arab Emirates (UAE)',
          features: [],
          rating: 4,
          cuisine: ['Japanese'],
          image: require('@/static/zuma.jpg')
        },
        {
          title: 'Solo Bistronomia & Vino Bar',
          location: 'Dubai, United Arab Emirates (UAE)',
          features: [],
          rating: 5,
          cuisine: ['Italian'],
          image: require('@/static/solo.jpg')
        },
        {
          title: 'La Petite Maison',
          location: 'Dubai, United Arab Emirates (UAE)',
          features: [],
          rating: 4,
          cuisine: ['French'],
          image: require('@/static/lapetit.jpg')
        }
      ],
      filteredAttractions: [
        {
          title: 'Mount Fuji',
          location: 'Tokyo, Japan',
          image: require('@/static/fuji.jpg')
        },
        {
          title: 'Hiroshima Peace Memorial',
          location: 'Hiroshima, Japan',
          image: require('@/static/hiroshima_peace_memorial.jpg')
        },
        {
          title: 'Osaka Aquarium',
          location: 'Osaka, Japan',
          image: require('@/static/Osaka_Aquarium.jpg')
        },
        {
          title: 'Tokyo Skytree',
          location: 'Tokyo, Japan',
          image: require('@/static/tokyo_skytree.jpg')
        },
        {
          title: 'Tokyo Tower',
          location: 'Tokyo, Japan',
          image: require('@/static/tokyo_tower.jpg')
        }
      ],
      search: '',
      restaurantFilters: {
        cuisine: [],
        features: []
      }
    };
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

