'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import EditaProduto from '@/components/EditaProduto';

export default function Page({ params }) {

    const [produto, setProduto] = useState(null)
    const id = React.use(params).id;

    const getProduto = async () => {

        const token = Cookies.get('token')

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/produtos/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const produtos = response.data;

        const produto = produtos.find(produto => produto._id === id)

        setProduto(produto)
    }

    useEffect(() => {
        if (id) {
            getProduto()
        }
    }, [])

    return (
        <div className="max-h-screen w-full flex items-center justify-center">
            {produto ? (
                <EditaProduto produto={produto} />
            ) : (
                <p>Produto não encontrado</p>
            )}
        </div>
    )
}