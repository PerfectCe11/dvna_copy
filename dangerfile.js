import { message, warn, danger } from "danger";

const hasChangelog = danger.git.modified_files.includes("CHANGELOG.md");
if (!hasChangelog) {
  warn("Please add a CHANGELOG entry for your changes.");
}

if (danger.github.pr.additions > 500) {
  warn("This Pull Request seems quite large. Please consider breaking it up.");
}