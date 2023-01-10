## ToDO

1. HOME
    1. Looking okay for now, if want to try a gradient on the large text, may need to add a color: transparent in the globals.css file, for some reason text-opacity isn't working as intended. Read online the issue is where the color of the text is being set, but after playing with that it still was not working as I hoped. However adding color: transparent directly to the element in the console seemed to do it. Essentially you make the text transparent, add the gradient to the background, and then bg-text-clip to show the gradient.
    2. Seems to respond in size well enough
    3. Try out skewing the large text in different directions?
2. SKILLS
    1. Create cloud of svgs with a grid maybe?
    2. Do something with the text blerb.
3. AUDITS
    1. Message for Audits (hopefully one day it will actually contain links or content of completed audits)
4. DAPP
    1. Sort out which smart contract interactions to tap into.
5. COMPONENTS
    1. Create ShowCode component, make it button, and perhaps just have all the code in markdown format to display in a overlayed modal when clicked?
    2. Figure out how to position the ShowCode button in the Header.tsx. Will likely need to rethink spacings at specific sizes... Might even need to increase the min width allowed, cause at 380px its pretty tight on the top bar.
    3. Do I want different colors for the code.svg when toggling light/dark theme? Might be able to achieve this relatively painlessly if use ThemeContext inside the ShowCode.tsx component.

## Added

1. Theme toggling - Remember when changing theme colors, the SVGs need manual updating of their colors if wanting to match.
2. Fonts seem okay... for now.
3. LinkedIn/Github links
4. Side nav slide in and menu icon on small devices.
5. Final positioning/resizing for top nav done. (I think)
