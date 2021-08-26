use rand::Rng;
use std::cmp::Ordering;
use std::io;
use colored::*;

fn main() {
    let secret_number = rand::thread_rng().gen_range(1..101);

    loop {
        println!("Guess the number!");

        println!("Please input your guess.");

        let mut guess = String::new();

        println!("The secret number is: {}", secret_number);

        io::stdin()
            .read_line(&mut guess)
            .expect("Failed reading line");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        println!("You guessed: {}", guess);

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("{}", "Too Small!".red()),
            Ordering::Greater => println!("{}", "Too Big!".red()),
            Ordering::Equal => {
                println!("{}", "You win!".green());
                break;
            }
        }
    }
}
