const fs = require("fs")

class CSV extends Array {
    keys = [];
    all = [];
    /**
     * @param {string} stri
     */
    static makeFromCSV(stri) {
        const array = stri.split("\n").map(str => str.split(","));
        if (array.length <= 0) throw new Error("Cannot Split to CSV.")
        const all = [...array];
        const first = array.shift();
        const keylength = first.length;
        const csv = new CSV(...array)
        csv.all = all;
        first.forEach((key) => {
            csv[key] = [];
        })
        csv.keys = first;
        array.forEach((arr2, index) => {
            const lengthDifferent = arr2.length - keylength;
            if (lengthDifferent !== 0) throw new Error
                (`CSV Array ${index} length is ${Math.abs(lengthDifferent)} ${lengthDifferent < 0 ? "less" : "more"} than the key length.`)
            arr2.forEach((v, i) => {
                csv[first[i]].push(v)
            })
        })
        return csv;
    }
}

CSV.prototype.toString = function () {
    return this.all.map(a => a.join(",")).join("\n")
}



module.exports = CSV;