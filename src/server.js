import "./setup.js";
import app from "./app.js";

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});
