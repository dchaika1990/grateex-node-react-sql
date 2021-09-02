const path = require("path");

module.exports = (config) => {
    Object.assign(config.resolve.alias, {
        '@': path.join(__dirname, "/src/"),
        '@pages': path.join(__dirname, "/src/pages/"),
        '@components': path.join(__dirname, "/src/components/"),
        '@services': path.join(__dirname, "/src/services/"),
    });
    return config;
};
