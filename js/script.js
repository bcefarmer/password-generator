// Global variables

/* characterTypes will be a JSON object.  The key-value pairs will represent specifics
  about the user's password preferences (lowercase, uppercase, numbers, special characters.*/
var characterTypes = "";

/*
Password length.
*/
var lenPassword;

/* 
rangeArray will be populated by "sub"-arrays.  Whatever character options the user picks for
their password (Uppercase, lowercase, etc.) will push a subarray into rangeArray.
*/

var rangeArray = [];

var pwString = "";


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
    //Basic housekeeping: Ensures criteria from last run is not carried over into new runs.
    
    characterTypes = "";
    rangeArray = [];
    lenString = "";
    pwString = "";
    lenPassword = "";
    
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
    lenPassword = myLength;
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

PURPOSE: Opens a modal object with checkboxes.  These allow the
user to pick allowable character types in their password.  Also
performs housekeeping to erase previous choices from same user-
session.

PARAMETERS: None

RETURNS: None
------------------------------
*/

function typeSpecifyPopup(){
  $("#checkboxModal").modal('show');

document.getElementById("upperType").checked = "";
document.getElementById("lowerType").checked = "";
document.getElementById("numbersType").checked = "";
document.getElementById("speCharType").checked = "";

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

window.characterTypes = allTypes;
$('#checkboxModal').modal('hide'); // Hide modal window
console.log("characterTypes JSON = " + characterTypes);
establishRanges();
}



/* 
------------------------------
FUNCTION NAME: establishRanges

PURPOSE: Populates PARENT array (rangeArray) with other arrays that represent allowable character ranges.

PARAMETERS: None

RETURNS: None
------------------------------
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

    if(characterTypes.speCharType==="true"){
      rangeArray.push(speCharRange);
    }
  }//end else 

  console.log("- Created JSON.  Sending following to createPWstring: " + pwString + ", 0" )
  createPWstring("",0, 1);
console.log("******RANGE ARRAY: " + rangeArray);
} //End establishRanges() function





function createPWstring(pwString,iterationCount,realCount){
  // Size of parent array rangeArray() will determine when look
  console.log(iterationCount);
  var str_Length = pwString.length;
  if(str_Length != lenPassword){
    charPush(iterationCount)
   }
console.log("function createPWstring result:" + pwString)
}


function charPush(arrSub, realCount){
  if( arrSub === (rangeArray.length) ){ 
      arrSub = 0;
  }
var forWriting = "";
var subArrLength = rangeArray[arrSub].length;
var randomGen = Math.floor(Math.random() * (subArrLength - 1));
console.log("- var randomGen = " + randomGen)
forWriting =  rangeArray[arrSub][randomGen];
console.log("- var forWriting = " + forWriting);
pwString = pwString + forWriting;
realCount = realCount++;
arrSub = arrSub++;

createPWstring(pwString,arrSub,realCount);
}





/*
-----------------------
BUTTON EVENT LISTENERS.
-----------------------
*/

// On click button begin to collect character types.
let typeSubmittal=document.querySelector("#typeSubmittal");
typeSubmittal.addEventListener("click", submitTypeCriteria );

// On Click button action to begin generating password.
let generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", generatePassword);

/*
-----------------------
Allowable Character Arrays
-----------------------
*/

var upperCaseRange = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowerCaseRange = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var numberRange = ["1", "2", "3", "4", "5", "6", "7", "8" ,"9" , "0"];
var speCharRange = ["!", "@", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "~", "/", "{", "}", "|"]







