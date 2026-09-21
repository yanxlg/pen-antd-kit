export function defaultRepo() {
  return process.env.PEN_ANTD_REPO || "yanxlg/pen-antd-kit";
}

export function githubChannelUrl(repo) {
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo)) {
    throw new Error(`Invalid GitHub repository: ${repo} (expected owner/repository)`);
  }
  return `https://github.com/${repo}/releases/latest/download/channel-stable.json`;
}
