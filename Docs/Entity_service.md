### Category Service
- createCategory
     - using to create a new category
     - function example: ` var response = await categoryService.createCategory(dbUri,'Grocery','drink',client); `
     - ` dbUri `: uri of database connection string
     - ` 'Grocery' `: database name
     - ` 'drink' `: collection name
     - ` client `: ` dbManager ` instance
     - return value: if success: will return an object: { "result":"success" }, otherwise will return an object: { "result":"fail", "reason": ` error message `}.

- deleteCategory
     - using to delete an existing category
     - function example: ` var response = await categoryService.deleteCategory(dbUri,'Grocery','drink',client); `
     - ` dbUri `: uri of database connection string
     - ` 'Grocery' `: database name
     - ` 'drink' `: collection name
     - ` client `: ` dbManager ` instance
     - return value: if success: will return an object: { "result":"success" }, otherwise will return an object: { "result":"fail", "reason": ` error message `}.

- getCollectionList
    - using to get the collection list from an database
     - function example: ` var response = await categoryService.getCollectionList(dbUri,'Grocery',client); `
     - ` dbUri `: uri of database connection string
     - ` 'Grocery' `: database name
     - ` client `: ` dbManager ` instance
     - return value: if success: will return an Array object conatins the collection list, otherwise will return an object: { "result":"fail", "reason": ` error message `}.

- renameCollection
     - using to rename the certain collection
     - function example: `  var response = await categoryService.renameCollection(dbUri,'Grocery',client,'Fruit','Meat'); `
     - ` dbUri `: uri of database connection string
     - ` 'Grocery' `: database name
     - ` client `: ` dbManager ` instance
     - ` 'Fruit' `: old collection name
     - ` 'Meat' `: new collection name
     - return value: if success: will return an object: { "result":"success" }, otherwise will return an object: { "result":"fail", "reason": ` error message `}.

### Product Service
- getProductInfoWithId
     - using objectId to get the product from db
     - function example: ` var response = await productService.getProductInfoWithId(dbUri,'Grocery','Fruit',client,"5eac3f15faf6cf0e786b541d")); `
     - ` dbUri `: uri of database connection string
     - ` 'Grocery' `: database name
     - ` 'Fruit' `: collection name
     - ` client `: ` dbManager ` instance
     - ` "5eac3f15faf6cf0e786b541d" `: string of objectId
     - return value: if success: will return the found object, otherwise will return an object: { "result":"fail", "reason": ` error message `}.

- getProductListFromCollection
     - get a list of product from certain collection
     - function example: ` var response = await productService.getProductListFromCollection(dbUri,'Grocery','Fruit',client); `
     - ` dbUri `: uri of database connection string
     - ` 'Grocery' `: database name
     - ` 'Fruit' `: collection name
     - ` client `: ` dbManager ` instance
     - return value: if success: will return an list of product object, otherwise will return an object: { "result":"fail", "reason": ` error message `}.

- getOneProductWithAttributes
     - get a product with certain attributes
     - function example: ` var response = await productService.getOneProductWithAttributes(dbUri,'Grocery','food',client,{name:"chocolate"}); `
     - ` dbUri `: uri of database connection string
     - ` 'Grocery' `: database name
     - ` 'food' `: collection name
     - ` client `: ` dbManager ` instance
     - ` {name:"chocolate"} `: the product which name is chocolate will be found
     - return value: if success: will return an found product object, otherwise will return an object: { "result":"fail", "reason": ` error message `}.

- getProdcutListWithAttributes
     - get a list of products with certain attributes
     - function example: `  var response = await productService.getProductListWithAttributes(dbUri,'Grocery','food',client,{name:"chocolate"}); `
     - ` dbUri `: uri of database connection string
     - ` 'Grocery' `: database name
     - ` 'food' `: collection name
     - ` client `: ` dbManager ` instance
     - ` {name:"chocolate"} `: the product which name is chocolate will be found
     - return value: if success: will return a list of found product object, otherwise will return an object: { "result":"fail", "reason": ` error message `}.

- insertOneProductToCollection
     - insert a new product to certain collection
     - function example: ` var response = await productService.insertOneProductToCollection(dbUri,'Grocery','food',client,{name:"chocolate",price:250}); `
     - ` dbUri `: uri of database connection string
     - ` 'Grocery' `: database name
     - ` 'food' `: collection name
     - ` client `: ` dbManager ` instance
     - ` {name:"chocolate",price:250} `: the product object
     - return value: if success: will return an object: { "result:"success","objectId": ` objectId ` }, otherwise will return an object: { "result":"fail", "reason": ` error message `}.

-  removeOneProductFromCollection
     - remove an existing product from certain collection
     - function example: ` var response = await productService.removeOneProductFromCollection(dbUri,'Grocery','Fruit',client,"5eac3f15faf6cf0e786b541d"); `
     - ` dbUri `: uri of database connection string
     - ` 'Grocery' `: database name
     - ` 'food' `: collection name
     - ` client `: ` dbManager ` instance
     - ` "5eac3f15faf6cf0e786b541d" `: the product objectId string
     - return value: if success: will return an object: { "result":"success" }, otherwise will return an object: { "result":"fail", "reason": ` error message `}.

- updateOneProductFromCollection
     - update an product to the collection
     - function example: `  var response = await productService.updateOneProductFromCollection(dbUri,'Grocery','Fruit',client,"5eac3f15faf6cf0e786b541d",{name:"milk",price:140}) `
     - ` dbUri `: uri of database connection string
     - ` 'Grocery' `: database name
     - ` 'Fruit' `: collection name
     - ` client `: ` dbManager ` instance
     - ` "5eac3f15faf6cf0e786b541d" `: the product objectId string
     - ` {name:"milk",price:140} `: change the product ` name ` to *milk* and ` price ` to *140* 
     - return value: if success: will return an object: { "result":"success" }, otherwise will return an object: { "result":"fail", "reason": ` error message `}.








