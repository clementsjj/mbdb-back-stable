# MBDB Node.js Server
This is the server for the MBDB project. It is hosted as a separate git repo because it is stable and will be used as a base.

If you would like to view the full working project, 
please check out MBDB-full.

##Alpha Release
28 November 2018

Stable. 

Has two routes: /bathrooms/getallbathrooms and /bathrooms/addbathroom.

Adding a bathroom consists of:
- place_id
- name
- address
- lat
- lng
- code
- isPublic
- quality
- isValidated

##Future Improvements
- Add new additional name to the bathroom schema that is based on the place_id and not whatever the user decides to enter. 
- A separate route that allows for editing of data, so that isValidated can be toggled.
