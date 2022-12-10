use core::panic;
use std::str::FromStr;

type Command<'a> = (&'a str, i32);

fn parse(input: &str) -> Vec<Command> {
    input
        .lines()
        .map(|line| {
            let instruction: Vec<&str> = line.split(" ").collect();

            let parsed_argument;

            if instruction.len() > 1 {
                parsed_argument = i32::from_str(instruction[1]).unwrap_or(0);
            } else {
                parsed_argument = 0;
            }


            (instruction[0], parsed_argument)
        })
        .rev()
        .collect()
}

pub fn part_one(input: &str) -> Option<u32> {
    let mut commands = parse(input);

    let mut x = 1;
    let mut cycle = 0;
    let mut delay_count = -1;

    let mut signal_strength_sum = 0;

    let is_valid_cycle = | n: i32 | (n - 20) % 40 == 0;

    let exit = false;

    while !exit {

        cycle += 1;

        if commands.len() == 0 {
            break;
        }

        #[cfg(test)]
        println!("During cycle {}. X is {}", cycle, x);

        if is_valid_cycle(cycle) {
            #[cfg(test)]
            println!("x is {} at cycle {}", x, cycle);
            signal_strength_sum += x * cycle;
        }

        if delay_count < 0 { // the next command on the stack is ready to be parsed!
            match commands[commands.len() - 1] {
                (c, _) if c == "noop" => {
                    commands.pop();
                },
                (c, _) if c == "addx" => {
                    delay_count = 1; 
                },
                (c, _) => panic!("Unknown Command: {}", c)
            }
        } else if delay_count == 0 {
            // run the command at the top of the commands() stack

            match commands[commands.len() - 1] {
                (c, n) if c == "addx" => {
                    x += n; 
                },
                (c, _) => panic!("Unknown Command: {}", c)
            }

            commands.pop();

        }

        delay_count -= 1;

        #[cfg(test)]
        println!("End of cycle {}. X is {}", cycle, x);
    }

    Some(signal_strength_sum as u32)
}

pub fn part_two(input: &str) -> Option<String> {
    let mut commands = parse(input);

    let mut x: i32 = 1;
    let mut cycle: i32 = 0;
    let mut delay_count: i32 = -1;

    let mut screen: Vec<&str> = vec!["."; 240];

    let exit = false;

    while !exit {

        cycle += 1;

        if commands.len() == 0 {
            break;
        }

        let drawn_pixel = cycle - 1;

        let sprite_range = x-1..=x+1;

        #[cfg(test)]
        println!("cycle {} => range: {:?} at pixel {}", cycle, sprite_range, drawn_pixel);

        if sprite_range.contains(&(drawn_pixel % 40)) {
             #[cfg(test)]
            println!("Range contains pixel!");
            screen[drawn_pixel as usize] = "#"
        }

        if delay_count < 0 { // the next command on the stack is ready to be parsed!
            match commands[commands.len() - 1] {
                (c, _) if c == "noop" => {
                    commands.pop();
                },
                (c, _) if c == "addx" => {
                    delay_count = 1; 
                },
                (c, _) => panic!("Unknown Command: {}", c)
            }
        } else if delay_count == 0 {
            // run the command at the top of the commands() stack

            match commands[commands.len() - 1] {
                (c, n) if c == "addx" => {
                    x += n; 
                },
                (c, _) => panic!("Unknown Command: {}", c)
            }

            commands.pop();

        }

        delay_count -= 1;
    }

    let mut screen_str = "".to_string();

    let is_valid_cycle = | n: i32 | n % 40 == 0 && n < 240;

    for i in 1..241 {
        screen_str += screen[i-1];
        if is_valid_cycle(i as i32) {
            screen_str += "\n";
        }
    }

    #[cfg(test)]
    println!("{}", screen_str);

   Some(screen_str) 
}

fn main() {
    let input = &advent_of_code::read_file("inputs", 10);
    advent_of_code::solve!(1, part_one, input);
    advent_of_code::solve!(2, part_two, input);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_one() {
        let input = advent_of_code::read_file("examples", 10);
        assert_eq!(part_one(&input), Some(13140));
    }

    #[test]
    fn test_part_two() {
        let input = advent_of_code::read_file("examples", 10);
        assert_eq!(part_two(&input), Some("##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....".to_string()));
    }
}
