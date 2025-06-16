export const EjadaTailwind = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  safelist: [
    {
      pattern: /col-span-*/,
    },
    {
      pattern: /grid-cols-*/,
    },
  ],

  theme: {
    extend: {
      boxShadow: {
        "3xl": "0px 5px 10px 0px rgba(64, 64, 66, 0.12)",
      },
      colors: {
        "primary-blue": "#001081",
        "primary-dark": "#000C5E",
        "secondary-dark": "#42566B",
        "neutrals/N2": "#404042",
        "neutrals/N3": "#59595C",
        "neutrals/N4": "#A3A3A8",
        "neutrals/N5": "#D1D4D4",
        "neutrals/N6": "#E6E8E8",
        "disabled-grey": "#F1F1F5",
        "neutrals/N7": "#F2F2F2",
        "neutrals/N8": "#919191",
        "error-default": "#ED696A",
        "error-bg": "#FDEDF0",
        "error-dark": "#B43532",
        "secondary-green": "#1FED93",
        "border-grey": "#E0E1E2",
        "border-grey-200": "#E0E1E233",
        "drawer-backdrop": "#0e0f1033",
        "divider-color": "#BCBABA",
        "blue-primary-light": "#525DC1",
        "blue-light": "#F2F4FF",
        "light-white": "#FAFCFF",
        "vivid-blue": "#109CF1",
        "dark-green": "#10774A",
        "light-green": "#E9FDF4",
        "caution-bg": "#FCF7E1",
        "blue-info": "#E2F2FF",
        "support5/dark": "#004C86",
        "avatar-grey": "#F3F5F8",
        "disabled-bg": "#F7F7F7",
        "disabled-text": "#B0B0B0",
        success: "#4BC181",
        error: "#ED696A",
        warning: "#FFCB00",
        loading: "#0000FF",
      },
      borderColor: {
        grey: "#A3A3A8",
      },
      fontWeight: {
        700: "bold",
        800: "black",
        500: "normal",
      },
      fontSize: {
        base: "16px",
        "3xl": "28px",
      },
      fontFamily: {
        readexProExtraLight200: ['"ReadexPro-extra-light"'],
        readexProLight300: ['"ReadexPro-light"'],
        readexProRegular: ['"ReadexPro-regular"'],
        readexProMedium500: ['"ReadexPro-medium"'],
        readexProSemiBold600: ['"ReadexPro-semi-bold"'],
        readexProBold700: ["ReadexPro-bold"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      spacing: {
        7.5: "30px", // Custom value for 30px
      },
    },
  },
  plugins: [],
};
