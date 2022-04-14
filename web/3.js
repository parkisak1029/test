var combination = require("combinations-generator");

function count(array) {
    function nums(a) {
        if (a == 2) return true;
        if (a == 3) return true;
        if (a % 2 == 0) return false;
        for (let i = 3; i < parseInt(a / 2) + 1; i +=2) {
            if (a % i == 0) return false;
        }
        return true;
    }
    var iter = combination(array,3);
    let result = [];
    for (var items of iter){
        let sum = items[0] + items[1] + items[2];
        if (nums(sum)) {
            if (!result.includes(sum)) result.push(sum);
        }
    };
    return result.length;
}

console.log(count([1,2,7,6,4,11]));