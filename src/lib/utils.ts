import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'd1-bold', 'd2-bold',
            'h1-bold', 'h2-bold', 'h3-bold', 'h4-bold', 'h1-semibold',
            't1-bold', 't2-bold', 't3-bold', 't4-bold',
            's1-semibold', 's2-semibold', 's3-semibold', 's4-semibold', 's5-semibold',
            'b1-medium', 'b2-medium', 'b3-medium', 'b4-medium', 'b5-medium', 'b6-medium', 'b7-medium',
            'c1-medium', 'c2-medium', 'c3-medium', 'c1-regular', 'c2-regular', 'c3-regular',
            'p1-medium', 'p2-medium', 'p3-medium', 'p4-medium',
            'p1-regular', 'p2-regular', 'p3-regular', 'p4-regular',
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
