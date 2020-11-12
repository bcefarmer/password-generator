// Global variables

var characterTypes = "";
var upperCaseRange = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowerCaseRange = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var numberRange = [1, 2, 3, 4, 5, 6, 7, 8 ,9 , 0];
var speCharRange = ["!", "@", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "~", "/", "{", "}", "|"]
var rangeArray = [];


/* 
------------------------------
FUNCTION NAME: generatePassword

PURPOSE: Basically a "starting point" used in password creation. In this 
program, most 'steps' are split into separate functions for three reasons.  (1) Easier revision
(2) Readability (3) Allows function to grow in an organic way without excessive nesting.

PARAMETERS: None

RETURNS: None
------------------------------
*/

function generatePassword(){
    var amountCharacters = prompt("How many characters would you like in this password?  Password can be between 8-128 characters.");
    console.log("- amountCharacters = " + amountCharacters);
    // check for an actual value in the field.  convert string to int.
    if(amountCharacters != null){
      amountCharacters = parseInt(amountCharacters); 
      var specifyType = characterLengthEval(amountCharacters); // Send to subfunction to evaluate if #/type of characters falls within correct range.
      }
   // If character-length is approved, move forward with user prompts
    if(specifyType === true){
    console.log("- amountCharacters value " + amountCharacters + " sent to characterLengthEval()");
    typeSpecifyPopup(); // Function opens a popup with checkboxes to specify character types.
    // This is the handoff point.
     }
} 
/* 
------------------------------
FUNCTION NAME: characterLengthEval

PURPOSE: Checks to see that the user response to 'How many characters would you like in this password' is valid. 
If not, repeats the generatePassword() function in good faith that user might have hit a wrong key. Returns boolean.

PARAMETERS: myLength (user-inputted password length.)

RETURNS: Boolean
------------------------------
*/


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


/* 
------------------------------
FUNCTION NAME: typeSpecifyPopup

PURPOSE: Opens a floating window with checkboxes.  These allow the
user to pick allowable character types in their password.

PARAMETERS: None

RETURNS: None
------------------------------
*/

function typeSpecifyPopup(){
  $("#checkboxModal").modal('show');
}



/* 
------------------------------
FUNCTION NAME: submitTypeCriteria

PURPOSE: Collects the user's desired character types (uppercase, lowercase, number, special charater) into
a JSON object.  This script is attached to the "Submit" button on the modal window (id: #checkboxModal).

PARAMETERS: None

RETURNS: Technically none, but pushes the JSON object out of the local scope into a global variable.
------------------------------
*/

// Function submitTypeCriteria() is attached to the submit button on character type popover
function submitTypeCriteria(){ 
    // First, create empty JSON object in which to hold character criteria specified by user.
  let allTypes = {}
    // Evaluate the attributes to push to this object based on user checkmarks
    // Use uppercase letters checked?
  if(document.getElementById("upperType").checked){
  allTypes["upperType"] = "true";
  }
  else{
    allTypes["uppperType"] = "false";
  }
    // User lowercase letters checked?
  if(document.getElementById("lowerType").checked){
    allTypes["lowerType"] = "true";
    }
    else{
      allTypes["lowerType"] = "false";
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
window.characterTypes = allTypes;

}


/* Function establishRanges() allows us to create a "big" array comprised of small arrays.  These small arrays represent
ranges in which these characters fall.
*/
function establishRanges(){
if(characterTypes.upperType==="false" && characterTypes.lowerType==="false" && characterTypes.numbersType==="false" && characterTypes.speCharType==="false"){
   alert("You have not picked any character criteria for your password.  Please try again.");
}
else{
    if(characterTypes.upperType==="true"){
      rangeArray.push(upperCaseRange);
    }
  
    if(characterTypes.lowerType==="true"){
      rangeArray.push(lowerCaseRange);
    }
 
    if(characterTypes.numbersType==="true"){
      rangeArray.push(numberRange);
    }

    if(characterTypes.numbersType==="true"){
      rangeArray.push(speCharRange);
    }
  }//end else 
$('#mcheckboxModal').modal('hide'); // Hide modal window
} //End establishRanges() function






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


