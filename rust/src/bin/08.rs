use array2d::Array2D;

fn parse (input: &str) -> Array2D<i32> {

    // get length of first line and number of lines

    let lines = input.lines().count();

    let rows = input.lines().clone().next().unwrap().len();

    let mut stacks = Array2D::filled_with(0, lines, rows);

    for (i, line) in input.lines().enumerate() {
        for (j, num) in line.chars().enumerate() {
            let number = num.to_digit(10);
            let number = number.map(|n| n as i32);

            match number {
                Some(n) => stacks[(i, j)] = n,
                None => continue,
            }
        }
    }

    stacks
}

pub fn part_one(input: &str) -> Option<u32> {
    let stacks = parse(input);

    #[cfg(test)]
    println!("{:?}", stacks);

    // get last visible item for each row starting from the top. An item is visible if the item before it is smaller

    let mut visible: Vec<String> = vec![];

    // top
    for (i, row) in stacks.as_rows().iter().enumerate() {
        let mut last_visible: i32 = -1;

        for (j, item) in row.iter().enumerate() {
            
            if item > &last_visible {
                last_visible = *item;
                visible.push("".to_string() + &i.to_string() + "," + &j.to_string())
            }
        }
    }

    // bottom

    for (i, row) in stacks.as_rows().iter().enumerate() {
        let mut last_visible: i32 = -1;

        for (j, item) in row.iter().rev().enumerate() {
            let index = row.len() - j - 1;

            if item > &last_visible {
                last_visible = *item;
                visible.push("".to_string() + &i.to_string() + "," + &index.to_string())
            }
        }
    }

    // left

    for (j, col) in stacks.as_columns().iter().enumerate() {
        let mut last_visible: i32 = -1;

        for (i, item) in col.iter().enumerate() {
            if item > &last_visible {
                last_visible = *item;
                visible.push("".to_string() + &i.to_string() + "," + &j.to_string())
            }
        }

    }

    // right

    for (j, col) in stacks.as_columns().iter().enumerate() {
        let mut last_visible: i32 = -1;

        for (i, item) in col.iter().rev().enumerate() {
            let index = col.len() - i - 1;

            if item > &last_visible {
                last_visible = *item;
                visible.push("".to_string() + &index.to_string() + "," + &j.to_string())
            }
        }

    }

    // remove duplicates

    visible.sort();

    visible.dedup();

    #[cfg(test)]
    println!("{:?}", visible);

    Some(visible.len() as u32)
}

pub fn part_two(input: &str) -> Option<u32> {
    let stacks = parse(input);

    // loop through each item

    let mut largest_senic_score = 0;

    for i in 1..(stacks.num_rows() - 1) {

        for j in 1..(stacks.num_columns() - 1) {

            // get the item

            let item = stacks[(i, j)];

            #[cfg(test)]
            println!("item value: {} at {}, {}", item, i, j);

            // see how many items are smaller before hitting a larger item above

            let mut can_see_above = 0;

            // from the current item to the top

            for k in (0..i).rev() {
                #[cfg(test)]
                println!("checking item: {} at {}, {}", stacks[(k, j)], k, j);

                can_see_above += 1;

                if stacks[(k, j)] >= item {
                    #[cfg(test)]
                    println!("larger");
                    break;
                }
            }

            let mut can_see_below = 0;

            for k in i+1..stacks.num_rows() {
                #[cfg(test)]
                println!("checking item: {} at {}, {}", stacks[(k, j)], k, j);

                can_see_below += 1;

                if stacks[(k, j)] >= item {
                    #[cfg(test)]
                    println!("larger");
                    break;
                }
            }

            let mut can_see_left = 0;

            for k in (0..j).rev() {
                #[cfg(test)]
                println!("checking item: {} at {}, {}", stacks[(i, k)], i, k);

                can_see_left += 1;

                if stacks[(i, k)] >= item {
                    #[cfg(test)]
                    println!("larger");
                    break;
                }
            }

            let mut can_see_right = 0;

            for k in j+1..stacks.num_columns() {
                #[cfg(test)]
                println!("checking item: {} at {}, {}", stacks[(i, k)], i, k);
                
                can_see_right += 1;

                if stacks[(i, k)] >= item {
                    #[cfg(test)]
                    println!("larger");
                    break;
                }
            }

            let senic_score = can_see_above * can_see_below * can_see_left * can_see_right;

            #[cfg(test)]
            println!("senic score: {}", senic_score);

            if senic_score > largest_senic_score {
                largest_senic_score = senic_score;
            }

        }

    }

    Some(largest_senic_score as u32)
}

fn main() {
    let input = &advent_of_code::read_file("inputs", 8);
    advent_of_code::solve!(1, part_one, input);
    advent_of_code::solve!(2, part_two, input);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_one() {
        let input = advent_of_code::read_file("examples", 8);
        assert_eq!(part_one(&input), Some(21));
    }

    #[test]
    fn test_part_two() {
        let input = advent_of_code::read_file("examples", 8);
        assert_eq!(part_two(&input), Some(8));
    }
}
