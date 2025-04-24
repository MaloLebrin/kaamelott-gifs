
import { seasonOne } from "~/server/data/episodes/seasonOne"
import { seasonTwo } from "~/server/data/episodes/seasonTwo";
import { seasonThree } from "~/server/data/episodes/seasonThree";
import { seasonFour } from "~/server/data/episodes/seasonFour";
import { SeedEpisode } from "~/server/data/episodes/index";
import { seasonFive } from "~/server/data/episodes/seasonFive";
import { seasonSix } from "~/server/data/episodes/seasonSix";

export const episodes: SeedEpisode[] = [
  ...seasonOne, // 100 épisodes
  ...seasonTwo,
  ...seasonThree,
  ...seasonFour,
  ...seasonFive,
  ...seasonSix
]
