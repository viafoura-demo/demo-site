/* eslint-disable @next/next/no-html-link-for-pages */

import { useState } from "react";
import { BiMenuAltLeft, BiX } from "react-icons/bi";

export default function SalesMenu({ allPosts }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    ...allPosts,
    {
      id: 99999999,
      slug: "broadcast-notification",
      productDemo: "Broadcast Notification",
    },
  ];

  return (
    <div className="flex h-10 w-10">
      <button
        className="flex items-center"
        aria-label="Open Menu"
        title="Open Menu"
        onClick={() => setIsMenuOpen(true)}
      >
        <BiMenuAltLeft className="h-8 w-8 text-white" />
      </button>
      {isMenuOpen && (
        <div className="relative top-2 -left-[30px] z-20">
          <div className="w-80 rounded border bg-white p-3 pb-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <div className="mb-2 flex items-center justify-between">
              <div className="ml-2 text-xl font-bold hover:text-red-700 dark:text-white">
                <a href="/" aria-label="Viafoura" title="Viafoura">
                  Viafoura
                </a>
              </div>
              <div>
                <button
                  aria-label="Close Menu"
                  title="Close Menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-neutral-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BiX className="h-7 w-7 text-center text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>
            <nav>
              {menuItems.map(
                (menuItem) =>
                  menuItem.productDemo && (
                    <a
                      key={menuItem.id}
                      href={`/posts/${menuItem.slug}`}
                      title={menuItem.productDemo}
                      aria-label={menuItem.productDemo}
                      className="block cursor-pointer rounded px-3 py-2 font-medium tracking-wide text-gray-800 transition-colors duration-200 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-700"
                    >
                      {menuItem.productDemo}
                    </a>
                  )
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
