import YunButton from "./components/button";
import YunIcon from "./components/icon";
import config from "../package.json";

const version = config.version; // version_ to fix tsc issue

const components = [YunButton, YunIcon];

const install = function(app, options = {}) {
  components.forEach((component) => {
    app.use(component);
  });
  return app;
};

export { YunButton, YunIcon };

export default {
  version,
  install,
};
