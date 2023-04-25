## ToDo / Reminders / Notes

1. HOME

    1. Gradients work when adding color:transparent directly in the globals.css
    2. Seems to respond in size well enough up to 280px min width. Zuko image is a bit small, but what can you do at those screen sizes. Competition for space.
    3. Now skewed

2. SKILLS

    1. Skills SVG cloud.
    2. SkillsProvider handling logic / swapping out what skill descriptions to show.

3. AUDITS

    1. General content complete, for now.
    2. Links setup

4. DAPP

    1. XEN and XENFlex contracts setup for local HH node.
    2. Creating my own Web3Provider. Lots of options out there, Web3uiKit, Web3Modal, RainbowKit is nice also, web3-onboard https://github.com/blocknative/web3-onboard seems pretty straight forward and uses gamestop wallet. But they all just do so much more then what I need, or how they operate just seems convoluted for what I intend to do. So this is a good time to learn something new more concretely.
    3. Metamask api / playground https://metamask.github.io/api-playground/api-documentation/
    4. App will auto connect if wallet is connected.
    5. If no wallet is found a different message is displayed.
    6. Position of the wallet modal seems okay.

5. COMPONENTS

    1. CodeOverlayProvider I believe is finished, for now at least until I think some stylings are ugly.
    2. Do I want different colors for the code.svg when toggling light/dark theme? Might be able to achieve this relatively painlessly if use ThemeContext inside the ShowCode.tsx component.
    3. CCThemeIcon added, with spin animation on click, toggleTheme is called onAnimationEnd attribute in CCThemeIcon
    4. CCButton created and implemented.
    5. CCMenuIcon.tsx created, SVG animates when Menu is open/closed.

6. SCRIPTS

    1. CreateCodeSnippets - This is used when a new .md file is added to public/md. Generates code snippets that will be styled (to some degree at least) by CSS in the code overlay.

7. GENERAL

    1. Min width for screen is set to 280px, anything below that will likely have some breaking points.
