let string = "aaabbc";
console.log("Original String: " + string);
console.log("Runlength Encoded String: " + runLengthEncode(string));

function runLengthEncode(str) {
    let encodedStr = "";
    let count = 1;
    for (let i = 1; i <= str.length; i++) {
        if (str[i] === str[i - 1]) {
            count++;
        } else {
            encodedStr += str[i - 1] + count;
            count = 1;
        }
    }
    return encodedStr;
}