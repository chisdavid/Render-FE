import React from "react";

export const BoxStyle: React.CSSProperties = {
    maxWidth: '85vw',
    maxHeight: '85vh',
    position: 'absolute',
    height: "50%",
    top: '80px',
    left: window.innerWidth > 1000 ? '250px' : '80px',
    width: '80%'
};

export const StatusDivStyle = (status: any): React.CSSProperties => {
    return {
        borderRadius: '100px',
        borderStyle: 'solid',
        borderColor: status === 'Online' ? 'green' : 'red',
        width: "80px",
        height: '35px',
        display: 'flex',
        justifyContent: 'center'
    }
};

export const IconStyle = (status: any): React.CSSProperties => {
    return {
        color: status === 'Online' ? 'green' : 'red',
        position: "relative",
        top: "2px"
    }
};