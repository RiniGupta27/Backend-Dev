let str="Rini Gupta"
console.log(str.length);//print length of string
let upr = str.toUpperCase();  // it return new String after convert
let lor = str.toLowerCase(); // it return new String after convert
console.log(upr);
console.log(lor);
console.log(str.charAt(0)) // 0 is here index value
console.log(str[0]) // this will also give char. at particular index.
console.log(str.slice(1,2)); // it start from index 1  to  2 because exlusive . it wil return "ac"
console.log(str.trim()); //it will remove extra space from starting and end.
console.log(str.includes("Gupta"));   // it will return true if string is present in string 
console.log(str.replace("Rini","Muskan")); // it will replace first string with second string
console.log(str.replaceAll("Rini","Muskan")); // it will replace all occurence of first string with second string
console.log(str.split(" ")); // it will split string into array based on given separator
console.log(str.indexOf("o")); // it will return index of first occurence of given string
console.log(str.lastIndexOf("o")); // it will return index of last occurence of given string
console.log(str.concat(" from India")); // it will concatenate two strings
console.log(str.startsWith("Ri")); // it will return true if string starts with given substring
console.log(str.endsWith("hi")); // it will return true if string ends with given substring