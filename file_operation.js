const fs = require('fs').promises;

async function countWords() {
    try {
        const data = await fs.readFile('input.txt', 'utf8');
        const wordCount = data.trim().split(/\s+/).filter(word => word.length > 0).length;
        const resultMessage = `Total word count: ${wordCount}`;
        await fs.writeFile('output.txt', resultMessage);

        console.log('Success! Word count written to output.txt');
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Error: input.txt not found. Please create it first.');
        } else {
            console.error('An error occurred:', error.message);
        }
    }
}

countWords();