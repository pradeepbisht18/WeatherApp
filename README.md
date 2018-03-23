
Weather App

Task: create a Cordova App for weather monitoring of different locations
Technologies used : Microsoft Visual studio, Javascript, Html, Vue. 

Application Functioning
Login page:                                 Home Screen                                Current location page
     

Specified location                     Success                               
                   

Proceed Screen and About Us.
      
Error handling of screen and Popup
   

Code Handling:	

1)	Data is loaded to an array from the json for the weather updates that is being collected from the wunderground api.
2)	Login page credentials validation are done based on the user,json provided 
a.	If there is a space after and before the username but not in between ( considered valid username)
b.	If there ia a space in password not considered valid.
c.	User name and password are case sensitive.
d.	Alert popup has been displayed when a user enter the wrong crendentials.
3)	After Successful login Home screen was displayed
4)	Menu bar of the home screen has option
a.	Home – Take a user from any page to home screen.
b.	Logout- Take a user to exit from any page to login Screen.
c.	About Us -  This is implemented using a MODAL popup a template was created for displaying the information about the system in a popup manner.
5)	Home screen has option to 
-Check weather at current location
For this App since Geolocation services has not been implemented used the first element of the array of the weather updates to show the current location weather updates.

-Check Weather at a specified location
 For this a number input box has been provided to enter the zipcode and a submit button to fetch the details and displaying them if the data is present.
a)	Error handling for the invalid zipcode 
b)	Error handling for no input.
c)	Error handling for no Data available has been alerted using a alert popup to the user.
       -Proceed
A grid is used to implement this functionality. All the data present with the weather file is extracted and certain columns are uploaded to the grid.
       Functionalities provided with the grid.
-	A Seach box to search for all the items present in the grid.
Filter has been implemented to match with all the elements of the KEY to match and return the index of the row to be displayed based on the searchKey provided.
-	To sort the Data in Ascending and Descending order with a simple click on the column with an arrow symbol to categorize the Asc and descending order. We can sort data on any columns.
