// routes/DashboardRoutes.jsx
import { Route } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import Dashboard from "../page/Dashboard";

import UserList from "../components/Dashboard/UserList";
import UserAdd from "../components/Dashboard/UserAdd";
import UserEdit from "../components/Dashboard/UserEdit";

import PageList from "../components/Dashboard/PageList";
import PageAdd from "../components/Dashboard/PageAdd";
import PageEdit from "../components/Dashboard/PageEdit";

import PostList from "../components/Dashboard/PostList";
import PostAdd from "../components/Dashboard/PostAdd";
import PostEdit from "../components/Dashboard/PostEdit";

import MediaList from "../components/Dashboard/MediaList";
import FormRootList from "../components/Dashboard/FormRootList";
import FormResultList from "../components/Dashboard/FormResultList";
import FormResultDetail from "../components/Dashboard/FormResultDetail";
import VanBanList from "../components/Dashboard/VanBanList";
import VanbanAdd from "../components/Dashboard/VanbanAdd";
import VanbanEdit from "../components/Dashboard/VanbanEdit";
import PageBlockDashboard from "../components/Dashboard/PageBlockDashboard";
import TrendBookList from "../components/Dashboard/TrendBookList";
import TrendBookCreate from "../components/Dashboard/TrendBookCreate";
import TrendBookEdit from "../components/Dashboard/TrendBookEdit";

export default function DashboardRoutes() {
  return (
    <Route element={<RequireAuth />}>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="users" element={<UserList />} />
        <Route path="users/add" element={<UserAdd />} />
        <Route path="users/edit/:id" element={<UserEdit />} />

        <Route path="pages" element={<PageList />} />
        <Route path="pages/add" element={<PageAdd />} />
        <Route path="pages/edit/:id" element={<PageEdit />} />

        <Route path="posts" element={<PostList />} />
        <Route path="posts/add" element={<PostAdd />} />
        <Route path="posts/edit/:id" element={<PostEdit />} />

        <Route path="medias" element={<MediaList />} />

        <Route path="forms" element={<FormRootList />} />
        <Route path="forms/:type/:id" element={<FormResultList />} />
        <Route path="forms/result/:id" element={<FormResultDetail />} />

        <Route path="vanban" element={<VanBanList />} />
        <Route path="vanban/add" element={<VanbanAdd />} />
        <Route path="vanban/edit/:id" element={<VanbanEdit />} />

        <Route path="pages/:pageId/blocks" element={<PageBlockDashboard />} />

        <Route path="trend-books" element={<TrendBookList />} />
        <Route path="trend-books/create" element={<TrendBookCreate />} />
        <Route path="trend-books/edit/:id" element={<TrendBookEdit />} />
      </Route>
    </Route>
  );
}
