import { mergeStyles } from "@fluentui/react";

export const SignInButtonClass = (w: number): string => mergeStyles({
    width: w > 1000 ? '30vw' : '80vw',
    display: 'flex',
});