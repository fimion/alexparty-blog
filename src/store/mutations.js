/**
 * Created by fimion on 7/12/2017.
 */
export default {
  login(state, token){
    state._loggedin = true;
    state._authToken = token;
  },
  logout(state){
    state._loggedin = false;
    state._authToken = '';
  },
}