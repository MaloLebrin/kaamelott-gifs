
import { seasonOne } from "~/server/data/episodes/seasonOne"
import { seasonTwo } from "~/server/data/episodes/seasonTwo";
import { seasonThree } from "~/server/data/episodes/seasonThree";
import { seasonFour } from "~/server/data/episodes/seasonFour";
import { SeedEpisode } from "~/server/data/episodes/index";

export const episodes: SeedEpisode[] = [
  ...seasonOne, // 100 épisodes
  ...seasonTwo, // 100 épisodes
  ...seasonThree, // 100 épisodes
  ...seasonFour, // 100 épisodes
];
