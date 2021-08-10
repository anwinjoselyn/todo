/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { sidebarValues } from '../utils/defaultValues';
import { route } from 'next/dist/next-server/server/router';

export default function Sidebar() {
  const router = useRouter();
  const { pathname } = router;
  let searchTerms = pathname.split('/');
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    let theMenu: Array<any> = [];
    let theSubmenu: Array<any> = [];
    theMenu = sidebarValues.filter(
      (menu: any) => menu.route.split('/')[1] === searchTerms[1]
    );

    if (theMenu && theMenu.length > 0 && theMenu[0].children) {
      theSubmenu = theMenu[0].children.filter(
        (submenuItem: any) => submenuItem.route === pathname
      );
      if (theSubmenu.length === 0) {
        theSubmenu = theMenu[0].children.filter(
          (submenu: any) => submenu.route.split('/')[2] === searchTerms[2]
        );
      }
    }

    if (theSubmenu && theSubmenu.length > 0) {
      setState({
        ...state,
        menuKey: theMenu[0].key,
        subMenuKey: theSubmenu[0].key,
        title: theSubmenu[0].title,
        openMenuKey: theMenu[0].key,
      });
    } else if (theMenu && theMenu.length > 0) {
      setState({
        ...state,
        menuKey: theMenu[0].key,
        subMenuKey: null,
        title: theMenu[0].title,
        openMenuKey: theMenu[0].key,
      });
    }
  }, [pathname]);

  const onMenuClick = (key: number, route: string) => {
    setState({
      ...state,
      openMenuKey: key,
    });
    if (route) {
      router.replace(route);
    }
  };

  return (
    <div className="bg-primary-text-color h-screen sticky top-0">
      <div className="py-3 border-b border-secondary-text-color h-14 px-4 text-lg text-center text-orange">
        Take Notes
      </div>
      <div className="">
        {sidebarValues.map((menu: any) => {
          let menuClass: string =
            'text-bg-dark hover:text-primary-text-color hover:bg-bg-light';
          if (
            state &&
            (menu.key === state.menuKey || menu.key === state.openMenuKey)
          ) {
            if (menu.children.length > 0) {
              menuClass = 'bg-secondary-text-color text-bg-light';
            } else {
              menuClass = 'bg-bg-light text-primary-text-color';
            }
          }
          return (
            <div
              key={menu.key}
              className={`cursor-pointer ${menuClass}`}
              onClick={() =>
                onMenuClick(
                  state.openMenuKey === menu.key ? null : menu.key,
                  menu.children.length === 0 ? menu.route : null
                )
              }
              role="presentation"
            >
              <div className="text-lg flex items-center p-4 border-b border-secondary-text-color">
                <span className="material-icons mr-3 text-base">
                  {menu.icon}
                </span>{' '}
                {menu.title}
              </div>
              {state &&
              menu.key === state.openMenuKey &&
              menu.children.length > 0
                ? menu.children.map((submenu: any) => {
                    let subMenuClass: string =
                      'text-bg-dark hover:text-primary-text-color hover:bg-bg-light';
                    if (
                      submenu.key === state.subMenuKey &&
                      menu.key === state.menuKey
                    ) {
                      subMenuClass = 'bg-bg-light text-primary-text-color';
                    }
                    return (
                      <Link key={submenu.key} href={submenu.route} passHref>
                        <div
                          className={`text-lg flex items-center py-4 pl-8 border-t border-primary-text-color ${subMenuClass}`}
                        >
                          <span className="material-icons mr-3 text-base">
                            {submenu.icon}
                          </span>{' '}
                          {submenu.title}
                        </div>
                      </Link>
                    );
                  })
                : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
