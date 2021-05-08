import { exec } from "child_process";
import { readFileSync, readdirSync, statSync, accessSync, constants } from "fs";
import { workspace, window } from "vscode";
import { join } from "path";

/**
 * 获取工作区
 * 若存在多个工作区，则需用户主动选择
 */
export const getWorkspace = async () => {
  if (void 0 === workspace.workspaceFolders) return;
  if (1 === workspace.workspaceFolders?.length)
    return workspace.workspaceFolders[0];

  const selected = await window.showQuickPick(
    workspace.workspaceFolders.map((item) => item.name)
  );

  return workspace.workspaceFolders.find((item) => item.name === selected);
};

/**
 * 读取文件内容，并转成数组 (按行)
 * @param path
 * @returns
 */
export const readFileContentToArray = (path: string) => {
  return readFileSync(path)
    .toString()
    .replace(/\r\n/g, "\r")
    .replace(/\n/g, "\r")
    .split(/\r/);
};

/**
 * 获取此目录下的文件
 * @param parentPath
 * @returns
 */
export const readDirChildFile = (parentPath: string) => {
  let files = readdirSync(parentPath);
  let filesPath: string[] = [];

  files.forEach((item) => {
    let tempPath = join(parentPath, item);
    let stats = statSync(tempPath);
    if (!stats.isDirectory()) filesPath.push(tempPath);
  });
  return filesPath;
};

export const isDir = (path: string) => {
  try {
    accessSync(path, constants.F_OK);
  } catch (e) {
    return false;
  }
  return true;
};
