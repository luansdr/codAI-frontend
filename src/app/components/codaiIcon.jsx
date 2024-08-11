import React from "react";
import Link from "next/link";

export const CodaiIcon = () => (

    <div>
        <Link href="/" passHref>
            <GradientText>CodAI</GradientText>
        </Link>
    </div>



);

const GradientText = ({ children }) => (
    <span className="gradient-text-logo">{children}</span>
)
