/*
 * Use this file if you want to extract helpers from your solutions.
 * Example import from this file: `use advent_of_code::helpers::example_fn;`.
 */

pub fn grouped_lines(input: &str, n: u32) -> Vec<Vec<&str>> {
    input.lines()
        .collect::<Vec<&str>>()
        .chunks(n as usize)
        .map(|chunk| chunk.to_vec())
        .collect()
}