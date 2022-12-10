use std::collections::HashMap;

fn parse(input: &str) -> Vec<(&str, i32)> {
    fn dirify(dir: &str) -> &str {
        match dir {
            "R" | "L" => "x",
            "U" | "D" => "y",
            _ => panic!("Unknown Direction")
        }
    }

    fn vectorify(n: i32, dir: &str) -> i32 {
        match dir {
            "R" | "U" => n,
            "L" | "D" => -n,
            _ => panic!("Unknown Direction")
        }
    }


    input
        .lines()
        .map(|line| {
            let split: Vec<&str> = line.split(" ").collect();

            (dirify(split[0]), vectorify(split[1].parse::<i32>().unwrap(), split[0]))
        })
        .collect()
}

#[derive(Copy, Clone, Debug)]
struct Point {
    x: i32,
    y: i32,
}

fn render_head_tail(head: &Point, tail: &Point, size: usize) {
    let mut canvas: Vec<Vec<&str>> = vec![vec!["."; size]; size];

    canvas[head.y as usize][head.x as usize] = "H";
    canvas[tail.y as usize][tail.x as usize] = "T";

    for row in canvas.iter().rev() {
        println!("{}", row.join(""));
    }

    println!("");
}

fn render_rope(knots: &Vec<Point>, size: usize) {
    let mut canvas: Vec<Vec<String>> = vec![vec![".".to_string(); size]; size];

    for (i, knot) in knots.iter().enumerate() {
        let index_string = i.to_string();
        canvas[knot.y as usize][knot.x as usize] = index_string;
    }

    for row in canvas.iter().rev() {
        println!("{}", row.join(""));
    }

    println!("");
}

type _InstructionPair<'a> = (&'a str, i32);

impl Point {
    pub fn travel(&mut self, dir: &str, dst: i32) {
        match dir {
            "x" => self.x += dst,
            "y" => self.y += dst,
            _ => panic!("Unknown Direction")
        }

        // #[cfg(test)]
        // println!("Travelled to {},{}.\nInstruction: {} {}", self.x, self.y, dir, dst);
    }

    pub fn move_one_towards_point(&mut self, point: Point) {
       let x_diff = point.x - self.x;
       let y_diff = point.y - self.y;

       if x_diff.abs() != 0 && y_diff != 0 {
            // items are in different columns and different rows
           
            // travel 1 towards the pos

            if !(y_diff.abs() == 1 &&  x_diff.abs() == 1) {
               
                let (x_dir, y_dir) = (x_diff/x_diff.abs(), y_diff / y_diff.abs());

                self.travel("x", x_dir);
                self.travel("y", y_dir);
            }
            
       } else {
            // items are in at least one column and one row, and can move normally

            if x_diff > 1 || x_diff < -1 {
                self.travel("x", x_diff - (x_diff/x_diff.abs()))
            } else if y_diff > 1 || y_diff < -1 {
                self.travel("y", y_diff - (y_diff/y_diff.abs()))
            }
       }
    }
}


pub fn part_one(input: &str) -> Option<u32> {
    let instructions = parse(input);

    #[cfg(test)]
    println!("{:?}", instructions);

    let mut head = Point { x: 0, y: 0 };

    let mut tail = Point { x: 0, y: 0 };
    
    let mut tail_visited: Vec<String> = vec![];

    for (dir, dst) in instructions {
        #[cfg(test)]
        println!("Instuction: move {} on the {} axis", dst, dir);

        for _ in 0..dst.abs() {
            head.travel(dir, dst/dst.abs());
            #[cfg(test)]
            render_head_tail(&head, &tail, 10);
            tail.move_one_towards_point(head);
            tail_visited.push("".to_string() + &tail.x.to_string() + "," + &tail.y.to_string());
            #[cfg(test)]
            render_head_tail(&head, &tail, 10);
        }
    }
    
    tail_visited.sort();

    tail_visited.dedup();

    #[cfg(test)]
    println!("{:?}", tail_visited);

    #[cfg(test)]
    println!("{},{}", &tail.x, &tail.y);

    Some(tail_visited.len() as u32)
}

pub fn part_two(input: &str) -> Option<u32> {
    let instructions = parse(input);

    #[cfg(test)]
    println!("{:?}", instructions);

    // let mut head = Point { x: 0, y: 0 };

    // let mut tail = Point { x: 0, y: 0 };

    let mut knots = (0..10).map(|_| Point { x: 0, y: 0 }).collect::<Vec<Point>>();

    #[cfg(test)]
    println!("{:?}", knots);
    
    let mut tail_visited: Vec<String> = vec![];

    for (dir, dst) in instructions {
        #[cfg(test)]
        println!("Instuction: move {} on the {} axis", dst, dir);

            for _ in 0..dst.abs() {

                for i in 1..knots.len() {

                    if i == 1 {
                        knots[i - 1].travel(dir, dst/dst.abs());
                    }

                    let knots_i_1 = knots[i - 1].clone();

                    // println!("{}: {:?} -> {:?}", i, &knots[i - 1], &knots[i]);

                    knots[i].move_one_towards_point(knots_i_1);

                    if i + 1 == knots.len() {
                        tail_visited.push("".to_string() + &knots[i].x.to_string() + "," + &knots[i].y.to_string());
                    }
                }
            }


        #[cfg(test)]
        println!("{:?}", knots);
        // render_rope(&knots, 35);
    }
    
    tail_visited.sort();

    tail_visited.dedup();

    #[cfg(test)]
    println!("{:?}", tail_visited); // missing 2,2

    Some((tail_visited.len()) as u32)
}

fn main() {
    let input = &advent_of_code::read_file("inputs", 9);
    advent_of_code::solve!(1, part_one, input);
    advent_of_code::solve!(2, part_two, input);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_one() {
        let input = advent_of_code::read_file("examples", 9);
        assert_eq!(part_one(&input), Some(13));
    }

    #[test]
    fn test_part_two() {
        let input = advent_of_code::read_file("examples", 9);
        assert_eq!(part_two(&input), Some(36));
    }
}
