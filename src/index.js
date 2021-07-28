import YunButton from "./components/button";
import config from "../package.json";

const version = config.version; // version_ to fix tsc issue

const components = [YunButton];
const install = function(app, options = {}) {
  components.forEach((component) => {
    app.use(component);
  });
  return app;
};
export { YunButton };
export default {
  version,
  install,
};
