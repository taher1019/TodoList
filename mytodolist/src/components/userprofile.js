import React from 'react';

var UserProfile = (function() {
  var user_name = "";
  var email = "";

  var getName = function() {
    return user_name;    // Or pull this from cookie/localStorage
  };

  var setName = function(name) {
    user_name = name;     
    // Also set this in cookie/localStorage
  };
  
  var getEmail = function() {
    return email;    // Or pull this from cookie/localStorage
  };

  var setEmail = function(email_id) {
    email = email_id;     
    // Also set this in cookie/localStorage
  };

  return {
    getName: getName,
    setName: setName,
	getEmail: getEmail,
	setEmail: setEmail
  }

})();

export default UserProfile;