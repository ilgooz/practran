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

    var fresh = false;

    // ctrl + click trigger
    $(document).on("click", function(e) {
        if(e.ctrlKey) {
            var text = Keyword.Dedect();
            if(text !== null) {
                process(text);
            }
        }
    });

    // close
    $(document).click(function(){
            view.hide();
    });

});