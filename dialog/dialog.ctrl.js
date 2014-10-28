define([
    'jquery',
    'apis/translate',
    'apis/keyword',
    'dialog/dialog.view',
    'dialog/dialog.model'
], function ($, Translate, Keyword, DialogView, DialogModel) {
    'use strict';

    var model = new DialogModel();

    new DialogView({
        el: '#practran',
        model: model
    });

    Keyword.Listen(function(keyword){
        Translate.Text(keyword, "en", "tr", function(err, data){
            if(err) return;
            model.set(data);
        });
    });
    
});