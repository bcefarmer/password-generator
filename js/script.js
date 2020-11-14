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
    document.getElementById("password").textContent = "";
    
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

/* 
------------------------------
FUNCTION NAME: createPWstring

PURPOSE: This is a "decision-maker" function that decides if more characters are needed to complete the pw length.
          It has an *almost* recursive nature because of the repeated back-and-forth interaction with function charPush.

PARAMETERS: pwString (The current "as is" password, whether partial or complete.  Length will be tested to see if specified pw length has been reached. )
            iterationCount (Represents a specific sub-array within parentArray.  (Eg rangeArray[0] or rangeArray[1])
            realCount (Number of total iterations.  Helps with troubleshooting and console.log)
RETURNS: None
------------------------------
*/

function createPWstring(pwString,iterationCount,realCount){
  // Size of parent array rangeArray() will determine when look
  console.log(iterationCount);
  var str_Length = pwString.length;
  if(str_Length != lenPassword){
    charPush(iterationCount, realCount)
   }
console.log("function createPWstring result:" + pwString);

strScrambler();

// var textBoxPath = document.getElementById("password");
// textBoxPath.textContent = pwString;
// console.log(textboxPath);

}

/* 
------------------------------
FUNCTION NAME: charPush

PURPOSE: Actually adds characters incrementally to password.

PARAMETERS: arrSub (which subarray to target within rangeArray.)
            realCount (total interation count. realCount++ with each run)
RETURNS: None
------------------------------
*/


function charPush(arrSub, realCount){
  var numSub = rangeArray.length;
  if(arrSub === numSub){
   arrSub = 0;
  }
  
console.log("-variable arrSub at function charPush() during realCount " + realCount + ": " + arrSub);

var forWriting = "";
var subArrLength = rangeArray[arrSub].length;
var randomGen = Math.floor(Math.random() * (subArrLength - 1));
console.log("- var randomGen = " + randomGen);
forWriting =  rangeArray[arrSub][randomGen];
console.log("- var forWriting = " + forWriting);
pwString = pwString + forWriting;
realCount++;
arrSub++;
createPWstring(pwString, arrSub, realCount);
}

/* 
------------------------------
FUNCTION NAME: strScrambler

PURPOSE: Because of the possible predictability of a string created
by repeated "looplike" passovers on an array, one more step is needed to scramble the 
results.  For example, if the user selected only Uppercase and Special characters for their pw,
they might get a string with a pattern of Uppercase, Special, Uppercase, Special.
This step undoes that regularity.

PARAMETERS: arrSub (which subarray to target within rangeArray.)
            realCount (total interation count. realCount++ with each run)

RETURNS: None
------------------------------
*/

function strScrambler(){
  var newArray=pwString.split("");
  var n = newArray.length;

  for(var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = tmp;
}
   var newString = newArray.join("");

   var textBoxPath = document.getElementById("password");
   textBoxPath.textContent = newString;
   console.log("-Original Password BEFORE scramble function: " + pwString );
   console.log("-Password AFTER scramble function: " + newString );

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







