module.exports = {
  git: {
    tag: true,
    tagName: "v${version}",
    requireCleanWorkingDir: false,
    commit: true,
    commitMessage: "🚀 release: 新版本 react-idb-toolkit ${version} 发布！",
    push: true,
    pushArgs: ["--follow-tags"],
    requireUpstream: true,
    addUntrackedFiles: true,
  },
  npm: {
    publish: true, // 发布到 npm
    tag: "latest", // 默认使用 latest 标签
    // 若使用私有 npm，可设置 registry: 'https://registry.npmjs.org'
  },
  hooks: {
    "after:release": "echo ✅ 发布成功!",
  },
};
