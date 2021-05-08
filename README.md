# vscode-git-publish

一个用于简化 Git 发布版本的 VS Code 插件。它的用途是，帮你一键将当前项目的全部更改，添加并提交到指定的分支，推送到远程，完成后再将分支切换回来。

你还可以配置一个前置钩子，在你提交发布代码到指定分支时，先执行任意 `.sh` 脚本。

如果你正在使用 `Windows` 系统，请将默认终端修改为 `bash` (安装 Git for Windows 会自带)。

## 使用

1. [安装](https://github.com/akirarika/vscode-git-publish/releases/tag/v0.0.1)本 VS Code 插件 (暂未上架官方扩展商店)。

2. 在你的项目根目录创建一个 `.publ` 目录。

3. 在其内部创建，与你要发布的分支同名的 `.sh` 文件。如：

```bash
$ ls ./.publ
master.sh
develop.sh
gh-pages.sh
```

4. 点击 VS Code 右上角的 `⚓` 图标，里面会列出你的所有分支 (根据 `./.publ` 下的文件)。在选择了要提交的分支、和写好 commit 后，程序会先执行与你分支同名的 `.sh` 文件，再将你所有修改的文件添加、提交到你**当前的分支**和**你所选的分支**，并推送到远程。完成后，会切换回原分支。
