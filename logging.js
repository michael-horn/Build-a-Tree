/*
 * Build-a-Tree
 * Life on Earth Project (http://sdr.seas.harvard.edu/content/life-earth)
 *
 * Michael S. Horn
 * Northwestern University
 * michael-horn@northwestern.edu
 * Copyright 2011, Michael S. Horn
 *
 * This project was funded by the National Science Foundation (grant 1010889).
 * Any opinions, findings and conclusions or recommendations expressed in this
 * material are those of the author(s) and do not necessarily reflect the views
 * of the National Science Foundation (NSF).
 */
var log_db = null;

function supportsSessionStorage() {
   try {
      return 'sessionStorage' in window && window['sessionStorage'] !== null;
   } catch (e) {
      return false;
   }
}


function supportsWebSql() {
   try {
      return 'openDatabase' in window && window['openDatabase'] != null;
   } catch (e) {
      return false;
   }
}


function initLogDatabase() {
   if (supportsWebSql() && supportsSessionStorage()) {
      log_db = window.openDatabase("BATLog", "1.0", "interaction log", 5*1024*1024);
   }
   
   if (log_db) {
      log_db.transaction(function (tx) {
         tx.executeSql('CREATE TABLE IF NOT EXISTS plog (' +
                       'id INTEGER PRIMARY KEY ASC, ' +
                       'user TEXT, ' +
                       'timestamp TEXT, ' +
                       'action TEXT, ' +
                       'target TEXT);');
      });
   }
}


function log(action, target) {
   if (log_db) {
      log_db.transaction(function (tx) {
         tx.executeSql("INSERT INTO plog (user, timestamp, action, target) " +
                    "VALUES (" +
                    "'" + getUserKey() + "', " +
                    "'" + getTimestamp() + "', " +
                    "'" + action + "', " +
                    "'" + target + "')");
      });
   }
}


function getMaxUserKey(callback) {
   if (log_db) {
      log_db.transaction(function (tx) {
         tx.executeSql("SELECT MAX(user) as 'user' FROM plog;", [],
                     callback, null);
      });
   }
                     console.log(_max_user);
   return Math.floor(_max_user);
}


function getUserKey() {
   var user = null;
   if (supportsSessionStorage()) {
      user = sessionStorage.getItem("pkey");
   }
   if (user && user.length > 0) {
      return user;
   } else {
      return "00";
   }
}


function getTimestamp() {
   var d = new Date();
   return (d.getFullYear() + "-" +
          (d.getMonth() < 10 ? '0' : '') + d.getMonth() + "-" +
          (d.getDate() < 10 ? '0' : '') + d.getDate() + " " +
          (d.getHours() < 10 ? '0' : '') + d.getHours() + ":" +
          (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ":" + 
          (d.getSeconds() < 10 ? '0' : '') + d.getSeconds());
}

