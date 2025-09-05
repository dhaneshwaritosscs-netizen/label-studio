import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@humansignal/ui/lib/card-new/card";
import { useMemo, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styles from "./AccountSettings.module.scss";
import { accountSettingsSections } from "./sections";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { settingsAtom } from "./atoms";

/**
 * FIXME: This is legacy imports. We're not supposed to use such statements
 * each one of these eventually has to be migrated to core/ui
 */
// @ts-ignore
import { HorizontalSettingsMenu } from "apps/labelstudio/src/components/HorizontalSettingsMenu/HorizontalSettingsMenu";

const AccountSettingsPage = () => {
  const settings = useAtomValue(settingsAtom);
  const [activeTab, setActiveTab] = useState("personal-info");
  
  const contentClassName = clsx(styles.accountSettings__content, {
    [styles.accountSettingsPadding]: window.APP_SETTINGS.billing !== undefined,
  });
  
  const resolvedSections = useMemo(() => {
    if (settings.data && !settings.error && 'api_tokens_enabled' in settings.data) {
      return accountSettingsSections(settings.data);
    }
    return [];
  }, [settings.data, settings.error]);

  // Set initial active tab from URL hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && resolvedSections.some(section => section.id === hash)) {
      setActiveTab(hash);
    }
  }, [resolvedSections]);

  const menuItems = useMemo(
    () =>
      resolvedSections.map(({ title, id }) => ({
        title,
        path: () => {
          setActiveTab(id);
          if (!window?.location) return;
          window.location.hash = `#${id}`;
        },
      })),
    [resolvedSections],
  );

  const activeSection = resolvedSections.find(section => section.id === activeTab);

  return (
    <div className={styles.accountSettings}>
      <HorizontalSettingsMenu menuItems={menuItems} path={AccountSettingsPage.path} activeTab={activeTab}>
        <div className={contentClassName}>
          {activeSection && (
            <Card key={activeSection.id}>
              <CardHeader>
                <CardTitle>{activeSection.title}</CardTitle>
                {activeSection.description && (
                  <CardDescription>
                    <activeSection.description />
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <activeSection.component />
              </CardContent>
            </Card>
          )}
        </div>
      </HorizontalSettingsMenu>
    </div>
  );
};

AccountSettingsPage.title = "My Account";
AccountSettingsPage.path = "/user/account";
AccountSettingsPage.exact = true;
AccountSettingsPage.routes = () => [
  {
    title: () => "My Account",
    exact: true,
    component: () => {
      return <Redirect to={AccountSettingsPage.path} />;
    },
    // pages: {
    //   DataManagerPage,
    //   SettingsPage,
    // },
  },
];

export { AccountSettingsPage };
