import Vuex from 'vuex'

const bindUser = () => {
  return new Vuex.Store({
    state: {
      username: 'ali60351@gmail.com',
      loggedIn: true,
      userid: '',
      friends: []
    },
    mutations: {
      update(state, text) {
        state.username = text;
      },
      setLogin(state) {
        state.loggedIn = true;
      },
      unsetLogin(state) {
        state.loggedIn = false;
      },
      setID(state, id) {
        state.userid = id;
      },
      setFriends(state, list) {
        state.friends = list;
      }
    }
  })
}

export default bindUser
