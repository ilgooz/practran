define([
    'jquery'
], function ($) {
    'use strict';

    var Dedect = function(){
        var sel = window.getSelection();
        var range = sel.getRangeAt(0);
        var node = sel.anchorNode;
        var str = '';
        try{
            while(!/^[^'\-0-9A-Za-zöÖçÇşŞğĞüÜİı]/.test(range.toString())){
                range.setStart(node, range.startOffset-1);
            }
        } catch(e) {}
        try{
            while(!/[^'\-0-9A-Za-zöÖçÇşŞğĞüÜİı]$/.test(range.toString())){
                range.setEnd(node, range.endOffset+1);
            }
        } catch(e) {}
        str = range.toString();
        str = str.replace(/^[^'\-0-9A-Za-zöÖçÇşŞğĞüÜİı]|[^'\-0-9A-Za-zöÖçÇşŞğĞüÜİı]$/g, '');
        if(str !== '') return str;
        return null;
    }

    return {
        Dedect: Dedect
    };
});