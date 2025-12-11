import clsx, { ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const classNames = extendTailwindMerge({
  extend: {
    // Allow bg-color utilities and bg-gradient utilities to coexist
    classGroups: {
      'bg-image': [{ 'bg-gradient': [ 'to-t', 'to-tr', 'to-r', 'to-br', 'to-b', 'to-bl', 'to-l', 'to-tl', 'from', 'via', 'to' ] }],
      // Remove the default merge group for 'bg', allowing combinations like 'bg-red-500 bg-gradient-to-b'
      // by putting 'bg' as its own custom group without conflict with 'background-image'
      'bg-color': ['bg'],
    },
    conflictingClassGroups: {
      // Remove the default conflict between 'background-color' and 'background-image'
      // This way, 'bg-red-500' and 'bg-gradient-to-b' won't conflict and can both exist
      'bg-color': [],
      'bg-image': [],
    },
  }
});

export const cn = (...inputs: ClassValue[]) => classNames(clsx(...inputs));