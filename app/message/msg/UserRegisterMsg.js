/**
 * Register消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (data){
  this.msgType = 10201;
  if(!_.isUndefined(data) && !_.isNull(data)){
    this.username = data.username || '';
    this.password = data.password || '';
    this.password2 = data.password2 || '';
    
  }
  
  this.setUsername = function(username){
    this.username = username;
  };
  this.setPassword = function(password){
    this.password = password;
  };
  this.setPassword2 = function(password2){
    this.password2 = password2;
  };

  this.setResult = function(result) {
    this.ret = result;
  }
};