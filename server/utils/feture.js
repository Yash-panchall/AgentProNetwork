const DataURIParser = require('datauri/parser.js')
const path = require('path');

const getDataUri = (file) => {
    // console.log(file)
    const parser = new DataURIParser()
    const extName = path.extname(file.originalname).toString()
    const parsedfile = parser.format(extName , file.buffer)
    // console.log("this is parsed :" ,parsedfile)
    return parsedfile
}

module.exports = getDataUri