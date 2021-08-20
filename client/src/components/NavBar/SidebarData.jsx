import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/Dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'User',
    path: '/Listuser',
    icon: <FaIcons.FaUserAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Produto',
    path: '/Produto',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Vender',
    path: '/Produto',
    icon: <FaIcons.FaShoppingBasket />,
    cName: 'nav-text'
  },
  {
    title: 'Calendário',
    path: '/Calendar',
    icon: <FaIcons.FaCalendarAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Histório de Produto',
    path: '/Calendar',
    icon: <FaIcons.FaHistory />,
    cName: 'nav-text'
  },
  {
    title: 'Histório de Venda',
    path: '/Calendar',
    icon: <FaIcons.FaHistory />,
    cName: 'nav-text'
  },
];