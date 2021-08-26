fn main() {
    let x = 5;
    println!("The value of x is: {}", x);
    let x = 6;
    println!("The value of x is: {}", x);

    const COUNTER: u32 = 1_000;
    println!("The value of COUNTER is: {}", COUNTER);

    let _: i32 = -2;

    let tup = ("Halooo", 200_000);
    let _ = tup;
    let _ = tup.1;

    let error_codes = [200, 404, 500];
    let _ = error_codes[1];

    let _ = [0; 8];
    let sum = my_function(1, 2);
    println!("The value of sum is: {}", sum);

    if sum == 2 {
        println!("Sum equals 2");
    } else if sum > 2 {
        println!("Sum greater than 2");
    } else {
        println!("Sum less than 2");
    }

    let condition = true;
    let _ = if condition { 5 } else { 4 };

    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter;
        }
    };
    println!("looped {} times!", result);

    let mut number = 3;

    while number != 0 {
        number -= 1;
    }
    println!("Out of while loop!");

    let a = [1, 2, 3, 4, 5];
    for element in a.iter() {
        print!("The value in the array is: {}\t", element);
    }
    println!();

    for num in 1..4 {
        print!("The value in range is: {}\t", num);
    }
    println!();
}

fn my_function(x: i32, y: i32) -> i32 {
    println!("The value of x is: {}", x);
    println!("The value of y is: {}", y);
    // let sum = x + y;
    // return sum;
    // let sum = x + y;
    // sum
    x + y
}
