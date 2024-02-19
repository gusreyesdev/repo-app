import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Button } from "./ui/button";
import {
  BellDotIcon,
  MenuIcon,
  MoreHorizontalIcon,
  PowerIcon,
} from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../components/ui/menubar";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Checkbox } from "../components/ui/checkbox";

import { useAuthStore, useRepoInfoStore } from "../hooks";
import { Loader } from "./loader";

export const NavBar = () => {
  const [toggled, setToggled] = useState(false);

  const {
    startLoadingNotification,
    startLoadingTodos,
    notifications,
    todos,
    isLoading,
  } = useRepoInfoStore();

  const { startLogout } = useAuthStore();

  useEffect(() => {
    startLoadingNotification();
    startLoadingTodos();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Sidebar
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="all"
      >
        <Menu>
          <MenuItem
            component={<Link to="/dashboard" />}
            onClick={() => setToggled(!toggled)}
          >
            Dashboard
          </MenuItem>

          <MenuItem
            component={<Link to="/dashboard/projects" />}
            onClick={() => setToggled(!toggled)}
          >
            Projects
          </MenuItem>
        </Menu>
      </Sidebar>

      <div className="flex flex-row justify-between ">
        <Button variant="outline" size="icon">
          <MenuIcon onClick={() => setToggled(!toggled)} />
        </Button>

        <div className="flex flex-row">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                <BellDotIcon />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <ScrollArea className="h-32 rounded-md border">
                    {notifications.map((noti) => (
                      <div key={noti.id}>
                        <>
                          <p className="text-sm"> {noti.details} </p>
                        </>
                        <>
                          <p className="text-xs">{noti.time} </p>
                        </>
                        <Separator className="my-2" />
                      </div>
                    ))}
                  </ScrollArea>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
                <Avatar>
                  <AvatarImage
                    src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-372-456324.png"
                    alt="avatar-cover"
                  />
                  <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
              </MenubarTrigger>

              <MenubarContent>
                <MenubarItem>
                  <Button onClick={startLogout} variant="outline">
                    <PowerIcon className="w-4 h-4 mr-1" /> Logout
                  </Button>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
                <MoreHorizontalIcon />
              </MenubarTrigger>

              <MenubarContent>
                <MenubarItem>
                  <ScrollArea className="h-32 rounded-md border">
                    {todos.map((todo) => (
                      <div key={todo.id}>
                        <>
                          <Checkbox id="todos" checked={todo.check} disabled />
                          <label
                            htmlFor="todos"
                            className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {todo.description}
                          </label>
                        </>

                        <Separator className="my-2" />
                      </div>
                    ))}
                  </ScrollArea>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </div>
  );
};
