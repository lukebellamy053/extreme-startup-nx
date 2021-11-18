const capitalCityList = require('./capital-cities.json');
const generalKnowledge = require('./general-knowledge.json');
const stringExamples = ['rat', 'car', 'example', 'apple', 'mouse'];
export const Questions = [
    {
        id: 0,
        title: "Warmup",
        format: "ping",
        transformer: function () {
            return {question: this.format, answer: "pong"};
        }
    },
    {
        id: 1,
        title: "Maths (Addition)",
        format: "What is $num1 + $num2?",
        transformer: function () {
            const num1 = getRandomInt(100);
            const num2 = getRandomInt(100);
            return {question: this.format.replace("$num1", `${num1}`).replace("$num2", `${num2}`), answer: num1 + num2}
        }
    },
    {
        id: 2,
        title: "Maths (Multiplication)",
        format: "What is $num1 * $num2?",
        transformer: function () {
            const num1 = getRandomInt(100);
            const num2 = getRandomInt(100);
            return {question: this.format.replace("$num1", `${num1}`).replace("$num2", `${num2}`), answer: num1 * num2}
        }
    },
    {
        id: 3,
        title: "Maths (Powers)",
        format: "What is $num1^$num2?",
        transformer: function () {
            const num1 = getRandomInt(10);
            const num2 = getRandomInt(4);
            return {
                question: this.format.replace("$num1", `${num1}`).replace("$num2", `${num2}`),
                answer: Math.pow(num1, num2)
            }
        }
    },
    {
        id: 4,
        title: "String reversed",
        format: "What is '$var1' reversed?",
        transformer: function () {
            const var1 = getRandomElement(stringExamples);
            const reversed = var1.split('').reverse().join('');
            return {question: this.format.replace("$var1", var1), answer: reversed}
        }
    },
    {
        id: 5,
        title: "Capital Cities",
        format: "What is the capital city of $var1?",
        transformer: function () {
            const var1 = getRandomElement(capitalCityList);
            return {question: this.format.replace("$var1", `${var1.country}`), answer: var1.city}
        }
    },
    {
        id: 6,
        title: "General Knowledge",
        format: "$var1?",
        transformer: function () {
            const var1 = getRandomElement(generalKnowledge);
            return {question: var1.question, answer: var1.answer}
        }
    },
    {
        id: 7,
        title: "Maths (Addition) Harder",
        format: "What is $num1 + $num2 + $num3?",
        transformer: function () {
            const num1 = getRandomInt(100);
            const num2 = getRandomInt(100);
            const num3 = getRandomInt(100);
            return {
                question: this.format.replace("$num1", `${num1}`).replace("$num2", `${num2}`).replace("$num3", `${num3}`),
                answer: num1 + num2 + num3
            }
        }
    },
    {
        id: 8,
        title: "Maths (Multiplication) Harder",
        format: "What is $num1 * $num2 * $num3?",
        transformer: function () {
            const num1 = getRandomInt(10);
            const num2 = getRandomInt(20);
            const num3 = getRandomInt(30);
            return {
                question: this.format
                    .replace("$num1", `${num1}`)
                    .replace("$num3", `${num3}`)
                    .replace("$num2", `${num2}`), answer: num1 * num2 * num3
            }
        }
    },
]

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function getRandomElement(list: Array<any>, _max?: number) {
    const max = _max ?? list.length;
    const index = getRandomInt(max);
    return list[index > 0 ? index - 1 : 0];
}
