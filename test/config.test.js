'use strict';

function mergeSettings(obj1, obj2){
  var res = {};
  for (var attrname in obj1) { 
    res[attrname] = obj1[attrname]; 
  }

  for (var attrname in obj2) { 
    res[attrname] = obj2[attrname]; 
  }

  return res;
}

module.exports = function(patch) {
  var config = {
    site_title: 'Raneto Test Site',
    base_url: '',
    support_email: '',
    copyright: 'Copyright &copy; '+ new Date().getFullYear() +' - <a href="http://raneto.com">Powered by Raneto</a>',
    excerpt_length: 400,
    page_sort_meta: 'sort',
    category_sort: true,
    show_on_home_default: true,
    theme_dir  : __dirname + '/../themes/',
    theme_name : 'default',
    content_dir : __dirname + '/content/',
    public_dir  : __dirname + '/../themes/default/public/',
    image_url: '/images',
    analytics: '',
    allow_editing : true,
    authentication : true,
    authentication_for_edit: true,
    authentication_for_read: false,
    googleoauth: false,
    oauth2 : {
      client_id: 'GOOGLE_CLIENT_ID',
      client_secret: 'GOOGLE_CLIENT_SECRET',
      callback: 'http://localhost:3000/auth/google/callback',
      hostedDomain: 'google.com'
    },
    secret: 'someCoolSecretRightHere',
    credentials    : [],
    locale: 'en',
    datetime_format: 'Do MMM YYYY',
    rtl_layout: false,
    home_meta : {
    },
    table_of_contents: false
  };

  return patch ? mergeSettings(config, patch) : config;
}