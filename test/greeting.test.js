const assert = require("assert");
const greeting = require("../greeting");


describe('greeting test' , function(){

    var instance = greeting();

    it('should greet Asavela in English' , function(){
       assert.deepEqual(instance.language('asavela', 'English'), "Hello, Asavela!");

    })

    it('should greet Asavela in isiXhosa' , function(){
        assert.deepEqual(instance.language('asavela', 'Xhosa'), "Molo, Asavela!");

    })
    
    it('should greet Asavela in Afrikaans' , function(){
         assert.deepEqual(instance.language('asavela', 'Afrikaans'), "Hallo, Asavela!");

    })

    it('should return error message if no name is entered' , function(){
         assert.deepEqual(instance.language('', 'English'), "please enter a name!");

    })
    it("it should give error message if there's no language selected", function () {
     
        assert.equal(instance.language('Asavela', ''), "please select language");

    });
    it("it should give error message if you enter numbers", function () {
        assert.equal(instance.language('59624', 'Afrikaans'), "Does not take in numbers");

    });
    it('it should greet the name entered and count it once', function () {
        
         instance.keepName("Asavela")
         instance.keepName("Asavela")
        assert.deepEqual(1, instance.counter());

    })
    it('it should increment the counter when a different name is entered', function() {
      
            instance.keepName('asa');
            // instance.keepName('Asavela')
            // instance.keepName('demi');
            assert.equal(3, instance.counter());
    })
    

});