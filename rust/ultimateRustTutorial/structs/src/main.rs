// struct User {
//     username: String,
//     email: String,
//     sign_in_count: u64,
//     active: bool,
// }
//
// fn main() {
//     let mut user1 = User {
//         email: String::from("test@test.com"),
//         username: String::from("test"),
//         sign_in_count: 1,
//         active: true,
//     };
//
//     let name = user1.username;
//     user1.username = String::from("halooo");
//
//     let user2 = build_user(String::from("aoe@mail.com"), String::from("AOE"));
//
//     let user3 = User {
//         email: String::from("test3@test.com"),
//         username: String::from("test3"),
//         ..user2
//     };
//
//     struct Color(i32, i32, i32);
//     struct Point(i32, i32, i32);
// }
//
// fn build_user(email: String, username: String) -> User {
//     User {
//         email,
//         username,
//         active: true,
//         sign_in_count: 1,
//     }
// }

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

impl Rectangle {
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}

fn main() {
    let rect = Rectangle {
        width: 30,
        height: 50,
    };

    let rect1 = Rectangle {
        width: 20,
        height: 40,
    };

    let rect2 = Rectangle {
        width: 40,
        height: 50,
    };

    let square = Rectangle::square(20);

    println!("rect can hold rect1: {}", rect.can_hold(&rect1));
    println!("rect can hold rect2: {}", rect.can_hold(&rect2));

    println!("rect: {:#?}", rect);
    println!("The area if the rectangle is {} square pixels", rect.area());
    println!("square: {:#?}", square);
    println!("The area if the square is {} square pixels", square.area());
}
