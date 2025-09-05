import { forwardRef, useCallback, useMemo } from "react";
import { cn } from "../../utils/bem";
import { useDropdown } from "../Dropdown/Dropdown";
import "./Menu.scss";
import { Block, Elem, MenuContext } from "./MenuContext";
import { MenuItem } from "./MenuItem";

export const Menu = forwardRef(
  ({ children, className, style, size, selectedKeys, closeDropdownOnItemClick, contextual }, ref) => {
    const dropdown = useDropdown();

    const selected = useMemo(() => {
      return new Set(selectedKeys ?? []);
    }, [selectedKeys]);

    const clickHandler = useCallback(
      (e) => {
        const elem = cn("main-menu").elem("item").closest(e.target);

        if (dropdown && elem && closeDropdownOnItemClick !== false) {
          dropdown.close();
        }
      },
      [dropdown],
    );

    const collapsed = useMemo(() => {
      return !!dropdown;
    }, [dropdown]);

    return (
      <MenuContext.Provider value={{ selected }}>
        <Block
          ref={ref}
          tag="ul"
          name="main-menu"
          mod={{ size, collapsed, contextual }}
          mix={className}
          style={style}
          onClick={clickHandler}
          style={{ background: "rgb(231, 237, 255)" }}
        >
          {children}
        </Block>
      </MenuContext.Provider>
    );
  },
);

Menu.Item = MenuItem;
Menu.Spacer = () => <Elem block="main-menu" tag="li" name="spacer" />;
Menu.Divider = () => <Elem block="main-menu" tag="li" name="divider" />;
Menu.Builder = (url, menuItems, activeTab) => {
  return (menuItems ?? []).map((item, index) => {
    if (item === "SPACER") return <Menu.Spacer key={index} />;
    if (item === "DIVIDER") return <Menu.Divider key={index} />;

    let pageLabel;
    let pagePath;
    let itemId;

    if (Array.isArray(item)) {
      [pagePath, pageLabel] = item;
    } else if (item && typeof item === "object" && item.menuItem) {
      // Handle component objects with menuItem property (like GeneralSettings, AnnotationSettings, etc.)
      pageLabel = item.menuItem;
      pagePath = item.path || "/";
      itemId = item.menuItem.toLowerCase().replace(/\s+/g, "-");
    } else if (item && typeof item === "object" && item.title) {
      // Handle component objects with title property (like WebhookPage)
      pageLabel = item.title;
      pagePath = item.path || "/";
      itemId = item.title.toLowerCase().replace(/\s+/g, "-");
    } else {
      const { menuItem, title, path, id } = item || {};
      pageLabel = title ?? menuItem;
      pagePath = path;
      itemId = id;
    }

    if (typeof pagePath === "function") {
      return (
        <Menu.Item key={index} onClick={pagePath} active={activeTab === itemId}>
          {pageLabel}
        </Menu.Item>
      );
    }

    const location = `${url}${pagePath}`.replace(/([/]+)/g, "/");

    return (
      <Menu.Item key={index} to={location} exact active={activeTab === itemId}>
        {pageLabel}
      </Menu.Item>
    );
  });
};

Menu.Group = ({ children, title, className, style }) => {
  return (
    <Block name="menu-group" mix={className} style={style}>
      <Elem name="title">{title}</Elem>
      <Elem tag="ul" name="list">
        {children}
      </Elem>
    </Block>
  );
};
