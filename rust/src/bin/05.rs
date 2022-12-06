fn parse(input: &str) -> (Vec<Vec<&str>>, Vec<Vec<u32>>) {
    // figure out how to parse the top part

    let (stacks_str, instructions_str) = input.split_once("\n\n").unwrap();

    // parse stacks

    // regex for three spaces that don't have spaces on either end
    

    let mut raw_stacks: Vec<Vec<&str>> = stacks_str
        .lines()
        .map(|row| row.split("").collect())
        .collect();

    // for each row, remove any of the indexies that do not lie on the line y=2+4x
    // this is kind of a stupid solution but .replace is annyoing so...

    for row in &mut raw_stacks {
        let mut new_row: Vec<&str> = vec![];

        let mut j = 2;

        while j < row.len() {
            new_row.push(row[j]);

            j += 4;
        }

       *row = new_row
    }

    raw_stacks.pop();

    raw_stacks.reverse();

    let mut stacks: Vec<Vec<&str>> = vec![vec![]; raw_stacks[0].len()];

    for row in raw_stacks { 
        
        for j in 0..row.len() {
            let crat = &row[j];

            if crat != &" " {
                stacks[j].push(row[j])
            }
        }
    }

    // parse instructions

     let instructions: Vec<Vec<u32>> = instructions_str.replace("move ", "")
        .replace(" from ", ",")
        .replace(" to ", ",")
        .lines()
        .map(|inst| 
            inst.split(',')
                .map(|n| n.parse::<u32>().unwrap())
                .collect()
        )
        .collect();

    #[cfg(test)]
    println!("{:?}", stacks);

    (stacks, instructions)
}

pub fn part_one(input: &str) -> Option<String> {
    let (stacks, instructions) = parse(input);

    let mut mut_stacks = stacks;

    for instruction in instructions.iter() {
        //         move [0]  from [1]   to [2]
        // num of stacks ^  stack ^  stack ^
        // stacks are n+1 (stack 1 is index 0)

        let move_num: usize = instruction[0].try_into().unwrap();
        let from_index: usize = (instruction[1] - 1).try_into().unwrap();
        let to_index: usize = (instruction[2] - 1).try_into().unwrap();

        #[cfg(test)]
        println!("{:?}", instruction);

        let mut moved: Vec<&str> = vec![];

        for _i in 0..move_num {
            moved.push(mut_stacks[from_index].pop()?);
        }

        for c in moved {
            mut_stacks[to_index].push(c);
        }

        #[cfg(test)]
        println!("{:?}", mut_stacks);
    }

    let mut crates_at_top: Vec<&str> = vec![];

    for stack in mut_stacks {
        let mut mut_stack = stack;

        crates_at_top.push(mut_stack.pop()?);
    }

    #[cfg(test)]
    println!("{:?}", crates_at_top);

    Some(crates_at_top.join(""))
}

pub fn part_two(input: &str) -> Option<String> {
let (stacks, instructions) = parse(input);

    let mut mut_stacks = stacks;

    for instruction in instructions.iter() {
        //         move [0]  from [1]   to [2]
        // num of stacks ^  stack ^  stack ^
        // stacks are n+1 (stack 1 is index 0)

        let move_num: usize = instruction[0].try_into().unwrap();
        let from_index: usize = (instruction[1] - 1).try_into().unwrap();
        let to_index: usize = (instruction[2] - 1).try_into().unwrap();

        #[cfg(test)]
        println!("{:?}", instruction);

        let mut moved: Vec<&str> = vec![];

        for _i in 0..move_num {
            moved.push(mut_stacks[from_index].pop()?);
        }

        moved.reverse();

        for c in moved {
            mut_stacks[to_index].push(c);
        }

        #[cfg(test)]
        println!("{:?}", mut_stacks);
    }

    let mut crates_at_top: Vec<&str> = vec![];

    for stack in mut_stacks {
        let mut mut_stack = stack;

        crates_at_top.push(mut_stack.pop()?);
    }

    #[cfg(test)]
    println!("{:?}", crates_at_top);

    Some(crates_at_top.join(""))
}

fn main() {
    let input = &advent_of_code::read_file("inputs", 5);
    advent_of_code::solve!(1, part_one, input);
    advent_of_code::solve!(2, part_two, input);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_one() {
        let input = advent_of_code::read_file("examples", 5);
        assert_eq!(part_one(&input), Some("CMZ".to_string()));
    }

    #[test]
    fn test_part_two() {
        let input = advent_of_code::read_file("examples", 5);
        assert_eq!(part_two(&input), Some("MCD".to_string()));
    }
}
