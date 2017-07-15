/**
 * Created by fimion on 7/12/2017.
 */
import JsonBin from '../../api/jsonbin'

const jb = JsonBin.create(process.env.LOCAL_URL);

const state = {
  _loggedin: false,
  _authToken: false,
  _authError: false
};

// getters
const getters = {

  isLoggedIn(state){
    return state._loggedin;
  },
  getAuthError(state){
    return state._authError;
  },
  getAuthHeader(state){
   return {'Authorization':'Bearer '+state._authToken};
  }
};

// actions
const actions = {
  doAuthentication(context,login){
    return jb.authenticate(login)
      .then(function(data){return context.dispatch('_thenAuthLogin',data)})
      .catch(function(data){return context.dispatch('_catchAuthError',data)});
  },
  _thenAuthLogin(context,data){
    context.commit('setAuthLogin',data.data.token);
    return Promise.resolve('Logged in!');
  },
  _catchAuthError(context,data){
    let error = data;
    error['from'] = 'doAuthentication';
    context.commit('setAuthError', error);
    return Promise.reject('Failed!');
  },
};

// mutations
const mutations = {
  setAuthLogin(state,token){
    state._authToken = token;
    state._loggedin = true;
  },
  setAuthLogout(state){
    state._authToken = '';
    state._loggedin = false;
  }

};

export default {
  state,
  getters,
  actions,
  mutations
}