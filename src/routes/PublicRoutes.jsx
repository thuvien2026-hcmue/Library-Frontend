// routes/PublicRoutes.jsx
import { Route } from "react-router-dom";
import Home from "../page/Home";
import Page from "../page/Page";
import Post from "../page/Post";
import Signin from "../page/Signin";
import VanBanPage from "../page/VanBanPage";
import TrendBook from "../page/TrendBook";

export default function PublicRoutes() {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/dangnhap" element={<Signin />} />

      {/* STATIC PAGE */}
      <Route path="/lien-he/:slug" element={<Page />} />
      <Route path="/tai-lieu/:slug" element={<Page />} />
      <Route path="/van-ban/:slug" element={<VanBanPage />} />

      {/* POSTS */}
      <Route path="/:category/:slug" element={<Post />} />
      <Route path="/:category/:parent/:slug" element={<Post />} />
      <Route path="/trend-books/:slug" element={<TrendBook />} />
    </>
  );
}
