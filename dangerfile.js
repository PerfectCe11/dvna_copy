const fs = require("fs");
const { fail, warn, message } = require("danger");

if (!fs.existsSync("eslint-results.json")) {
  fail("Security scan did not generate results. Build is unsafe.");
  process.exit(1);
}

const results = JSON.parse(
  fs.readFileSync("eslint-results.json", "utf8")
);

let errors = 0;
let warnings = 0;

results.forEach(file => {
  file.messages.forEach(issue => {
    const msg = `${file.filePath}:${issue.line}:${issue.column} → ${issue.message}`;

    if (issue.severity === 2) {
      errors++;
      fail(`❌ XSS/Security Error: ${msg}`);
    } else {
      warnings++;
      warn(`⚠️ Security Warning: ${msg}`);
    }
  });
});

if (errors === 0) {
  message("✅ No React XSS vulnerabilities found in full codebase scan.");
} else {
  fail(`❌ ${errors} critical React XSS issues detected. PR is blocked.`);
}
