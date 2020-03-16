StudentManager.module("StudentsApp.List", function(List, StudentManager, Backbone, Marionette,$, _){

    List.Controller = {
        listStudents: function () {
            var students = StudentManager.request("student:entities");
            var studentsListView = new List.Students({
                collection: students
            });
            studentsListView.on("itemview:student:delete", function (childView, model) {
                model.destroy({
                    type: "DELETE",
                    success: _.bind(function (model, response) {
                    }, this),
                    error: _.bind(function (model, response) {
                    }, this)
                });
            });
            studentsListView.on("itemview:students:edit", function (childView, model) {
                StudentManager.trigger("students:edit", model.get("sid"));
            });
            StudentManager.mainRegion.show(studentsListView);
        }
    };
});   