import React from "react"
import { DirectionalHint, TeachingBubble} from "@fluentui/react";
import { IInfoBubbleProps } from "./infoBubble.types";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { contentInfoBubbleStyle } from "./infoBubble.styles";
import { useBoolean, useId } from "@fluentui/react-hooks";

export const InfoBubble = (props: IInfoBubbleProps): JSX.Element => {
    const buttonId = useId('Id');
    const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] = useBoolean(false);

    return (<div>
        <InfoOutlinedIcon id={buttonId} onClick={toggleTeachingBubbleVisible} />

        {teachingBubbleVisible && (
            <TeachingBubble
                styles={contentInfoBubbleStyle}
                calloutProps={{ directionalHint: DirectionalHint.rightCenter }}
                target={`#${buttonId}`}
                isWide={true}
                onDismiss={toggleTeachingBubbleVisible}
            >
                {props.message}
            </TeachingBubble>
        )}
    </div>)
}