fn parse(input: &str) -> Vec<Vec<Vec<u32>>> {
    input.lines()
    .map(|l| l.split(",")
        .map(|p| p.split("-")
                .map(|n| n.parse::<u32>().unwrap())
                .collect()
            )
        .collect()
    )
    .collect()
}


pub fn part_one(input: &str) -> Option<u32> {

    let pairs = parse(input);
        
    let mut set_includes_other: u32 = 0;

    for i in 0..pairs.len() {
        let pair = &pairs[i];

        #[cfg(test)]
        println!("{:?}", pair);
        
        // second pair is included in first pair                 // first pair is included in second pair
        if (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) || (pair[1][0] <= pair[0][0] && pair[1][1] >= pair[0][1]) {
            #[cfg(test)]
            println!("Included ✅");

            set_includes_other += 1
        } else {
            #[cfg(test)]
            println!("Not Included ❌");
        }
    }

    Some(set_includes_other)
}

pub fn part_two(input: &str) -> Option<u32> {
    let pairs = parse(input);

    let mut sets_overlapping: u32 = 0;

        for i in 0..pairs.len() {
        let pair = &pairs[i];

        #[cfg(test)]
        println!("{:?}", pair);
    
        if pair[1][0] <= pair[0][1] && pair[1][1] >= pair[0][0] {
            #[cfg(test)]
            println!("Overlapping ✅");

            sets_overlapping += 1
        } else {
            #[cfg(test)]
            println!("Not Overlapping ❌");
        }
    }

    Some(sets_overlapping)
}

fn main() {
    let input = &advent_of_code::read_file("inputs", 4);
    advent_of_code::solve!(1, part_one, input);
    advent_of_code::solve!(2, part_two, input);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_one() {
        let input = advent_of_code::read_file("examples", 4);
        assert_eq!(part_one(&input), Some(2));
    }

    #[test]
    fn test_part_two() {
        let input = advent_of_code::read_file("examples", 4);
        assert_eq!(part_two(&input), Some(4));
    }
}
