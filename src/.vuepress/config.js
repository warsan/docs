/* узел eslint-env */

// Точка входа для vuepress-config
// Расположение этого файла жёстко запрограммировано в vuepress, поэтому
//
require("@babel/register");
module.exports = require("./config-using-babel").default;
