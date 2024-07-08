import Home from "@/components/Sidebar/Home";
import Search from "@/components/Sidebar/Search";
import CreatePost from "@/components/Sidebar/CreatePost";
import ProfileLink from "@/components/Sidebar/ProfileLink";

export default function SidebarItems() {
  return (
    <>
      <Home />
      <Search />
      <CreatePost />
      <ProfileLink />
    </>
  );
}
