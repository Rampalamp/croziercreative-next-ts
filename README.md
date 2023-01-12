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
    1. Finish up CodeOverlayProvider, looks like most of it is coming together pretty well. Just need to define the readable text area, then figure out the best way to drop some markdown into it. Also need to add an Exit (X) button so because the buttons become unusable when overlay is shown.
    2. Do I want different colors for the code.svg when toggling light/dark theme? Might be able to achieve this relatively painlessly if use ThemeContext inside the ShowCode.tsx component.
    3. For Header.tsx consider how tailwindcss has their header setup. transparent with a blur, and it takes the background of the underlying. Gets a deeper shade as soon as a scroll occurs.?
