import React from 'react'

const IconMock = ({
                    size = 24,
                    color = 'currentColor',
                    strokeWidth = 2,
                    ...props
                  }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
        data-testid="lucide-icon"
    >
      <rect width="24" height="24" />
    </svg>
)

// Next.jsプロジェクトで使用している全てのアイコンをここでエクスポート
export const Search = IconMock
export const Square = IconMock
export const SquareCheck = IconMock
export const Trash2 = IconMock
