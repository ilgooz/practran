define([
    'jquery',
    'apis/translate',
    'apis/keyword',
    'dialog/dialog.view',
    'dialog/dialog.model'
], function ($, Translate, Keyword, DialogView, DialogModel) {
    'use strict';

    var model = new DialogModel();
    var view = new DialogView({
        el: '#practran',
        model: model
    });

    function process(text){
        chrome.storage.local.get(['from', 'to'], function(data){
            Translate.Text(text, data.from, data.to, function(err, data){
                if(err) return;
                model.set(data);
                view.show();
            });
        });
    }

    // long press trigger
    var timer;
    var fresh = false;
    $(document).mouseup(function(){
        clearTimeout(timer);
    }).mousedown(function(e){
      if(!e.ctrlKey){
        timer = setTimeout(function(){
           var text = Keyword.Dedect();
           if(text !== null && !/\s+/.test(text)) {
               fresh = true;
               process(text);
           }
        }, 180);
      }
    });

    // ctrl + click trigger
    $(document).click(function(e) {
      if(e.ctrlKey) {
        var text = Keyword.Dedect();
        if(text !== null) {
            process(text);
        }
      }
    });

    $(document).click(function(){
        if(!fresh) {
            view.hide();
        } else {
            fresh = false;
        }
    });

});