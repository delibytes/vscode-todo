var vscode = require('vscode');
var Window = vscode.window;
var Workspace = vscode.workspace;
var strings = require('./strings.js');

var errorHandling = {};

errorHandling.showError = function(error) {
   Window.showErrorMessage(strings.error.message, strings.error.details_action)
       .then(function (value) {
           if (value === strings.error.details_action) {
               let content = getErrorContent(error);
               openNewTextDocument(content);
           }
       });
}

var getErrorContent = function(error) {
   let content = strings.error.default_content;
   if (error) {
       if (error instanceof Error && error.stack) {
           content = error.stack.join('\n');
       } else {
           content = JSON.stringify(error);
       }
   }
   if (content !== strings.error.default_content) {
       content = strings.error.content_start + content;
   }
   return content;
}

var openNewTextDocument = function(content) {
   Workspace.openTextDocument({
       content: content,
       language: 'plaintext'
   }).then(function (document) {
       Window.showTextDocument(document);
   });
}

module.exports = errorHandling;