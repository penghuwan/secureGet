
/**
 * secureGet函数
 * @param {string|Array} propPath - 访问属性的路径字符串：'a.b.c'
 * @param {Object} obj - 外层对象：obj
 */
function secureGet(obj, propPath) {
    if (typeof obj !== 'object' || obj === null || typeof propPath !== 'string') {
        return undefined;
    }
    var pathArr = propPath.trim().split('.');
    var cur = obj, prop;
    for (var i = 0; i < pathArr.length; i++) {
        prop = pathArr[i];
        if (!cur[prop]) {
            return undefined;
        } else {
            cur = cur[prop];
        }
    }
    return cur;
}

module.exports = secureGet;