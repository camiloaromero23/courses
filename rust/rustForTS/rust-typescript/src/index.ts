interface Area {
  area(): number;
}

class Rectangle implements Area {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  area(): number {
    return this.width * this.height;
  }

  toString() {
    return `Rectangle(${this.x}, ${this.y}): ${this.width}x${this.height}`;
  }
}

class Circle {
  constructor(public x: number, public y: number, public radius: number) {}

  area(): number {
    return this.radius * this.radius * Math.PI;
  }
}

console.log(`${new Rectangle(0, 0, 10, 10)}`);
// import { readFileSync } from "fs";
// const fileName = process.argv[2];

// readFileSync(fileName)
//   .toString()
//   .split("\n")
//   .forEach((line) => {
//     const print = parseInt(line);
//     if (isNaN(print)) {
//       console.log("Line not a number");
//     } else {
//       console.log(print);
//     }
//   });

// function practice(nums: number[], index: number): number {
//   return (nums[index] ?? index) * 5;
// }

// function practice (value: number | undefined): number | undefined {
//   return value === undefined ? undefined: value * 5;
// }

// type Custom = {
//   age: number,
//   name: string,
// }

// type Item = number | string | Custom;

// function append(items: Item[]) {
//   items.push("hello fem")
// }

// const items: Item[] = [];

// console.log(items)

// append(items);

// console.log(items)

// const numbers: number[] = [];

// console.log(numbers)

// append(numbers);

// console.log(numbers)

// enum Color {
//   Red,
//   Green,
//   Blue,
//   Yellow,
// }

// function printColor(color: Color) {
//   switch (color) {
//     case Color.Red:
//       console.log("red");
//       break;
//     case Color.Green:
//       console.log("green");
//       break;
//     case Color.Blue:
//       console.log("blue");
//       break;
//   }
// }

// printColor(Color.Yellow);

// import { readFileSync } from "fs";

// readFileSync("lines")
//   .toString()
//   .split("\n")
//   .filter((_, i) => i % 2 === 0)
//   .filter((_, i) => i > 1 && i < 4)
//   .forEach((line) => console.log(line));

// const foo = [1, 2, 3].map((x) => x + 1);
// console.log(foo);
