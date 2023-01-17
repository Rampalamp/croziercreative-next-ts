## ToDo / Reminders / Notes

1. HOME
    1. Gradients work when adding color:transparent directly in the globals.css
    2. Seems to respond in size well enough
    3. Now skewed
2. SKILLS
    1. Create cloud of svgs with a grid maybe?
    2. Do something with the text blerb.
3. AUDITS
    1. Message for Audits (hopefully one day it will actually contain links or content of completed audits)
4. DAPP
    1. Sort out which smart contract interactions to tap into.
5. COMPONENTS

    1. Finish up CodeOverlayProvider. Code content is properly contained now, and gets applied styles through a script provided by google https://github.com/googlearchive/code-prettify. Need to now do the same and setup how to choose which code is shown depending which instance of code button is clicked. Figure out how to make copy text function work.
    2. Do I want different colors for the code.svg when toggling light/dark theme? Might be able to achieve this relatively painlessly if use ThemeContext inside the ShowCode.tsx component.
    3. For Header.tsx consider how tailwindcss has their header setup. transparent with a blur, and it takes the background of the underlying. Gets a deeper shade as soon as a scroll occurs.?

6. SCRIPTS
    1. Make CreateCodeSnippets.ts more dynamic so that it makes the constants name unqiue depending which .md is being processed. Likely need to make a key/value mapping then just for each through it. Make the constant names the Key, and build out one giant string to write to the file in the loop and do one write after the loop is finished.
