<template>
  <section class="attractions">
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
              v-bind:src="item.image"
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
      search: ''
    };
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
.content {
  background-image: url('~/static/1b.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  z-index: 2;
}
</style>

