

/* Function generatePassword() is the main function used in password creation.  Most
phases where user criteria is being evaluated are done by subfunctions. In case these phases
turn into long procedures, I'd rather not risk them threatening the readibility and clarity
 of generatePassword().
*/

function generatePassword(){
    var amountCharacters = prompt("How many characters would you like in this password?  Password can be between 8-128 characters.");
    console.log("- amountCharacters = " + amountCharacters);
    // check for an actual value in the field.  convert string to int.
    if(amountCharacters != null){
      amountCharacters = parseInt(amountCharacters); 
      var specifyType = characterLengthEval(amountCharacters); // Send to subfunction to evaluate if #/type of characters falls within correct range.
      }
   // If, character-length is approved, move forward with user prompts
    if(specifyType === true){
    console.log("- amountCharacters value " + amountCharacters + " sent to characterLengthEval()");
    typeSpecifyPopup(); // Function opens a popup with checkboxes to specify character types.
     }
} 



/* Function characterLengthEval() checks to see that the user response to "How many characters would you like in this password" is valid." 
If not, repeats the generatePassword() function in good faith that user might have hit a wrong key. Returns boolean.*/

function characterLengthEval(myLength){
  if(Number.isInteger(myLength) && myLength >= 8 && myLength <= 128 ){
    console.log("-Character length evaluation successful.");
    return true;
  }
  else{
    alert("This character length does NOT fit the stated criteria.  Please try again.");
    console.log("-Argument value " + myLength + " failed the characterLengthEval()");
    return false;
    // Restart original function if does not match length specifications.
    generatePassword();
  }
}




// Function typeSpecifyPopup opens a floating window with character type checkboxes.

function typeSpecifyPopup(){
  $("#checkboxModal").modal('show');
}
// Function submitTypeCriteria is attached to the submit button on character type popover
function submitTypeCriteria(){ 
  // First, create empty JSON object in which to hold character criteria specified by user.
  let allTypes = {}
  // Evaluate the attributes to push to this object based on user checkmarks
    // Use letters checked?
  if(document.getElementById("lettersType").checked){
  allTypes["lettersType"] = "true";
  }
  else{
    allTypes["lettersType"] = "false";
  }
  // Use numbers checked?
 if(document.getElementById("numbersType").checked){
    allTypes["numbersType"] = "true";
  }
  else{
    allTypes["numbersType"] = "false";
  }
  // Use special characters checked?
  if(document.getElementById("speCharType").checked){
    allTypes["speCharType"] = "true";
  }
  else{
    allTypes["speCharType"] = "false";
  }

console.log("-All types object: " + allTypes.lettersType);
}




// BUTTON EVENT LISTENERS
// On click button begin to collect character types.
let typeSubmittal=document.querySelector("#typeSubmittal");
typeSubmittal.addEventListener("click", submitTypeCriteria );

// On Click button action to begin generating password.
let generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", generatePassword);







// Write password to the #password input
/* function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}
*/

// Add event listener to generate button
/* generateBtn.addEventListener("click", writePassword); */


