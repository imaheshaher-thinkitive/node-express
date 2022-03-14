
module.exports.inserData = async(model,data) =>{
    let savedData = new model(data).save()
    return savedData.then((result) => {
        if(result){
            return {
                "status":true,
                "data":result
            }
        }
        
    })
    .catch((err) =>{
        return {
            "status":false,
            "data":err
        }
    })
}

module.exports.getAllData = async(model,query={},selectedField={},populate=null) => {
    return await  model.find(query,selectedField).populate(populate)
}

module.exports.getData = async(model,query={},selectedField={},populate=null) => {
    let data = await model.findOne(query,selectedField).populate(populate)
    if(data){
        return data
    }
    return false
}

module.exports.deleteData = async(model,query={}) => {
    let data = await model.findOneAndDelete(query)
   
    if(data){
        return true
    }
    return false
}

module.exports.insertOrUpdate = async(model,query={},updateData={}) => {
    let options = {upsert:true}
    let data = await model.updateOne(query,updateData,options)
    console.log(data)
    if(data) return data
    return false
}