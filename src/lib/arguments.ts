import * as argparse from "argparse";

const parser = new argparse.ArgumentParser({
  description: "Get job links for a specified role in Medellin.",
});

parser.add_argument("-r", "--role", {
  dest: "role",
  required: true,
  help: "the role to search for",
});
parser.add_argument("-p", "--pages", {
  dest: "pages",
  required: false,
  help: "the number of pages to retrieve",
  default: 1,
});
parser.add_argument("-m", "--min-length", {
  dest: "min_length",
  required: false,
  help: "The minimum length of the search term on technology detection",
  default: 4,
});
parser.add_argument("-M", "--max-distance", {
  dest: "max_distance",
  required: false,
  help: "The maximum distance of the search term on technology detection",
  default: 2,
});
parser.add_argument("-o", "--output", {
  dest: "output",
  required: false,
  help: "the path to output directory",
  default: "../out/",
});
parser.add_argument("-v", "--verbose", {
  dest: "verbose",
  action: "store_true",
  help: "verbose mode",
});

const args = parser.parse_args();

export const { role, pages, output, verbose, min_length, max_distance } = args;
