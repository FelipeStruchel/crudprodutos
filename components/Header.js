"use client";

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
        if (pathname !== "/login" && pathname !== "/cadastro") {
            setShowHeader(true);
        } else {
            setShowHeader(false);
        }
    }, [pathname]);

    const handleNavigation = (path) => {
        router.push(path);
    };

    if (!showHeader) return null;

    return (
        <AppBar position="static" sx={{ backgroundColor: '#424242', color: '#fff' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Banana Store
                </Typography>
                <Button color="inherit" onClick={() => handleNavigation('/produtos/novo')} sx={{ color: '#fff' }}>
                    Novo Produto
                </Button>
                <Button color="inherit" onClick={() => handleNavigation('/produtos')} sx={{ color: '#fff' }}>
                    Listar Produtos
                </Button>
            </Toolbar>
        </AppBar>
    );
}