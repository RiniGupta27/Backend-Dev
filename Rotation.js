function rotateString(str) {
   
    return str.slice(1) + str[0];
}

function isRotation(str1, str2) {
    if (str1.length !== str2.length) {
        return false;
    }

    let rotated = str1;

    for (let i = 0; i < str1.length; i++) {
        rotated = rotateString(rotated);
        if (rotated === str2) {
            return true;
        }
    }

    return false;
}


console.log(isRotation("ABCD", "CDAB")); 
