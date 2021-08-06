import YunButton from "./components/button";
import YunIcon from "./components/icon";
import YunAlert from "./components/alert";
import config from "../package.json";

const version = config.version; // version_ to fix tsc issue

const components = [YunButton, YunIcon, YunAlert];

const install = function(app, options = {}) {
  components.forEach((component) => {
    app.use(component);
  });
  return app;
};

export { YunButton, YunIcon, YunAlert };

export default {
  version,
  install,
};
