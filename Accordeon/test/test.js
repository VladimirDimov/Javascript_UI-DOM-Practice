it("should set cow's name if provided", function() {
	var cow = new Cow("Kate");
	expect(cow.name).to.equal("Kate");
});