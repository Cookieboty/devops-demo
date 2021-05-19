// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportBranch from '../../../app/controller/branch';
import ExportBuild from '../../../app/controller/build';
import ExportProject from '../../../app/controller/project';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    branch: ExportBranch;
    build: ExportBuild;
    project: ExportProject;
    user: ExportUser;
  }
}
