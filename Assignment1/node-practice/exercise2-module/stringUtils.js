export function capitalize(str){
    return str.toUpperCase();
}

export function reverse(str){
    return str.split("").reverse().join("");
}

export function countVowels(str){
    const m = str.match(/[aeiou]/gi);
    return m ? m.length : 0;
}
