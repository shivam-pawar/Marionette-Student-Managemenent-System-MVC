StudentManager.module("Entities", function(Entities, StudentManager, Backbone, Marionette, $, _){
	Entities.Student = Backbone.Model.extend({
		defaults: {
			sid: "",
			sname: "",
			emailid: "",
			contact: "",
			deptid: "",
			deptname: ""
		},
		initialize: function () {
			if (!this.isValid()) {
				this.on("invalid", function (model, error) {
					alert(error);
				});
			}
		},
		idAttribute: 'sid',
		urlRoot: "https://smswebapi.com/api/Student",
		validate: function (attrs) {
			var att = JSON.parse(JSON.stringify(attrs));

			if (!attrs.sid) {
				$('.sid-input').focus();
				return 'Student ID is required.';
			}
			if (!attrs.sname) {
				$('.sname-input').focus();
				return 'Every person must have a name.';
			}
			if (!attrs.emailid) {
				$('.emailid-input').focus();
				return 'Email Id is required.';
			}
			var validEmail = att['emailid'].toString();
			var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if (mailformat.test(validEmail) === false) {
				$('.emailid-input').focus();
				return "You have entered an invalid email address!";
			}
			try {
				var contactNumber = att['contact'].toString();
			}
			catch (err) {
				$('.contact-input').focus();
				return "Please enter only numeric value in contact field";
			}
			if (!attrs.contact) {
				$('.contact-input').focus();
				return 'Contact number is required.';
			}
			let count = 0;
			for (let i = 0; i < contactNumber.length; i++) {
				if (contactNumber.charAt(i) !== ' ')
					count++;
			}
			if (count < 10) {
				$('.contact-input').focus();
				return "Invalid Contact Number";
			}	
		}
	});

		Entities.StudentCollection = Backbone.Collection.extend({
			url: "https://smswebapi.com/api/Student",
			model: Entities.Student,
			comparator: "sid"
		});
		var students; 
		var initializeDetails = function(){
			students = new Entities.StudentCollection();
			students.fetch();
			students.forEach(function(student){
			student.save();
			});
			return students;
		};

		$(document).ready(function () {
			$('.js-add').on("click", function(){
				records = new Entities.StudentCollection();
				var record = new Entities.Student({
					sid: parseInt($('.sid-input').val()),
					sname: $('.sname-input').val(),
					emailid: $('.emailid-input').val(),
					contact: Number($('.contact-input').val()),
					deptid: parseInt($('.dept-input').val())
				});
				
				var omit = JSON.parse(JSON.stringify(record.attributes));
				records.add(_.omit(omit, "deptname"));
				record.save(null, {
					url: 'https://smswebapi.com/api/Student',
					type: "POST",
					success: function (response) {
						console.log("Record Added");
					},
					attrs: _.omit(omit, "deptname"),
					error: function (model, xhr, options) {
						if (xhr.status !== 200) {
							alert("Please select department");
						}
						else {
							alert("Record Added Successfully");
							location.reload();
						}
					}
				});	
			});
		});

		var API = {
			getStudentEntities: function(){
				var students = new Entities.StudentCollection();
				if(students.length === 0){
					return initializeDetails();
				}
				return students;
			},
			getStudentEntity: function(id){
				var student = new Entities.Student({sid: id});
				var defer = $.Deferred();
				setTimeout(function(){
				student.fetch({
						success: function(data){
							defer.resolve(data);
						}
					});
				},10);
				return defer.promise();
			}
		};

		StudentManager.reqres.setHandler("student:entities", function(){
			return API.getStudentEntities();
		});
		
		StudentManager.reqres.setHandler("student:entity", function(id) {
			return API.getStudentEntity(id);	
		});

});