const assert = require("assert");
const greeting = require("../greeting");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/mydb'


let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
const pool = new Pool({
    connectionString,
    ssl: useSSL
});



describe('greeting test', function () {

    var instance = greeting(pool);

    beforeEach(async function () {
        await pool.query("delete from allnames");
    });


    it('should greet Asavela in English', async function () {
        await pool.query("delete from allnames");

        await instance.language('Asavela', 'English')
        let names = await instance.messaging();
        assert.equal(names, "Hello, Asavela!");

    })

    it('should greet Asavela in isiXhosa', async function () {
        await pool.query("delete from allnames");

        await instance.language('Asavela', 'Xhosa')
        let names = await instance.messaging()
        assert.equal(names, "Molo, Asavela!");

    })

    it('should greet Asavela in Afrikaans', async function () {
        await pool.query("delete from allnames");
       
        await instance.language('Asavela', 'Afrikaans')
        let names = await instance.messaging();

        assert.deepEqual(names, "Hallo, Asavela!");

    })


    it('should display how many times a user have been greeted', async function () {
        await pool.query("delete from allnames");

        await instance.language('Nana', 'Afrikaans')
        await instance.language('Nana', 'Afrikaans')

        let number = await instance.getCounter('Nana');
        assert.equal(number.greet_count, 2);
    });

    it('it should increment the counter when a different name is entered', async function () {
 await pool.query("delete from allnames");

        await instance.language('asa');
        await instance.language('Asavela')
        await instance.language('demi');

        let counts = await instance.counter()
        assert.equal(counts, 3);
    })

    it('it should not increment when the same name is entered', async function () {
 await pool.query("delete from allnames");
 
        await instance.language('Asavela');
        await instance.language('Asavela');
        let counters = await instance.counter()
        assert.equal(counters, 1)


    })

    after(function () {
        pool.end();
    })

});