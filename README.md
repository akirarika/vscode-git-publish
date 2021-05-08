# vscode-git-publish

一个用于简化 Git 发布版本的 VS Code 插件，通常用于和 [Github Actions](https://docs.github.com/cn/actions/learn-github-actions)、[Coding](https://coding.net/) 等基于 Git 的 CI/CD 方案配合。

它的用途是一键将当前项目的更改，添加并提交到指定的分支、推送到远程、再将分支切换回来。你还可以编写一个 `.sh` 脚本，在提交新版本之前执行 (想要在之后执行，你可以使用 Hooks)。

注：如果你正在使用 `Windows` 系统，请将默认终端修改为 `bash` (Git for Windows 会自带)。

## 使用

1. [安装](https://github.com/akirarika/vscode-git-publish/releases/tag/v0.0.1) 本 VS Code 插件 (暂未上架官方扩展商店)。

2. 在你的项目根目录创建一个 `.publ` 目录。

3. 在其内部创建，与你要发布的分支同名的 `.sh` 文件。如：

```bash
$ ls ./.publ
master.sh
develop.sh
gh-pages.sh
```

4. 点击 VS Code 右上角的 `⚓` 图标，里面会列出你的所有分支 (根据 `./.publ` 下的文件)。在选择了要提交的分支、和写好 commit 后，程序会先执行与你分支同名的 `.sh` 文件，再将你所有修改的文件添加、提交到你**当前的分支**和**你所选的分支**，并推送到远程。完成后，会切换回原分支。

## Todo

- [ ] 可自定义默认 `commit` 文案，和限制 `commit` 的格式。

- [ ] 兼容 Powershell (但这样，脚本就不能跨平台了呀)。
