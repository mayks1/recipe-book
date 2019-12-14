const numberCategoryInList = (list, categories) => {

    let array = []

    categories.forEach((el) => {

        element = {category: el,  number: list.filter(x => x == el).length}
        array.push(element)
    
    })
    
    return array
}

module.exports = numberCategoryInList