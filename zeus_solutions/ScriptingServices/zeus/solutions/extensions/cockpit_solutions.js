/* globals $ */
/* eslint-env node, dirigible */

const PATH = "/solutions";
const HTML_LINK = "../solutions/index.html";

//exports.getMenuItem = function() {
//	return {  
//      "name": "Solutions",
//      "path": PATH,
//      "link": HTML_LINK
//   };
//};

exports.getSidebarItem = function() {
	return {  
      "name": "Solutions",
      "path": PATH,
      "link": HTML_LINK,
      "category": "Define",
      "order": 102
   };
};
