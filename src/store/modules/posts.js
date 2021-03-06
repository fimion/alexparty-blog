/**
 * Created by fimion on 7/12/2017.
 */
import JsonBin from '../../api/jsonbin'

const jb = JsonBin.create(process.env.LOCAL_URL);

const state = {
  _posts: (typeof window.INITIALPOSTS === 'undefined')?[]:window.INITIALPOSTS,
  _postsErr:false
};

// getters
const getters = {
  thePosts(state){
    return state._posts;
  }

};

// actions
const actions = {
  getPosts(context){
    if(typeof window.INITIALPOSTS === 'undefined') {
        jb.g(context.rootState._username + '/' + context.rootState._postsName)
            .then(function (data) {
                return context.dispatch('finalizePosts', data)
            })
            .catch(function (data) {
                let error = {info: data, from: 'getPosts'};
                return context.dispatch('handlePostsError', error)
            });
    }
    else {
        context.dispatch('finalizePosts', {data:window.INITIALPOSTS});
    }
  },
  finalizePosts(context,data){

    if(Array.isArray(data.data)){

      let posts = data.data;
      for(let x =0; x<posts.length; x++){
        posts[x].id=x;
      }
      posts.sort(function(post1, post2){
        if(post1.date > post2.date) return -1;
        if(post1.date < post2.date) return 1;
        return 0;
      });
     context.commit('setPosts',data.data);
      window.INITIALPOSTS = undefined;
      return Promise.resolve("success");
    }
    return Promise.reject("Returned data is not an Array.");
  },

  addPost(context,options){
    let dataToSend = {
      url:context.rootState._postsName,
      config: {headers:context.rootGetters.getAuthHeader},
      data: options
    };
    return jb._patch(dataToSend)
      .then(function(data){
        return context.dispatch('getPosts');
      })
      .catch(function(data){
        let error={
          info: data,
          from: 'addPost.patch.catch'
        };
        return context.dispatch('handlePostsError',error);
      });
  },
  editPost(context,options){
    let dataToSend = {
      url:context.rootState._postsName+'/'+options.id,
      config: {headers:context.rootGetters.getAuthHeader},
      data: options
    };
    delete dataToSend.data.id;
    return jb._patch(dataToSend)
      .then(function(data){
        return context.dispatch('getPosts');
      })
      .catch(function(data){
        let error = {
          info:data,
          from:'editPost.patch.catch'
        };
        return context.dispatch('handlePostsError', error);
      })
  },
  deletePost(context,options){
    let datatosend = {
      url: context.rootState._postsName+'/'+options.id,
      config: {headers:context.rootGetters.getAuthHeader},
    };
    jb._delete(datatosend)
      .then(function(data){return context.dispatch('getPosts',data)})
      .catch(function(data){
        let error = {info:data,from:'deletePost.delete.catch'};
        return context.dispatch('handlePostsError',error)});
  },
  handlePostsError(context,data){
    console.log(data);
    context.commit('setPostsError',data);
    return Promise.reject('Error');
  }
};

// mutations
const mutations = {
  setPosts(state,data){
    state._posts = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}