import {Box} from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Header = () => <Box>
    <Link href="/">
        <Image src="/logo.svg" height={100} width={400}/>
    </Link>
</Box>
