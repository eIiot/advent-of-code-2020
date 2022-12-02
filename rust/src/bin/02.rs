use std::collections::HashMap;

type Pairs = Vec<Vec<u32>>;

fn parse(input: &str) -> Pairs {
  let score_table: HashMap<String, u32> = HashMap::from([
    ("A".to_string(), 1),
    ("B".to_string(), 2),
    ("C".to_string(), 3),
    ("X".to_string(), 1),
    ("Y".to_string(), 2),
    ("Z".to_string(), 3)
  ]);

  input
    .lines()
    .map(
      |p| p.split(" ")
      .map(|v| match score_table.get(v) {
        Some(&v) => v,
        None => 0
      })
      .collect()
    )
    .collect()
}

pub fn part_one(input: &str) -> Option<u32> {
  let win_loss_table: HashMap<u32, [u32; 2]> = HashMap::from([
    (1, [2, 3]),
    (2, [3, 1]),
    (3, [1, 2]),
  ]);

  let throws = parse(input);

  // for each pair in parsed, check if we win or loose, and add points accordingly

  let mut score = 0;

  for pair in throws.iter() {

    // if we tie, we add 3 points to our score

    if pair[0] == pair[1] {
      score += 3;
    }

     let win_loss_pair: [u32; 2] = match win_loss_table.get(pair.first()?)? {
       [a, b] => [*a, *b]
     }; 

    // if we win, add 6 points to our score

    if pair[1] == win_loss_pair[0] {
      score += 6;
    }

    // if we loose, add 0 points to our score

    if pair[1] == win_loss_pair[1] {
      score += 0;
    }

    // add the 2nd value to the total score

    score += pair[1];
  }

  Some(score)
}

pub fn part_two(input: &str) -> Option<u32> {
  let win_loss_table: HashMap<u32, [u32; 2]> = HashMap::from([
    (1, [2, 3]),
    (2, [3, 1]),
    (3, [1, 2]),
  ]);

  let throws = parse(input);

  // for each pair in parsed, check if we win or loose, and add points accordingly

  let mut score = 0;

  for pair in throws.iter() {

    // if we need to loose
    if pair[1] == 1  {
      let pair_needed = match win_loss_table.get(pair.first()?)? {
          [a, b] => [*a, *b]
      }; 

      score += pair_needed[1];
    }

    // if we need to draw

    if pair[1] == 2 {
      score += pair[0] + 3
    }

    // if we need to win
    if pair[1] == 3  {
      let pair_needed = match win_loss_table.get(pair.first()?)? {
          [a, b] => [*a, *b]
      }; 

      score += pair_needed[0] + 6;
    }

  }

  Some(score)
}

fn main() {
    let input = &advent_of_code::read_file("inputs", 2);
    advent_of_code::solve!(1, part_one, input);
    advent_of_code::solve!(2, part_two, input);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_one() {
        let input = advent_of_code::read_file("examples", 2);
        assert_eq!(part_one(&input), Some(15));
    }

    #[test]
    fn test_part_two() {
        let input = advent_of_code::read_file("examples", 2);
        assert_eq!(part_two(&input), Some(12));
    }
}
