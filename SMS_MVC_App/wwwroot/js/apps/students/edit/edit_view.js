StudentManager.module("StudentsApp.Edit", function(Edit,StudentManager, Backbone, Marionette, $, _){
    Edit.Student = Marionette.ItemView.extend({
        template: "#student-view",
        events:{
            'click .update-record': 'update'
        },
        update: function(){
            this.model.set('sname', $('.sname-update').val());
            this.model.set('emailid', $('.emailid-update').val());
            this.model.set('contact', Number($('.contact-update').val()));
            var omit =JSON.parse(JSON.stringify(this.model.attributes));
            var records = new StudentManager.Entities.StudentCollection();
            this.model.on("invalid", function (model, error) {
                alert(error);
            });

            records.add(_.omit(omit, "deptname"));
            this.model.save(null, {
                success: function (response) {
                },
                attrs: _.omit(omit, "deptname"),
                error: function (response) {
                }
                
            });
            alert("Record updated");
            StudentManager.navigate("/students");
        }
    });
});