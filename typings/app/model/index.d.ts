// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBranch from '../../../app/model/branch';
import ExportProcess from '../../../app/model/process';
import ExportProject from '../../../app/model/project';
import ExportTestRecord from '../../../app/model/testRecord';
import ExportUser from '../../../app/model/user';
import ExportWorkflowTpl from '../../../app/model/workflowTpl';

declare module 'egg' {
  interface IModel {
    Branch: ReturnType<typeof ExportBranch>;
    Process: ReturnType<typeof ExportProcess>;
    Project: ReturnType<typeof ExportProject>;
    TestRecord: ReturnType<typeof ExportTestRecord>;
    User: ReturnType<typeof ExportUser>;
    WorkflowTpl: ReturnType<typeof ExportWorkflowTpl>;
  }
}
