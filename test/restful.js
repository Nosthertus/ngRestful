describe("Restful module", function(){
	beforeEach(module("ngRestful"));

	describe("Restful methods", function(){
		it("should create GET request $http object", inject(function($restful){
			var request = $restful.$createRequest({}, "GET", "www.example.com", {});

			expect(request).to.not.include.keys("transformRequest");
			expect(request).to.have.property("method", "GET");
		}));

		it("should create non-GET request $http object", inject(function($restful){
			var request = $restful.$createRequest({foo: "bar"}, "POST", "www.example.com", {});

			expect(request).to.not.include.keys("transformRequest");
			expect(request).to.have.property("method", "POST");
		}));

		it("should create custom $http object when attached file exists", inject(function($restful){
			var file = new File([""], "example.txt");
			var request = $restful.$createRequest({file: file}, "POST", "www.example.com", {});

			expect(request).to.include.keys("transformRequest");
			expect(request).to.have.property("method", "POST");
		}));
	});
});