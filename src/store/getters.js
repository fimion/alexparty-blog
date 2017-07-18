/**
 * Created by fimion on 7/12/2017.
 */
const DISQUS_URL = process.env.DISQUS_URL;
const DISQUS_NAME = process.env.DISQUS_NAME;
const SITE_TITLE = process.env.SITE_TITLE;


export default {
    disqusName(){
      return DISQUS_NAME;
    },
  disqusUrl(){
      return DISQUS_URL;
  },
  siteTitle(){
    return SITE_TITLE;
  }
}