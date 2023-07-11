use anyhow::Result;
use shapes::{collisions::Collidable, shape::Shape};

mod shapes;

fn main() -> Result<()> {
    let shapes: Vec<Shape> = std::fs::read_to_string("shapes")?
        .lines()
        .filter_map(|x| x.parse().ok())
        .collect();

    shapes
        .iter()
        .skip(1)
        .zip(shapes.iter().take(shapes.len() - 1))
        .filter(|(a, b)| a.collide(b))
        .for_each(|(a, b)| println!("{} collides with {}", a, b));

    return Ok(());
}

// use shapes::collisions::Collidable;

// use crate::shapes::{circle::Circle, rect::Rect};

// mod shapes;

// fn main() {
//     let rect = Rect::default();
//     let rect2 = Rect::default();

//     let circle = Circle {
//         x: 0.0,
//         y: 0.0,
//         radius: 1.0,
//     };
//     let circle2 = Circle {
//         x: 1.5,
//         y: 1.5,
//         radius: 4.0,
//     };

//     rect.collide(&rect2);
//     circle.collide(&circle2);
//     rect.collide(&circle);
// }

// use crate::shapes::{area::Area, circle::Circle, rect::Rect};

// mod shapes;

// fn main() {
//     let rect = Rect {
//         x: 0.0,
//         y: 0.0,
//         width: 10.0,
//         height: 10.0,
//     };

//     let circ = Circle {
//         x: 0.0,
//         y: 0.0,
//         radius: 10.0,
//     };

//     println!("{:?}", circ.area());
//     println!("{:?}", rect.area());
//     println!("{:?}", 6.9.area());

//     let rect = Rect::default();

//     println!("{:?}", rect.area());

//     println!("{}", rect);
// }

// #[derive(Debug)]
// struct Item {
//     count: usize,
// }

// fn add_one(item: &mut Item) {
//     item.count += 1;
// }

// fn print_all(items: &Vec<Item>) {
//     for item in items {
//         println!("{:?}", item);
//     }
// }

// fn main() {
//     let mut items = vec![Item { count: 1 }];

//     let first = items.get_mut(0);
//     let second = items.get_mut(1);
//     // println!("{:?}", first);
//     println!("{:?}", second);
//     // print_all(&items);
// }

// fn main() {
//     let file_name = std::env::args()
//         .nth(1)
//         .expect("The file name to be passed in");

//     std::fs::read_to_string(file_name)
//         .expect("Unable to read the file to string")
//         .lines()
//         .for_each(|line| {
//             if let Ok(value) = line.parse::<usize>() {
//                 println!("{}", value);
//             } else {
//                 println!("Line not a number");
//             }
//         });
// }

// fn multiply(nums: Vec<usize>, index: usize) -> usize {
//     return nums.get(index).unwrap_or(&index) * 5;
// }

// fn practice(number: Option<isize>) -> Option<isize> {
//     return Some(number? * 5)
// }

// struct Custom {
//     age: usize,
//     name: String,
// }

// enum Item {
//     Number(usize),
//     String(String),
//     MyCustom(Custom),
// }

// fn append(items: &mut Vec<Item>) {
//     items.push(Item::String("hello, fem".into()));
// }

// fn main() {
//     let mut items: Vec<Item> = vec![];
//     append(&mut items);

//     let mut items: Vec<usize> = vec![];
//     append(&mut items);
// }

// enum Color {
//     Red,
//     Green,
//     Blue,
//     Yellow,
// }

// impl Color {
//     fn is_green(&self) -> bool {
//         if let Color::Green = self {
//             return true
//         }

//         return false
//     }

//     fn is_green_parts(&self) -> bool {
//         match self {
//             Color::Red => return false,
//             Color::Green => return false,
//             _ => return true,
//         }
//     }
// }

// fn print_color(color: Color) {
//     match color {
//         Color::Red => println!("red"),
//         Color::Green => println!("green"),
//         Color::Blue => println!("blue"),
//         Color::Yellow => println!("yellow"),
//     }
// }

// fn main() {
//     let foo = Color::Green;
//     foo.is_green();
//     foo.is_green_parts();
// }

// fn main() {
//     let file = std::fs::read_to_string("lines").unwrap();

//     file.lines()
//         .enumerate()
//         .filter(|(i, _)| i % 2 == 0)
//         .skip(2)
//         .take(2)
//         .for_each(|(_, line)| println!("{}", line))
// }

// fn main() {
//     let foo = [1, 2, 3]
//         .iter()
//         .map(|x| x + 1);

//     println!("{:?}", foo);
// }

// fn main() {
//     let data = vec![1, 2, 3];

//     let mut foo = data
//         .iter()
//         .map(|x| x + 1);

//     let mut new_vector = vec![];

//     while let Some(x) = foo.next() {
//         new_vector.push(x)
//     }

//     println!("{:?}", new_vector);
// }
