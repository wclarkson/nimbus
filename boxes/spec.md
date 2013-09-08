#Interface Specification for Storage APIs
Each API needs to implement CRD and also have a persistant authentication. Note
that this is what Marcella arbitrarily decided these functions should return at
5am, revisions are welcome.

* May also want a getRemainingSpace() function


##Authorize
(Boolean) authorize((String) user, (Function) onFail)

* returns whether the authorization worked.

##Create
(Number) create((String) pathname, (String) contents, (Function) onFail)

* returns the size of the file in bytes

##Read
(String) read((String) pathname, (Function) onFail)

* returns the contents of the file

##Destroy
(Boolean) destroy((String) pathname, (Function) onFail)

* returns whether the destroy worked


