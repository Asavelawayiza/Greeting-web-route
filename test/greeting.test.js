const assert = require("assert");
const greeting = require("../greeting");
const pg = require("pg");
const   Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/mydb'

const pool = new Pool({
  connectionString
});


describe('greeting test' , function(){

    var instance = greeting(pool);
// console.log(instance.language('Asa', 'english'));

    it('should greet Asavela in English' , async function(){

        await instance.language('Asavela', 'English')
        let names = await instance.messaging();
       assert.equal(names , "Hello, Asavela!");

    })

    it('should greet Asavela in isiXhosa' , async function(){

        await instance.language('Asavela', 'Xhosa')
        let names = await instance.messaging()
        assert.equal(names, "Molo, Asavela!");

    })
    
    it('should greet Asavela in Afrikaans' , async function(){
        await instance.language('Asavela', 'Afrikaans')
        let names = await instance.messaging();
         assert.deepEqual(names , "Hallo, Asavela!");

    })


    it('should display how many times a user have been greeted', async function () {
      
        await instance.language('Asavela', 'Afrikaans')
        await instance.language('Asavela', 'Afrikaans') 

        let number = await instance.getCounter('Asavela');
        
        assert.equal(number, 2);
    });

    it('it should increment the counter when a different name is entered',async function() {
      
        
        await instance.keepName('asa');
        await instance.keepName('Asavela')
        await instance.keepName('demi');

        let counts = await instance.counter()   
            assert.equal(counts ,3);
    })
    

});