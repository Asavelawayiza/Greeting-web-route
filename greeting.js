module.exports = function greeting(nameList) {
  var greetedNames = nameList || [];
  let message = ""

 

  function language(name, lang) {
  
    if (!greetedNames.includes(name)){
    greetedNames.push({
      Name: name})
    }

    // for (var i =0; i<greetedNames.length; i++){
    //   if(greetedNames.includes(name)){
    //     times = +1;
    //   }
    // }
    

    console.log(greetedNames);

      if (lang === 'English') {
         message ="Hello, " + name + "!";
      }
      else if (lang === 'Xhosa') {
        message ="Molo, " + name + "!";
      }
      else if (lang === 'Afrikaans') {
        message ="Hallo, " + name + "!";
      }

      // greetedNames.push({
      //   Name: name
      //   });
  
  }
 

function messaging(){
  return message
}
  
  function getName() {
    return greetedNames;
  }

  function counter() {
    var count = Object.keys(greetedNames)
    return count.length;
  }
  


  return {
    language,
    getName,
    counter,
    messaging
   
  }
}


