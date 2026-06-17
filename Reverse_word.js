function reverseString(str) {
    return str.split(" ").reverse().join(" ");
}
let String = "Java is Fun";
console.log("Original String: " + String);
console.log("reversed string: "+ reverseString(String));