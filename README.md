#PURPOSE:
The password-generator app creates a string based on a series of prompts.  The end user control both the length of the string, and the allowable characters.

#LANGUAGES USED:
HTML (Bootstrap Framework), CSS and Javascript

#METHODOLOGIES:
Most of this app's functionality comes from a battery of Javascript functions that handle
smaller parts of the process.

A rough sketch of the process can be described as follows:

(1) End-user (EU) is prompted for password length.  EU submits.  Function checks that valid characters are used, and volleys to a second function that validates length and (if valid) pushes to a global variable.


