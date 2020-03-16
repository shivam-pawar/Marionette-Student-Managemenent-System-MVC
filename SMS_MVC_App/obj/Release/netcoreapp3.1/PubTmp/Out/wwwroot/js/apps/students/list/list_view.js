StudentManager.module("StudentsApp.List", function(List, StudentManager, Backbone, Marionette,$, _){
    List.Student = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#student-list-item",
        events: {
            "click" : "highlightName",
            "click td a.js-edit" : "editClicked",
            "click a.js-delete": "deleteClicked"
        },
        highlightName: function(e){
            e.preventDefault();
            this.$el.toggleClass("warning");
        },
        editClicked: function(e){
            e.preventDefault();
            e.stopPropagation();
            this.trigger("students:edit", this.model);
        },
        deleteClicked: function(e){
            e.stopPropagation();
            if(confirm("Are you sure !")){
                this.trigger("student:delete", this.model);
            }
        },
        remove: function(){
            var self = this;
            this.$el.fadeOut(function(){
                Marionette.ItemView.prototype.remove.call(self);
            });
        }
    });

    List.Students = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table table-hower",
        template: "#student-list",
        itemView: List.Student,
        itemViewContainer: "tbody"
    });
});