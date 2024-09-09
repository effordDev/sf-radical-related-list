# sf-radical-related-list

<a href="https://githubsfdeploy.herokuapp.com?owner=effordDev&repo=sf-radical-related-list&ref=main">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

## Overview

### Header Title
Text to be displayed at the top of the list. (Parent Account Contacts)

![image](https://github.com/user-attachments/assets/9bd8c563-66af-43ff-9661-7ee7a6a5e0eb)

### Sub Header
Sub text to be displayed under the header. (Showing the contacts of the Parent Account)

![image](https://github.com/user-attachments/assets/9bd8c563-66af-43ff-9661-7ee7a6a5e0eb)

### Icon Name
An icon to display at the top of the list from https://www.lightningdesignsystem.com/icons/

![image](https://github.com/user-attachments/assets/9bd8c563-66af-43ff-9661-7ee7a6a5e0eb)


### Parent Record
If you wanted to show grand child records - this would be the api name of the parent (If you want to show contacts from a parent account of the current account you are on `ParentId`)

### Child Field To Match Parent Record
### Show New Button

Shows the new button

### Show Delete Button

shows the delete button

### Object

Api name of the object of the to show in teh table

### Fields

Comma sperated list of fields to show in order (`LastName, Phone, email`)

### Filter

Where statment to be passed into the query `phone LIKE '%7189%'`

### Sort Field Api Name

Api field to sort the list on `email`

### Sort Direction

`asc` or `desc`

<hr>

A couple examples...

Using the grandparent method - not very common

Notice tokyo and effordev are related to Effordev account not Magic Seaweeds. Magic Seaweeds is a child account of Effordev.

![image](https://github.com/user-attachments/assets/7981bf66-33a8-4e66-802b-f3fe80ac30bb)

![image](https://github.com/user-attachments/assets/248ea1b9-1bfc-4082-bfac-ddfc417241c8)

<hr>

To show just child records from the current record you are viewing

![image](https://github.com/user-attachments/assets/28c8ddfd-ad16-441d-897f-7d2ed3382b94)

![image](https://github.com/user-attachments/assets/ce5ff3e5-5c87-4639-ab66-f4ca32471082)

