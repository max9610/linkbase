import path from "node:path";

const PROTECTED = new Set([".env", ".env.local"]);

const readStdin = async () => {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
};

const input = JSON.parse(await readStdin());
const filePath =
  input.tool_input?.file_path ?? input.tool_input?.notebook_path ?? "";

if (PROTECTED.has(path.basename(filePath))) {
  // Exit code 2 tells Claude Code to block the tool call; stderr is fed back to Claude as the reason.
  console.error(
    `${path.basename(filePath)} is protected. Ask the user before editing it.`,
  );
  process.exit(2);
}

process.exit(0);
