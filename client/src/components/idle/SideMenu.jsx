import { NavLink, useLocation  } from 'react-router-dom';

import { ReactComponent as MYLIMEMON } from "../../assets/icons/MYLIMEMON.svg"
import { ReactComponent as ITEMS } from "../../assets/icons/ITEMS.svg"
import { ReactComponent as QUESTS } from "../../assets/icons/QUESTS.svg"
import { ReactComponent as SHOP } from "../../assets/icons/SHOP.svg"
import { ReactComponent as LEADERBOARD } from "../../assets/icons/LEADERBOARD.svg"
import { ReactComponent as EVENTS } from "../../assets/icons/EVENTS.svg"
import { ReactComponent as MORE1 } from "../../assets/icons/MORE1.svg"

import SideMenuItem from './SideMenuItem';
import SocialLink from './SpcoalLink';

export default function SideMenu() {

    // URL의 path값을 받아올 수 있다.
    const pathName = useLocation().pathname;

    const menus = [
        {
            name: 'MY LIMEMON',
            path: '/idle/myLimemon',
            icon: <MYLIMEMON width="17px" fill="none" stroke="currentColor" />,
            disabled: false,
            dropdown: false,
        },
        {
            name: 'ITEMS',
            path: '/idle/items',
            icon: <ITEMS width="17px" fill="none" stroke="currentColor" />,
            disabled: false,
            dropdown: false,
        },
        {
            name: 'QUESTS',
            path: '/idle/quests',
            icon: <QUESTS width="17px" fill="none" stroke="currentColor" />,
            disabled: false,
            dropdown: false,
        },
        {
            name: 'SHOP',
            path: '/idle/shop',
            icon: <SHOP width="17px" fill="none" stroke="currentColor" />,
            disabled: false,
            dropdown: false,
        },
        {
            name: 'LEADERBOARD',
            path: '/idle/leaderBoard',
            icon: <LEADERBOARD width="17px" fill="none" stroke="currentColor" />,
            disabled: false,
            dropdown: false,
        },
        {
            name: 'EVENTS',
            path: '/idle/events',
            icon: <EVENTS width="17px" fill="none" stroke="currentColor" />,
            disabled: true,
            dropdown: false,
        },
        {
            name: 'MORE',
            path: null,
            icon: <MORE1 width="17px" fill="none" stroke="currentColor" />,
            disabled: false,
            dropdown: true,
            subMenu: [
                {
                    name: 'MORE 1',
                    path: '/idle/more1',
                    disabled: false,
                },
                {
                    name: 'MORE 2',
                    path: '/idle/more2',
                    disabled: false,
                },
                {
                    name: 'MORE 3',
                    path: '/idle/more3',
                    disabled: false,
                },
            ]
        },
    ];

    return (
        <div className="col-span-1 border-r border-[#7c7a75] overflow-y-auto relative">

            {/* Connect Wallet */}
            <div className="text-center my-5">
                <button type="button" className="SUITE-ExtraBold rounded-full text-[#5d5a51] bg-[#dcefda] px-7 py-0.5">CONNECT WALLET</button>
            </div>

            {/* Menus */}
            <h3 className="block px-5 py-2 SUITE-ExtraBold text-[#80b272]">MENU</h3>

            {menus.map((menu) => {
                if(menu.dropdown){
                    return(
                            <details className="group [&_summary::-webkit-details-marker]:hidden" key={menu.name}>
                                <summary
                                    className="flex cursor-pointer items-center justify-between px-8 py-2 SUITE-Medium text-[#5d5a51] hover:bg-[#e3e3e3]"
                                >
                                    <span className="flex gap-3 items-center">
                                        {menu.icon}{menu.name}
                                    </span>

                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </summary>

                                <ul className="px-4">
                                    {menu.subMenu.map((subMenu) => {
                                        return (
                                            <NavLink to={subMenu.path} key={subMenu.name}>
                                                <SideMenuItem
                                                    icon={subMenu.icon}
                                                    name={subMenu.name}
                                                    disabled={subMenu.disabled}
                                                    isActive={pathName === subMenu.path ? true: false}
                                                />
                                            </NavLink>
                                        )
                                    })}
                                </ul>
                        </details>
                    )
                }

                if(menu.disabled){
                    return(
                        <div className="SUITE-Medium flex gap-3 items-center px-8 py-2 text-[#d0d1c5]" key={menu.name}>
                            {menu.icon}{menu.name}
                            <span className="text-[0.6rem] text-white bg-[#d0d1c5] px-1">UPCOMMING</span>
                        </div>
                    )
                }

                return (
                    <NavLink to={menu.path} key={menu.name}>
                        <SideMenuItem
                            icon={menu.icon}
                            name={menu.name}
                            disabled={menu.disabled}
                            isActive={pathName === menu.path}
                        />
                    </NavLink>
                )
            })}

            {/* Social Links */}
            <SocialLink />
        </div>
    )
}