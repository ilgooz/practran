define([
    'jquery'
], function ($) {
    'use strict';

    var Text = function(keyword, from, to, fn){
        $.ajax({
            url: 'https://translate.google.com/translate_a/single?client=t&sl='+from+'&tl='+to+'&dt=t&q='+keyword+'&dt=bd',
            dataType: 'html',
            success: parse
        });
        function parse(data){
            var json = JSON.parse(data.replace(/,{2,}/g, ','));
            
            var data = {};
            
            try{
                data.original = json[0][0][1];
                data.translation = json[0][0][0];
            } catch(e){
                return fn(e);
            }
            
            data.extended = [];

            try {
                json[1].forEach(function(v){
                    var e = {};
                    e.title = v[0];
                    v[2].forEach(function(c){
                        e['alternative'] = c[0];
                        e['related'] = $.trim(c[1].join(', '));
                    });
                    data.extended.push(e)
                })

            } catch(e) {}
            
            fn(null, data);
        }
    };

    var PlayVoice = function(keyword, to){};

    return {
        Text: Text,
        PlayVoice: PlayVoice
    };
});