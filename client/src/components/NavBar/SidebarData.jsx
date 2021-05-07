import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'User',
    path: '/User',
    icon: <FaIcons.FaUserAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Produto',
    path: '/product',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
];