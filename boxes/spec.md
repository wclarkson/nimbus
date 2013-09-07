#Interface Specification for Storage APIs
Each API needs to implement CRD and also have a persistant authentication. Note
that this is what Marcella arbitrarily decided these functions should return at
5am, revisions are welcome.

* May also want a getRemainingSpace() function


##Authorize
(Boolean) authorize()

* returns whether the authorization worked.

##Create
(Number) create((String) pathname)

* returns the size of the file in bytes (0 if it failed)

##Read
(String) read((String) pathname)

* returns the contents of the file (empty string if it failed)

##Destroy
(Boolean) destroy((String) pathname)

* returns whether the destroy worked


