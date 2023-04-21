const path = require('path')

module.exports = {
    // Source files
    scripts: path.resolve(__dirname, '../src'),
    styles: path.resolve(__dirname, '../scss'),
    // Production build files
    build: path.resolve(__dirname, '../../../public/build'),
};