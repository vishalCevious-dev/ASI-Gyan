// Import warning suppression first
import "./config/warningSuppression";

import app from "src/app";
import EnvSecret from "src/constants/envVariables";

const port = EnvSecret.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
