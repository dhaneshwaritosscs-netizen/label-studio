import { HorizontalSettingsMenu } from "../../components/HorizontalSettingsMenu";
import { WebhookPage } from "../WebhookPage/WebhookPage";
import { DangerZone } from "./DangerZone";
import { GeneralSettings } from "./GeneralSettings";
import { AnnotationSettings } from "./AnnotationSettings";
import { LabelingSettings } from "./LabelingSettings";
import { MachineLearningSettings } from "./MachineLearningSettings/MachineLearningSettings";
import { PredictionsSettings } from "./PredictionsSettings/PredictionsSettings";
import { StorageSettings } from "./StorageSettings/StorageSettings";
import { isInLicense, LF_CLOUD_STORAGE_FOR_MANAGERS } from "../../utils/license-flags";
import { useMemo } from "react";

const isAllowCloudStorage = !isInLicense(LF_CLOUD_STORAGE_FOR_MANAGERS);

export const MenuLayout = ({ children, ...routeProps }) => {
  const menuItems = [
    GeneralSettings,
    LabelingSettings,
    AnnotationSettings,
    MachineLearningSettings,
    PredictionsSettings,
    isAllowCloudStorage && StorageSettings,
    WebhookPage,
    DangerZone,
  ].filter(Boolean);

  // Determine active tab based on current URL
  const activeTab = useMemo(() => {
    const currentPath = routeProps.match.url;
    const currentItem = menuItems.find(item => {
      if (item && item.path) {
        return currentPath.endsWith(item.path);
      }
      return false;
    });
    
    if (currentItem) {
      return currentItem.menuItem ? 
        currentItem.menuItem.toLowerCase().replace(/\s+/g, "-") :
        currentItem.title ? currentItem.title.toLowerCase().replace(/\s+/g, "-") : null;
    }
    
    // Default to "general" if no specific path matches
    return "general";
  }, [routeProps.match.url, menuItems]);

  return (
    <HorizontalSettingsMenu
      menuItems={menuItems}
      path={routeProps.match.url}
      activeTab={activeTab}
      children={children}
    />
  );
};

const pages = {
  AnnotationSettings,
  LabelingSettings,
  MachineLearningSettings,
  PredictionsSettings,
  WebhookPage,
  DangerZone,
};

isAllowCloudStorage && (pages.StorageSettings = StorageSettings);

export const SettingsPage = {
  title: "Settings",
  path: "/settings",
  exact: true,
  layout: MenuLayout,
  component: GeneralSettings,
  pages,
};
