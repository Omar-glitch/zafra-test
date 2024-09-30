import plugin from "tailwindcss/plugin";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    screens: {
      "2xs": "350px",
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      spacing: {
        appbar: "var(--appbar-height)",
      },
      backgroundColor: {
        modal: "var(--modal-bg)",
      },
      zIndex: {
        appbar: "var(--header-z-index)",
        portal: "var(--portal-z-index)",
        overportal: "var(--overportal-z-index)",
      },
      transitionDuration: {
        paper: "var(--transition)",
      },
      maxWidth: {
        view: "var(--max-width)",
      },
      minWidth: {
        view: "var(--min-width)",
      },
    },
    colors: {
      primary: {
        DEFAULT: "var(--primary)",
        light: "var(--primary-light)",
        dark: "var(--primary-dark)",
        alpha: "rgba(var(--primary-channel), <alpha-value>)",
      },
      text: {
        DEFAULT: "var(--text)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--text-tertiary)",
        alpha: "rgba(var(--text-channel), <alpha-value>)",
      },
      paper: {
        DEFAULT: "var(--paper)",
        secondary: "var(--paper-secondary)",
        tertiary: "var(--paper-tertiary)",
        alpha: "rgba(var(--paper-channel), <alpha-value>)",
      },
      success: {
        DEFAULT: "var(--success)",
        light: "var(--success-light)",
        dark: "var(--success-dark)",
        alpha: "rgba(var(--success-channel), <alpha-value>)",
      },
      info: {
        DEFAULT: "var(--info)",
        light: "var(--info-light)",
        dark: "var(--info-dark)",
        alpha: "rgba(var(--info-channel), <alpha-value>)",
      },
      warning: {
        DEFAULT: "var(--warning)",
        light: "var(--warning-light)",
        dark: "var(--warning-dark)",
        alpha: "rgba(var(--warning-channel), <alpha-value>)",
      },
      error: {
        DEFAULT: "var(--error)",
        light: "var(--error-light)",
        dark: "var(--error-dark)",
        alpha: "rgba(var(--error-channel), <alpha-value>)",
      },
      shadow: "var(--shadow)",
      black: {
        DEFAULT: "var(--black)",
        paper: "var(--black-paper)",
      },
      white: {
        DEFAULT: "var(--white)",
        paper: "var(--white-paper)",
      },
      transparent: "transparent",
      current: "currentColor",
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "min-size": (value) => {
            return {
              "min-width": value,
              "min-height": value,
            };
          },
        },
        {
          values: theme("size"),
        }
      );
    }),
  ],
};
