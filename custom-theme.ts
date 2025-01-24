import type {CustomThemeConfig} from '@skeletonlabs/tw-plugin';

export const customTheme: CustomThemeConfig = {
    name: 'custom-theme',
    properties: {
        // =~= Theme Properties =~=
        "--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
        "--theme-font-family-heading": `system-ui`,
        "--theme-font-color-base": "0 0 0",
        "--theme-font-color-dark": "255 255 255",
        "--theme-rounded-base": "6px",
        "--theme-rounded-container": "6px",
        "--theme-border-base": "1px",
        // =~= Theme On-X Colors =~=
        "--on-primary": "0 0 0",
        "--on-secondary": "255 255 255",
        "--on-tertiary": "0 0 0",
        "--on-success": "0 0 0",
        "--on-warning": "0 0 0",
        "--on-error": "255 255 255",
        "--on-surface": "255 255 255",
        // =~= Theme Colors  =~=
        // primary | #99c1f1
        "--color-primary-50": "240 246 253", // #f0f6fd
        "--color-primary-100": "235 243 252", // #ebf3fc
        "--color-primary-200": "230 240 252", // #e6f0fc
        "--color-primary-300": "214 230 249", // #d6e6f9
        "--color-primary-400": "184 212 245", // #b8d4f5
        "--color-primary-500": "153 193 241", // #99c1f1
        "--color-primary-600": "138 174 217", // #8aaed9
        "--color-primary-700": "115 145 181", // #7391b5
        "--color-primary-800": "92 116 145", // #5c7491
        "--color-primary-900": "75 95 118", // #4b5f76
        // secondary | #1a5fb4
        "--color-secondary-50": "221 231 244", // #dde7f4
        "--color-secondary-100": "209 223 240", // #d1dff0
        "--color-secondary-200": "198 215 236", // #c6d7ec
        "--color-secondary-300": "163 191 225", // #a3bfe1
        "--color-secondary-400": "95 143 203", // #5f8fcb
        "--color-secondary-500": "26 95 180", // #1a5fb4
        "--color-secondary-600": "23 86 162", // #1756a2
        "--color-secondary-700": "20 71 135", // #144787
        "--color-secondary-800": "16 57 108", // #10396c
        "--color-secondary-900": "13 47 88", // #0d2f58
        // tertiary | #0EA5E9
        "--color-tertiary-50": "219 242 252", // #dbf2fc
        "--color-tertiary-100": "207 237 251", // #cfedfb
        "--color-tertiary-200": "195 233 250", // #c3e9fa
        "--color-tertiary-300": "159 219 246", // #9fdbf6
        "--color-tertiary-400": "86 192 240", // #56c0f0
        "--color-tertiary-500": "14 165 233", // #0EA5E9
        "--color-tertiary-600": "13 149 210", // #0d95d2
        "--color-tertiary-700": "11 124 175", // #0b7caf
        "--color-tertiary-800": "8 99 140", // #08638c
        "--color-tertiary-900": "7 81 114", // #075172
        // success | #84cc16
        "--color-success-50": "237 247 220", // #edf7dc
        "--color-success-100": "230 245 208", // #e6f5d0
        "--color-success-200": "224 242 197", // #e0f2c5
        "--color-success-300": "206 235 162", // #ceeba2
        "--color-success-400": "169 219 92", // #a9db5c
        "--color-success-500": "132 204 22", // #84cc16
        "--color-success-600": "119 184 20", // #77b814
        "--color-success-700": "99 153 17", // #639911
        "--color-success-800": "79 122 13", // #4f7a0d
        "--color-success-900": "65 100 11", // #41640b
        // warning | #EAB308
        "--color-warning-50": "252 244 218", // #fcf4da
        "--color-warning-100": "251 240 206", // #fbf0ce
        "--color-warning-200": "250 236 193", // #faecc1
        "--color-warning-300": "247 225 156", // #f7e19c
        "--color-warning-400": "240 202 82", // #f0ca52
        "--color-warning-500": "234 179 8", // #EAB308
        "--color-warning-600": "211 161 7", // #d3a107
        "--color-warning-700": "176 134 6", // #b08606
        "--color-warning-800": "140 107 5", // #8c6b05
        "--color-warning-900": "115 88 4", // #735804
        // error | #D41976
        "--color-error-50": "249 221 234", // #f9ddea
        "--color-error-100": "246 209 228", // #f6d1e4
        "--color-error-200": "244 198 221", // #f4c6dd
        "--color-error-300": "238 163 200", // #eea3c8
        "--color-error-400": "225 94 159", // #e15e9f
        "--color-error-500": "212 25 118", // #D41976
        "--color-error-600": "191 23 106", // #bf176a
        "--color-error-700": "159 19 89", // #9f1359
        "--color-error-800": "127 15 71", // #7f0f47
        "--color-error-900": "104 12 58", // #680c3a
        // surface | #1e1f38
        "--color-surface-50": "221 221 225", // #dddde1
        "--color-surface-100": "210 210 215", // #d2d2d7
        "--color-surface-200": "199 199 205", // #c7c7cd
        "--color-surface-300": "165 165 175", // #a5a5af
        "--color-surface-400": "98 98 116", // #626274
        "--color-surface-500": "30 31 56", // #1e1f38
        "--color-surface-600": "27 28 50", // #1b1c32
        "--color-surface-700": "23 23 42", // #17172a
        "--color-surface-800": "18 19 34", // #121322
        "--color-surface-900": "15 15 27", // #0f0f1b

    }
}