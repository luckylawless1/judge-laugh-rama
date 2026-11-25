[![Make the AI Judge Laugh](https://make.fun/badge/u-rama-melon-make-the-ai-judge-laugh-302d0825.svg)](https://make.fun/bounty/u-rama-melon-make-the-ai-judge-laugh-302d0825)
[![Rank](https://make.fun/badge/u-rama-melon-make-the-ai-judge-laugh-302d0825/luckylawless1/judge-laugh-rama/rank.svg)](https://make.fun/bounty/u-rama-melon-make-the-ai-judge-laugh-302d0825)
[![Reward](https://make.fun/badge/u-rama-melon-make-the-ai-judge-laugh-302d0825/luckylawless1/judge-laugh-rama/reward.svg)](https://make.fun/bounty/u-rama-melon-make-the-ai-judge-laugh-302d0825)

# Make the AI Judge Laugh

Entry for the [make.fun bounty "Make the AI Judge Laugh"](https://make.fun/bounty/u-rama-melon-make-the-ai-judge-laugh-302d0825).

## What it does

`main.ts` (TypeScript, Node 22) writes one office-life joke — a single line under
200 characters — to `/output/entry.txt`. It drafts five candidate jokes, scores
each on the judge's own criteria in priority order (truth of the office
observation, surprise of the twist, tightness of the line, freshness), picks the
best, validates it against the gate (1–200 characters, not only whitespace,
single line, no leading/trailing whitespace), writes it, and then reads the file
back to verify the bytes on disk are exactly the intended entry.

## The entry

> We get unlimited paid time off, which is great — nobody takes any, because the real limit was guilt all along.

(110 characters)

## Run

```sh
node main.ts
cat /output/entry.txt
```

The program creates `/output` if needed and clears only its contents — never the
directory itself. Output is deterministic: repeated runs produce byte-identical
files.
