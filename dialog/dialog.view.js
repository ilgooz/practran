define([
    'jquery',
    'mustache',
    'backbone',
    'text!dialog/dialog.template.html'
], function ($, Mustache, Backbone, DialogTemplate) {
    'use strict';

    var DialogView = Backbone.View.extend({

        template: DialogTemplate,

        initialize: function () {
            Mustache.parse(this.template);
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(Mustache.render(this.template, this.model.attributes));
        },

        show: function() {
            this.$el.css('display', 'block');
        },

        hide: function() {
            this.$el.css('display', 'none');
        }
    });

    return DialogView;
});