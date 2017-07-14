/**
 * Created by fimion on 7/12/2017.
 */


import Promise from 'promise-polyfill'
import Axios from 'axios'
if(!window.Promise){
  window.Promise = Promise;
}
const axios = Axios.create();


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

  },
  _post(options){

  },
  _put(options){

  },
  _patch(options){
    return axios.patch(this._jsonbin+'me/'+options.url,options.data,options.config)
      .catch(function(data){console.log('jsbonbin Error:',data); return Promise.reject(data)});
  },
  _delete(options){

  }
}