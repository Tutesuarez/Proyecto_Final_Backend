import { faker } from '@faker-js/faker/locale/es'

export default function generateProduct() {
    let numberOfImages = parseInt(faker.string.numeric(1, { bannedDigits: ['0'] }));
    let images = [];
    for (let i = 0; i < numberOfImages; i++) {
      images.push(faker.image.url());
    }
    const productId = faker.database.mongodbObjectId()
    const title= faker.commerce.productName()
    const description= faker.commerce.productDescription()
    const price= faker.commerce.price() 
    const thumbnails= images
    const code= faker.random.alphaNumeric(5, { bannedChars: ["a"] })
    const stock= faker.string.numeric(3)
    const category= faker.commerce.productAdjective()
    const status= faker.datatype.boolean()
    return { 
        productId,
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        category,
        status
    }
}