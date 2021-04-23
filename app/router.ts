import { Application } from 'egg';

// export default (app: Application) => {
//   const { controller, router } = app;

//   router.post('/', controller.home.index);
// };

import { EggShell } from 'egg-shell-decorators';

export default (app: Application) => {
  EggShell(app);
};
