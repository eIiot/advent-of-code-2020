pub fn part_one(input: &str) -> Option<u32> {
    // generate a rolling list of 4 characters for each index (at index 3 the string would be the chars from index 0 to 3)

    for i in 4..input.len() {
        let window = &input[i-4..i];

        // check if the window contains a duplicate character

        let mut has_duplicate = false;

        for j in 0..window.len() {
            let char = &window[j..j+1];

            if window.matches(char).count() > 1 {
                has_duplicate = true;
                break;
            }
        }

        if !has_duplicate {
            return Some(i as u32);
        }
    }

    None
}

pub fn part_two(input: &str) -> Option<u32> {
    // generate a rolling list of 4 characters for each index (at index 3 the string would be the chars from index 0 to 3)

    for i in 14..input.len() {
        let window = &input[i-14..i];

        // check if the window contains a duplicate character

        let mut has_duplicate = false;

        for j in 0..window.len() {
            let char = &window[j..j+1];

            if window.matches(char).count() > 1 {
                has_duplicate = true;
                break;
            }
        }

        if !has_duplicate {
            return Some(i as u32);
        }
    }

    None
}

fn main() {
    let input = &advent_of_code::read_file("inputs", 6);
    advent_of_code::solve!(1, part_one, input);
    advent_of_code::solve!(2, part_two, input);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_one() {
        let input = advent_of_code::read_file("examples", 6);
        assert_eq!(part_one(&input), Some(7));
    }

    #[test]
    fn test_part_two() {
        let input = advent_of_code::read_file("examples", 6);
        assert_eq!(part_two(&input), Some(19));
    }
}
