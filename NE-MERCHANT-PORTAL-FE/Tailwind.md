# Tailwind Configuration 

## Table Of Contents
- Setup tailwind (Ignore if you already have tailwind installed)
- Example of using tailwind classes
  - Responsive classes
  - Complex example with props and merge classes 
- Tailwind global configuration, Adding global font size, colors, margin .. etc
- More examples



---

# Setting Up Tailwind CSS 
### Ignore this section if you already have tailwind installed 
---

Tailwind CSS is a utility-first CSS framework that allows you to quickly build modern web designs. Here's how to set it up:

1. **Install Tailwind CSS**: You can install Tailwind CSS via npm or yarn. Run the following command in your terminal:

   ```bash
   npm install tailwindcss
   ```

   or

   ```bash
   yarn add tailwindcss
   ```

2. **Create a Configuration File**: Tailwind CSS comes with a default configuration file that you can customize. To generate the default configuration file, run:

   ```bash
   npx tailwindcss init
   ```

   This will create a `tailwind.config.js` file in your project directory.

3. **Include Tailwind CSS in Your Project**: Include Tailwind CSS in your project's CSS file by importing it. You can either create a new CSS file or use an existing one. For example:

   ```css
   @import 'tailwindcss/base';
   @import 'tailwindcss/components';
   @import 'tailwindcss/utilities';
   ```

   Ensure that your CSS file is being included in your HTML file or bundled with your JavaScript build process.

4. **Configure PostCSS**: If you haven't already, you'll need to set up PostCSS in your project. Tailwind CSS requires PostCSS for processing. Install PostCSS and the necessary plugins:

   ```bash
   npm install postcss autoprefixer
   ```

   Create a `postcss.config.js` file in your project directory and configure it to use Tailwind CSS:

   ```javascript
   module.exports = {
     plugins: [
       require('tailwindcss'),
       require('autoprefixer'),
     ]
   }
   ```

   Make sure to include PostCSS in your build process.

---

# Example of Using Tailwind CSS Classes

## Responsive Classes

Tailwind CSS provides responsive utility classes that allow you to build responsive designs easily. Here's an example:

```html
<div class="text-center md:text-left lg:text-right">
  This text will be centered on small screens, left-aligned on medium screens, and right-aligned on large screens.
</div>
```

In this example:
- `text-center` applies center alignment to the text.
- `md:text-left` applies left alignment on medium-sized screens and above.
- `lg:text-right` applies right alignment on large screens and above.

## Complex Example with Props and Merge Classes

You can create complex components by combining Tailwind CSS classes with props and merge utilities. Here's an example of a reusable input field component:

```jsx
import React from 'react';
import merge from 'tailwind-merge';

const InputField = ({ color, size, text, type, disabled, ...rest }) => {
  const baseClasses = 'border rounded px-3 py-2 focus:outline-none';
  const colorClasses = getColorClasses(color);
  const sizeClasses = getSizeClasses(size);

  const inputClasses = merge(baseClasses, colorClasses, sizeClasses);

  return (
    <input
      className={inputClasses}
      type={type}
      disabled={disabled}
      placeholder={text}
      {...rest}
    />
  );
};

const getColorClasses = (color) => {
  switch (color) {
    case 'gray':
      return 'border-gray-400 text-gray-700 focus:border-gray-500';
    case 'blue':
      return 'border-blue-400 text-blue-700 focus:border-blue-500';
    default:
      return 'border-gray-400 text-gray-700 focus:border-gray-500';
  }
};

const getSizeClasses = (size) => {
  switch (size) {
    case 'sm':
      return 'text-sm';
    case 'lg':
      return 'text-lg';
    default:
      return '';
  }
};

export default InputField;
```

In this example:
- The `InputField` component accepts props like `color`, `size`, `text`, etc., to customize the appearance of the input field.
- Tailwind CSS classes are dynamically generated based on the props passed to the component.
- The `merge` utility is used to merge multiple class strings into a single class string.

---

# Tailwind Global Configuration

Tailwind CSS allows you to customize global settings such as font size, colors, spacing, and more. Here's how to do it:

1. **Editing the Configuration File**: Open the `tailwind.config.js` file generated earlier. This file contains various configuration options that you can customize.

2. **Customizing Fonts**: You can add custom fonts by extending the `fontFamily` section in the configuration file. For example:

   ```javascript
   module.exports = {
     theme: {
       fontFamily: {
         'sans': ['Helvetica', 'Arial', 'sans-serif'],
         'serif': ['Georgia', 'serif'],
       },
     },
   };
   ```
- Example using fonts: 

```html
<div class="font-custom">This text will be displayed using the custom font.</div>

```

3. **Defining Custom Colors**: Tailwind CSS allows you to define custom colors in the `colors` section of the configuration file. For example:

   ```javascript
   module.exports = {
     theme: {
       colors: {
         'primary': '#3490dc',
         'secondary': '#ffed4a',
         'danger': '#e3342f',
       },
     },
   };
   ```
Example using colors:

```html
<div class="bg-primary text-white">This div has a custom primary background color and white text.</div>

```
4. **Adjusting Spacing**: You can customize spacing values such as padding, margin, and more in the `spacing` section of the configuration file. For example:

   ```javascript
   module.exports = {
     theme: {
       spacing: {
         '1': '0.25rem',
         '2': '0.5rem',
         // Add more spacing values as needed
       },
     },
   };
   ```


5. **More Examples** 
Check flowbite for more working examples of tailwind components https://flowbite.com
