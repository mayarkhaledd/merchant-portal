export function convertHtmlToEditorConfig(html: string): Record<string, any> {
  // Create default editor configuration
  const config: Record<string, any> = {
    root: {
      type: "EmailLayout",
      data: {
        backdropColor: "#FFFFFF",
        canvasColor: "#FFFFFF",
        textColor: "#333333",
        fontFamily: "GEOMETRIC_SANS",
        childrenIds: [],
      },
    },
  };

  const generateBlockId = () => {
    return `block_${Math.random().toString(36).substring(2, 15)}`;
  };

  // Extract styles from element and convert to editor format
  const extractStyleFromElement = (element: Element): any => {
    const computedStyle = element.getAttribute("style") || "";

    const styles = computedStyle
      .split(";")
      .reduce((acc: any, style: string) => {
        const [property, value] = style.split(":").map((s) => s.trim());
        if (property && value) {
          acc[property] = value;
        }
        return acc;
      }, {});

    return {
      color: styles.color || null,
      backgroundColor:
        styles.backgroundColor || styles["background-color"] || null,
      fontSize:
        styles.fontSize || styles["font-size"]
          ? parseInt(styles.fontSize || styles["font-size"])
          : 16,
      fontFamily: null,
      fontWeight: styles.fontWeight || styles["font-weight"] || "normal",
      textAlign: styles.textAlign || styles["text-align"] || "left",
      padding: {
        top: 16,
        bottom: 16,
        left: 24,
        right: 24,
      },
    };
  };

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const body = doc.body;

    if (!body) {
      console.warn("No body found in HTML");
      return config;
    }

    // Process HTML elements and convert to editor blocks
    const processElement = (element: Element): string[] => {
      const childIds: string[] = [];

      Array.from(element.children).forEach((child) => {
        const blockId = generateBlockId();
        const tagName = child.tagName.toLowerCase();
        const textContent = child.textContent?.trim() || "";
        const style = extractStyleFromElement(child);

        childIds.push(blockId);

        switch (tagName) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            config[blockId] = {
              type: "Heading",
              data: {
                style,
                props: {
                  level: tagName as "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
                  text: textContent,
                },
              },
            };
            break;

          case "p":
            config[blockId] = {
              type: "Text",
              data: {
                style,
                props: {
                  text: textContent,
                },
              },
            };
            break;

          case "a":
            const href = child.getAttribute("href") || "#";
            const buttonStyle = child.getAttribute("style") || "";
            const isButton =
              buttonStyle.includes("background") ||
              buttonStyle.includes("padding") ||
              child.className.includes("button");

            if (isButton) {
              config[blockId] = {
                type: "Button",
                data: {
                  style: {
                    ...style,
                    padding: {
                      top: 16,
                      bottom: 16,
                      left: 24,
                      right: 24,
                    },
                  },
                  props: {
                    buttonBackgroundColor: style.backgroundColor || "#007bff",
                    buttonStyle: "rounded",
                    buttonTextColor: style.color || "#FFFFFF",
                    fullWidth: false,
                    size: "large",
                    text: textContent,
                    url: href,
                  },
                },
              };
            } else {
              config[blockId] = {
                type: "Text",
                data: {
                  style,
                  props: {
                    text: `<a href="${href}">${textContent}</a>`,
                  },
                },
              };
            }
            break;

          case "img":
            const src = child.getAttribute("src") || "";
            const alt = child.getAttribute("alt") || "";
            config[blockId] = {
              type: "Image",
              data: {
                style: {
                  backgroundColor: null,
                  padding: {
                    top: 24,
                    bottom: 24,
                    left: 24,
                    right: 24,
                  },
                  textAlign: "center",
                },
                props: {
                  url: src,
                  alt: alt,
                  contentAlignment: "middle",
                },
              },
            };
            break;

          case "div":
            // Create container and process children recursively
            const containerChildren = processElement(child);
            config[blockId] = {
              type: "Container",
              data: {
                style: {
                  backgroundColor: style.backgroundColor,
                  borderColor: null,
                  borderRadius: null,
                  padding: {
                    top: 8,
                    bottom: 8,
                    left: 24,
                    right: 24,
                  },
                },
                props: {
                  childrenIds: containerChildren,
                },
              },
            };
            break;

          case "hr":
            config[blockId] = {
              type: "Divider",
              data: {
                style: {
                  backgroundColor: null,
                  padding: {
                    top: 16,
                    bottom: 16,
                    left: 24,
                    right: 24,
                  },
                },
                props: {
                  lineHeight: 1,
                  lineColor: "#EEEEEE",
                },
              },
            };
            break;

          default:
            // Fallback to text block for unknown elements with content
            if (textContent) {
              config[blockId] = {
                type: "Text",
                data: {
                  style,
                  props: {
                    text: textContent,
                  },
                },
              };
            }
            break;
        }
      });

      return childIds;
    };

    // Find main content container and process it
    const mainContent = body.querySelector("div") || body;
    const rootChildren = processElement(mainContent);
    config.root.data.childrenIds = rootChildren;

    // Create fallback content if no elements were processed
    if (rootChildren.length === 0) {
      const textBlockId = generateBlockId();
      config.root.data.childrenIds = [textBlockId];

      config[textBlockId] = {
        type: "Text",
        data: {
          style: {
            color: null,
            backgroundColor: null,
            fontSize: 16,
            fontFamily: null,
            fontWeight: "normal",
            textAlign: "center",
            padding: {
              top: 24,
              bottom: 24,
              left: 24,
              right: 24,
            },
          },
          props: {
            text: "Email template content will appear here",
          },
        },
      };
    }
  } catch (error) {
    console.error("Error during HTML conversion:", error);

    // Return basic template on error
    const textBlockId = generateBlockId();
    config.root.data.childrenIds = [textBlockId];

    config[textBlockId] = {
      type: "Text",
      data: {
        style: {
          color: null,
          backgroundColor: null,
          fontSize: 16,
          fontFamily: null,
          fontWeight: "normal",
          textAlign: "center",
          padding: {
            top: 24,
            bottom: 24,
            left: 24,
            right: 24,
          },
        },
        props: {
          text: "Error loading template content",
        },
      },
    };
  }

  return config;
}
