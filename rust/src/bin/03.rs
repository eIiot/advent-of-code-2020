use advent_of_code::helpers::grouped_lines;

static ASCII_LOWER: [char; 26] = [
        'a', 'b', 'c', 'd', 'e', 
        'f', 'g', 'h', 'i', 'j', 
        'k', 'l', 'm', 'n', 'o',
        'p', 'q', 'r', 's', 't', 
        'u', 'v', 'w', 'x', 'y', 
        'z',
    ];

fn assess_char_value(character: char) -> u32 {
    // determine if the character is upper or lowercase

    let is_uppercase = character.is_uppercase();

    // lowercase the character

    let character = character.to_lowercase().to_string();

    // string to char

    let character = character.chars().next().unwrap();

    let char_score: u32 = match ASCII_LOWER.iter().position(|&v| v == character) {
        Some(v) => v as u32 + 1,
        None => 0
    };

    if is_uppercase {
        #[cfg(test)]
        println!("{} is uppercase, so we're adding 26 to it's score", character);
        #[cfg(test)]
        println!("final score: {}", char_score + 26);
        return char_score + 26;
    } else {
        #[cfg(test)]
        println!("{} is lowercase, so we're not adding anything to it's score", character);
        #[cfg(test)]
        println!("final score: {}", char_score);
        return char_score;
    };
}

pub fn part_one(input: &str) -> Option<u32> {
    let sacks: Vec<(&str, &str)> = input.lines()
        .map(
            |sack| {
                sack.split_at(sack.len() / 2)
            }
        )
        .collect();

    // find the item in each sack that's nonunique, and use a dict to assess it's value


    let mut total_value = 0;

    for i in 0..sacks.len() {
        let sack = &sacks[i];
        
        // for the first and last value in each array

        let (part1, part2) = sack;

        for i in 0..part1.len() {
            let char = part1.chars().nth(i);

            if part2.contains(char?) {
                #[cfg(test)]
                println!("{} is in both parts of the sack", char.unwrap());

                total_value += assess_char_value(char?);

                break;
            }
        }
    }

    Some(total_value)
}

pub fn part_two(input: &str) -> Option<u32> {
   let groups = grouped_lines(input, 3);

    // find the item in each sack that's nonunique, and use a dict to assess it's value

    let mut total_value = 0;

    for i in 0..groups.len() {
        let group = &groups[i];
        
        // for the first and last value in each array

        for i in 0..group[0].len() {
            let char = group[0].chars().nth(i);

            if group[1].contains(char?) && group[2].contains(char?) {
                #[cfg(test)]
                println!("{} is in all three groups", char.unwrap());

                total_value += assess_char_value(char?);

                break;
            }
        }
    }

    Some(total_value)
}

fn main() {
    let input = &advent_of_code::read_file("inputs", 3);
    advent_of_code::solve!(1, part_one, input);
    advent_of_code::solve!(2, part_two, input);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_one() {
        let input = advent_of_code::read_file("examples", 3);
        assert_eq!(part_one(&input), Some(157));
    }

    #[test]
    fn test_part_two() {
        let input = advent_of_code::read_file("examples", 3);
        assert_eq!(part_two(&input), Some(70));
    }
}
