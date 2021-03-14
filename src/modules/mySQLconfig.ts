

/*
findAll(){
    connection.connect()
    connection.query('SELECT * FROM products_entity', function (error, results, fields) {
        if (error) throw error;
        for (let i=0; i<results.length; i++)
            return results
    })
    connection.end()
}
findOne(id:string,){
    let selectedProducts: Array<string>
    connection.connect()
    connection.query('SELECT * FROM products_entity WHERE id ='+id,function (error,results,fields) {
        if (error) throw error
        selectedProducts = [results]
        connection.end()
    })
}
create(products:ProductsEntity){
    connection.connect()

    connection.query('INSERT INTO products_entity VALUES('+products.id,products.Img,products.Sex,products.Model,products.Price,products.isCompleted+')',function (error, results,fields) {
        if (error) throw error;
    })
    connection.end()
}
update(products: ProductsEntity){
    connection.connect()
    return (connection.query('UPDATE products_entity SET Img ='+products.Img+',Sex='+products.Sex+', Model='+products.Model+', Price='+products.Price+',isComleted='+products.isCompleted+'   WHERE id ='+products.id,function (error, results, fields) {
        if (error) throw error;
        connection.end()
    }))
}
async remove(id:string):Promise<void> {
    try {
        connection.query('DELETE FROM products_entity WHERE id='+id)
    } catch (e) {
        console.log('removeError')
    }
}
*/