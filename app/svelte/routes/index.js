import Home from "./Home.svelte";
import Recruitboard from "./recruit_board.svelte";
import Freeboard from "./free_board.svelte";
import Columnboard from "./column_board.svelte";
import Questionboard from "./question_board.svelte";
import Studyboard from "./study_board.svelte";
import Mainboard from "./main_board.svelte";
import Profile from "./profile.svelte";

export default {
  "/": Home,
  "/mainboard": Mainboard,
  "/recruitboard": Recruitboard,
  "/freeboard": Freeboard,
  "/columnboard": Columnboard,
  "/questionboard": Questionboard,
  "/studyboard": Studyboard,
  "/profile": Profile,
};