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
                            v-model="travelFilters.airline"
                            @change="filterResults"
                            value="Emirates Airlines"
                            hide-details
                          ></v-checkbox>
                        </v-flex>
                        <v-flex xs12 sm6 md4 lg3 xl2>
                          <v-checkbox
                            label="Qatar Airlines"
                            v-model="travelFilters.airline"
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
                  v-bind:src="item.image"
                  height="200px"
                >
                </v-card-media>
                <v-card-title primary-title>
                  <div class="text-xs-left">
                    <div class="white--text">{{item.source + ' - ' + item.destination}}</div>
                    <div class="grey--text">{{item.airline}}</div>
                    <span class="grey--text">{{'Price: Rs' + item.price}}</span>
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
      filteredTravel: [
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
      filteredAccommodation: [],
      filteredRestaurants: [],
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
      travelFilters: {
        price: 200000,
        class: [],
        airline: []
      }
    };
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
                this.travelFilters.airline.includes(post.airline) ||
                this.travelFilters.airline.length === 0
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

