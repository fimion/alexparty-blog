/**
 * Created by fimion on 7/12/2017.
 */


import Promise from 'promise-polyfill'
import Axios from 'axios'
if(!window.Promise){
  window.Promise = Promise;
}
const axios = Axios.create();

function _updatePosts(data){
  axios.get(this._localurl+'/static/update.php');
  return Promise.resolve(data);
}


export default{
  _localurl:'',
  _jsonbin:'https://jsonbin.org/',
  create(localurl){
    this._localurl = localurl;
    return this;
  },
  g(url){
      return axios.get(this._jsonbin+url);
  },
  authenticate(login){
    return axios.post(this._localurl + '/static/party.php', login)
  },
  _get(options){
    return axios.get(this._jsonbin+'me/'+options.url,options.config)
      .catch(function(data){console.log('jsbonbin get Error:',data); return Promise.reject(data)});
  },
  _post(options){
    let $ = this;
    return axios.post(this._jsonbin+'me/'+options.url,options.data,options.config)
      .then(function(data){_updatePosts.call($, data)})
      .catch(function(data){console.log('jsbonbin post Error:',data); return Promise.reject(data)});
  },
  _put(options){
    let $ = this;
    return axios.put(this._jsonbin+'me/'+options.url,options.data,options.config)
      .then(function(data){_updatePosts.call($, data)})
      .catch(function(data){console.log('jsbonbin put Error:',data); return Promise.reject(data)});
  },
  _patch(options){
    let $ = this;
    return axios.patch(this._jsonbin+'me/'+options.url,options.data,options.config)
      .then(function(data){_updatePosts.call($, data)})
      .catch(function(data){console.log('jsbonbin patch Error:',data); return Promise.reject(data)});
  },
  _delete(options){
    let $ = this;
    return axios.delete(this._jsonbin+'me/'+options.url,options.config)
      .then(function(data){_updatePosts.call($, data)})
      .catch(function(data){console.log('jsbonbin delete Error:',data); return Promise.reject(data)});
  },
  _updatePosts(data){

  }
}