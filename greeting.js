module.exports = function greeting(pool) {

  var greetedNames = [];
  let message = "";
  let greeted;



  async function language(name, lang) {

    var greeted = await pool.query('select * from allnames where greet_name = $1', [name]);
    //  console.log(greeted.rows,"tyuuuu");

    if (greeted.rows.length > 0) {
      await pool.query('UPDATE allnames SET greet_count  = greet_count+ 1 WHERE greet_name = $1', [name]);


    } else {
      // console.log({ name });

      await pool.query('insert into allnames (greet_name, greet_count) values ($1, $2)', [name, 1]);

    }


    if (!greetedNames.includes(name)) {
      greetedNames.push(name)
    }

    if (lang === 'English') {
      message = "Hello, " + name + "!";
    }
    else if (lang === 'Xhosa') {
      message = "Molo, " + name + "!";
    }
    else if (lang === 'Afrikaans') {
      message = "Hallo, " + name + "!";
    }


  }

  async function keepName(){

    return greetedNames
  }

  async function data() {
    await pool.query(
      'select distinct greet_name, greet_count from allnames'
    );
    return greeted.rows;
  }

  async function nameGreet(name) {

    let storedName = await pool.query(
      'SELECT * FROM allnames where greet_name = $1', [name]);

    var user = storedName.rows

    var name = user[0].greet_name
    var count = user[0].greet_count

    // console.log("sds",user);


    return name, count
  }

  async function messaging() {
    return message
  }

  async function getName() {

    let savedNames = await pool.query('SELECT greet_name FROM allnames');
    return savedNames.rows;

  }

  async function counter() {
    var counters = await pool.query("select * from allnames")
    return counters.rowCount;
  }

  async function getCounter(name) {

    var count = await pool.query('select greet_count from allnames where greet_name = $1', [name]);
      return count.rows[0];
    
  }

  async function clearCounter () {
    var clear = await pool.query('delete from allnames');
    
    return clear;
}

  return {
    language,
    getName,
    counter,
    messaging,
    data,
    nameGreet,
    keepName,
    getCounter,
    clearCounter
  }
}


