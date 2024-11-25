'use client'

import ProdutoGrid from "@/components/ProdutoGrid";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";


export default function Page() {
    const [produtos, setProdutos] = useState([]);

    const atualizarProdutos = async () => {
        const token = Cookies.get('token');

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/produtos`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            setProdutos(response.data);
        } else {
            alert('Erro ao buscar produtos');
        }
    };

    useEffect(() => {
        atualizarProdutos();
    }, []);

    return (
        <div className="max-h-screen w-full flex items-center justify-center">
            {produtos.length > 0 ? <ProdutoGrid produtos={produtos} /> : <p>Nenhum produto cadastrado</p>}
        </div>
    );
}