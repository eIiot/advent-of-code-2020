use std::collections::HashMap;

type Directory = HashMap<String, EitherValueOrDir>;

#[derive(Debug)]
enum EitherValueOrDir {
    Dir(Directory),
    Value(String),
}

fn insert_into_nested_map(
    map: &mut Directory,
    path: Vec<String>,
    value: (String, EitherValueOrDir),
) {
    // Navigate to the nested map by using the `.get()` method
    // to retrieve the nested `Directory` value at each level
    // of the path.
    let mut current_dir = map;
    
    for p in path {
        current_dir = match current_dir.get_mut(&p) {
            Some(EitherValueOrDir::Dir(dir)) => dir,
            _ => return, // Return early if the path is invalid
        }
    }
    
    let (name, item) = value;

    // Once we have navigated to the nested map, we can insert the
    // value into the map using the `insert()` method.

    // if the key already exists, and the value is a directory, ignore the new value
    if let Some(EitherValueOrDir::Dir(_)) = current_dir.get(&name) {
        return;
    }

    current_dir.insert(name, item);
}

fn sum_dir_sizes(map: &Directory, total: &mut u32) -> u32 {
    // Use the `values()` method to iterate over the values in the map.
    let mut dir_size = 0;
    
    for val in map.values() {
        // If the value is a `Value`, we can get its size using the
        // `parse()` method.
        if let EitherValueOrDir::Value(size) = val {
            dir_size += size.parse::<u32>().unwrap_or(0);
        }

        // If the value is a `Dir`, we can recursively call the
        // `sum_value_sizes()` function to get the total size of
        // the nested directory and add it to the total size.
        else if let EitherValueOrDir::Dir(dir) = val {
            dir_size += sum_dir_sizes(dir, total);
        }
    }

    if dir_size < 100000 {
        *total += dir_size;
    }

    dir_size
}

fn sum_dir_sizes_with_space(map: &Directory, dir_that_works: &mut u32, space_needed: u32) -> u32 {
    // Use the `values()` method to iterate over the values in the map.
    let mut dir_size = 0;
    
    for val in map.values() {
        // If the value is a `Value`, we can get its size using the
        // `parse()` method.
        if let EitherValueOrDir::Value(size) = val {
            dir_size += size.parse::<u32>().unwrap_or(0);
        }

        // If the value is a `Dir`, we can recursively call the
        // `sum_value_sizes()` function to get the total size of
        // the nested directory and add it to the total size.
        else if let EitherValueOrDir::Dir(dir) = val {
            dir_size += sum_dir_sizes_with_space(dir, dir_that_works, space_needed);
        }
    }

    #[allow(clippy::collapsible_if)]
    if dir_size > space_needed {
        #[cfg(test)]
        println!("{} is bigger than the space needed", dir_size);

        if (dir_that_works == &0) || (dir_size < *dir_that_works) {
            *dir_that_works = dir_size;
        }
    }

    dir_size
}

fn parse(input: &str) -> Directory {
    let lines: Vec<Vec<&str>> = input.lines().map(|line| line.split(' ').collect()).collect();
    
    let mut file_system: Directory = HashMap::new();

    let mut current_dir: Vec<String> = vec![];

    // the current directory is represented as a stack, where each next element is the directory above

    for line in lines {
        
            if line[0] == "$" {
                // this is code that has been executed by the user

                match line[1] {
                    "cd" => {

                       match line[2] {
                            ".." => {
                                if !current_dir.is_empty() {
                                    current_dir.pop();
                                }
                            }
                            "/" => {
                                current_dir = vec![];
                            }
                            _ => {
                                current_dir.push(line[2].to_string());
                            }
                       }

                    }
                    "ls" => {
                        // we don't really have to do anything here, for now 
                    }
                    _ => {
                        // this is some other command. Throw an error

                        panic!("Unknown command")
                    }
                }

            } else {

                match line[0] {
                    "dir" => {
                        insert_into_nested_map(&mut file_system, current_dir.clone(), (line[1].to_string(), EitherValueOrDir::Dir(HashMap::new())));
                    }
                    _ => {
                        // this is a file
                        insert_into_nested_map(&mut file_system, current_dir.clone(), (line[1].to_string(), EitherValueOrDir::Value(line[0].to_string())));
                    }
                }
            }
    }

    file_system
}

pub fn part_one(input: &str) -> Option<u32> {
    let directory = parse(input);

    let mut total = 0;

    sum_dir_sizes(&directory, &mut total);

    #[cfg(test)]
    println!("{:?}", directory);

    Some(total) 
}

pub fn part_two(input: &str) -> Option<u32> {
    let directory = parse(input);

    let mut total = 0;

    let mut dir_that_works = 0;

    let total_used_space = sum_dir_sizes(&directory, &mut total);

    let unused_space = 70000000 - total_used_space;

    let space_needed = 30000000 - unused_space;

    sum_dir_sizes_with_space(&directory, &mut dir_that_works, space_needed);

    #[cfg(test)]
    println!("Space Needed: {:?}", space_needed);
    
    Some(dir_that_works) 
}

fn main() {
    let input = &advent_of_code::read_file("inputs", 7);
    advent_of_code::solve!(1, part_one, input);
    advent_of_code::solve!(2, part_two, input);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_one() {
        let input = advent_of_code::read_file("examples", 7);
        assert_eq!(part_one(&input), Some(95437));
    }

    #[test]
    fn test_part_two() {
        let input = advent_of_code::read_file("examples", 7);
        assert_eq!(part_two(&input), Some(24933642));
    }
}
