import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { sidebarValues } from '../utils/defaultValues';

export default function Sidebar() {
  const router = useRouter();
  const [state, setState] = useState<any>({
    menuKey: null,
    subMenuKey: null,
    title: '',
    openMenuKey: null,
  });
  console.log('router', router);
  useEffect(() => {
    // To do
  }, []);

  const setSidebar = (menuKey: number, submenu: any) => {
    setState({
      ...state,
      menuKey,
      subMenuKey: submenu.key,
      title: `${submenu.title}`,
      openMenuKey: menuKey,
    });
  };

  return (
    <div className="bg-primary-text-color h-screen">
      <div className="py-3 border-b border-secondary-text-color h-14 px-4 text-lg text-center text-orange">
        Take Notes
      </div>
      <div className="">
        {sidebarValues.map((menu: any) => (
          <div
            key={menu.key}
            className={`cursor-pointer ${
              menu.key === state.menuKey || menu.key === state.openMenuKey
                ? 'bg-secondary-text-color'
                : ''
            }`}
            onClick={() =>
              setState({
                ...state,
                openMenuKey: state.openMenuKey === menu.key ? null : menu.key,
              })
            }
            role="presentation"
          >
            <div className="text-lg flex items-center text-bg-dark hover:text-primary-text-color hover:bg-bg-light p-4 border-b border-secondary-text-color">
              <span className="material-icons mr-3 text-base">{menu.icon}</span>{' '}
              {menu.title}
            </div>
            {menu.key === state.openMenuKey && menu.children.length > 0
              ? menu.children.map((submenu: any) => (
                  <Link key={submenu.key} href={submenu.route} passHref>
                    <div
                      className="text-lg flex items-center text-bg-dark hover:text-primary-text-color hover:bg-bg-light py-4 pl-8 border-t border-primary-text-color"
                      onClick={() => setSidebar(menu.key, submenu)}
                    >
                      <span className="material-icons mr-3 text-base">
                        {submenu.icon}
                      </span>{' '}
                      {submenu.title}
                    </div>
                  </Link>
                ))
              : null}
          </div>
        ))}
      </div>
    </div>
  );
}
