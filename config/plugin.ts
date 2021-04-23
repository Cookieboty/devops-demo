import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  helper: {
    enable: true,
    package: 'egg-helper',
  },
};

export default plugin;
