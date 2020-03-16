StudentManager.module("StudentsApp", function(StudentsApp, StudentManager, Backbone, Marionette, $, _){
    StudentsApp.Router = Marionette.AppRouter.extend({
        appRoute: {
            "/students": "listStudents",
            "students/:sid": "editStudent"
        }
    }); 

    var API = {
        listStudents: function(){
           StudentsApp.List.Controller.listStudents();
        },

        editStudent: function(sid){
            StudentsApp.Edit.Controller.editStudent(sid);
        }
    };

    StudentManager.on("students:list", function(){
        StudentManager.navigate("/");
        API.listStudents();
    });

    StudentManager.on("students:edit", function(sid){
       StudentManager.navigate("students/"+sid);
        API.editStudent(sid);
    });

    StudentManager.addInitializer(function(){
        new StudentsApp.Router({
            controller: API
        });
    });
});


