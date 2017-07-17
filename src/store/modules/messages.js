/**
 * Created by fimion on 7/14/2017.
 */

const state = {
  _messages:[],
};

// getters
const getters = {
    getMessages(state){
      return state._messages;
    }
};

// actions
const actions = {

};

// mutations
const mutations = {
  closeMessage(state,data){
    let thing = state._messages;
    if(typeof data === 'number' && data < thing.length){
      state._messages.splice(data,1);
    }
  },
  setAuthError(state,data){
    let error = {msg:data.info,type:'AuthError',from:data.from};
    state._messages.push(error);
  },
  setPostsError(state,data){
    let error = {msg:data.info,type:'PostsError',from:data.from};
    state._messages.push(error);
  },
  setSuccessMessage(state,data){
    let message = {type: 'Success!', from:data.from};
    state._messages.push(message);
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}