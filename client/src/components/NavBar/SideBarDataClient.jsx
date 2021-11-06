import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export const SidebarDataClient = [
  {
    title: 'Painel',
    path: '/PainelControle',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Compras',
    path: '/HistoryCompra',
    icon: <FaIcons.FaShoppingBasket />,
    cName: 'nav-text'
  }
];