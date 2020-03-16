StudentManager.module("StudentsApp.Edit", function(Edit, StudentManager, Backbone, Marionette, $, _){
    Edit.Controller = {
        editStudent: function (sid) {
            var fethingStudent = StudentManager.request("student:entity", sid);
            $.when(fethingStudent).done(function (student) {
                var studentView = new Edit.Student({
                    model: student
                });
                StudentManager.mainRegion.show(studentView);
            });
        }
    };
});