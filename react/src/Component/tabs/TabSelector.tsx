import * as React from "react";

export const TabSelector = ({
    isActive,
    children,
    onClick,
}: {
    isActive: boolean;
    children: React.ReactNode;
    onClick: () => void;
}) => (
    <button className={` ${isActive ? "active" : ""}`} onClick={onClick}>
        {children}
    </button>
);
