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
    return axios.get(this._jsonbin+'me/'+options.url,options.config)
      .catch(function(data){console.log('jsbonbin get Error:',data); return Promise.reject(data)});
  },
  _post(options){
    return axios.post(this._jsonbin+'me/'+options.url,options.data,options.config)
      .catch(function(data){console.log('jsbonbin post Error:',data); return Promise.reject(data)});
  },
  _put(options){
    return axios.put(this._jsonbin+'me/'+options.url,options.data,options.config)
      .catch(function(data){console.log('jsbonbin put Error:',data); return Promise.reject(data)});
  },
  _patch(options){
    return axios.patch(this._jsonbin+'me/'+options.url,options.data,options.config)
      .catch(function(data){console.log('jsbonbin patch Error:',data); return Promise.reject(data)});
  },
  _delete(options){
    return axios.delete(this._jsonbin+'me/'+options.url,options.config)
      .catch(function(data){console.log('jsbonbin delete Error:',data); return Promise.reject(data)});
  }
}