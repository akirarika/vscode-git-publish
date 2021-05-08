import { execSync } from "child_process";
import { statSync, existsSync } from "fs";
import { ExtensionContext, commands, workspace, window } from "vscode";
import {
  getWorkspace,
  readFileContentToArray,
  readDirChildFile,
  isDir,
} from "./helpers";

export function activate(context: ExtensionContext) {
  let disposable = commands.registerCommand(
    "vscode-git-publish.main",
    async () => {
      const workspace = await getWorkspace();

      if (!workspace) return;

      if (!existsSync(workspace.uri.fsPath + "/.publ"))
        return await window.showErrorMessage(
          "当前项目下不存在 .publ 目录，无法发布"
        );

      const branchScriptPathArray: string[] = readDirChildFile(
        workspace.uri.fsPath + "/.publ"
      ).filter((path) => /.*\.sh/.test(path));

      if (!branchScriptPathArray.length)
        return await window.showErrorMessage(
          '.publ 目录下必须至少有一个文件，如"master.sh"'
        );

      const branchArray: string[] = branchScriptPathArray.map((path) =>
        path.replace(/.*\\|\..*$/g, "")
      );

      const branch = await window.showQuickPick(
        ["<取消发布>", ...branchArray],
        {
          placeHolder: "请选择要发布的版本分支",
        }
      );
      if (!branch || "<取消发布>" === branch) return;

      const commit = await window.showInputBox({
        value: "update",
        placeHolder: "请输入要提交的 commit 信息",
        prompt: "请输入要提交的 commit 信息",
      });
      if (!commit) return;

      const lasthBranch = execSync("git symbolic-ref --short -q HEAD", {
        cwd: workspace.uri.fsPath,
      })
        .toString()
        .replace(/^\s*|\s*$/g, "");

      const terminal = window.createTerminal(
        "git-publish",
        "win32" === process.platform ? void 0 : "/bin/bash"
      );
      terminal.show();
      terminal.sendText(
        [
          'echo "Starting.."',
          'bash "' +
            branchScriptPathArray[branchArray.findIndex((b) => b === branch)] +
            '"',
          'git checkout "' + lasthBranch + '"',
          "git add --all",
          'git commit -m "' + commit + '" || true',
          'git push -u origin "' + lasthBranch + '"',
          'git branch "' + branch + '" || true',
          'git checkout "' + branch + '"',
          'git merge "' + lasthBranch + '"',
          'git push -u origin "' + branch + '"',
          'git checkout "' + lasthBranch + '"',
          'echo "press Enter to abort."',
          "read exit",
          "exit 0",
        ].join(" && ")
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
