const fs = require("fs")

const burgerData = require("./data/burgers.json")

const burgerWithoutIngredients = burgerData.map((item) => {
    const {ingredients, images, ...rest} = item
    const filteredImages = images.map(({sm, ...image}) => image).filter((image) => Object.keys(image).length !== 0)
    return {...rest, images:filteredImages}
})

fs.writeFile("./data/burgersWithoutIngredients.json", JSON.stringify(burgerWithoutIngredients, null, 2), (error) => {
    if(error) {
        console.error("Error writing file", error)
        return;
    }
    console.log("File has been created")
})