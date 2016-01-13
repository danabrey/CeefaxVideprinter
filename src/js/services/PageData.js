CeefaxVideprinter.service("PageData", [function(){
  this.pageNumber = "000"; // default page number
  this.pageTitle = "Ceefax"; // default page title
  this.setPageNumber = function(pageNumber) {
      this.pageNumber = pageNumber;
  };
  this.setPageTitle = function(pageTitle) {
      this.pageTitle = pageTitle;
  };
}]);
