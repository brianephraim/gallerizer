define([], function () {
    var returnedModule = function () {
        var _name = 'module1 name gallerizer';
        this.getName = function () {
            return _name;
        }
    };
 
    return returnedModule;
 
});