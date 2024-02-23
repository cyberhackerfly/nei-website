import FrontPage from "@src/pages/FrontPage";
import LoginPage from "@src/pages/LoginPage";
import RegisterPage from "@src/pages/RegisterPage";
import ResetPasswordPage from "@src/pages/ResetPasswordPage";
import LogoutPage from "@src/pages/LogoutPage";
import ProfilePage from "@src/pages/ProfilePage";
import MentoringPage from "@src/pages/MentoringPage";
import CalendarPage from "@src/pages/CalendarPage";
import AboutFAQPage from "@src/pages/AboutFAQPage";
import MaterialsPage from "@src/pages/MaterialsPage";
import BlogPage from "@src/pages/BlogPage";
import NotFoundPage from "@src/pages/NotFoundPage";
import PostPage from "@src/pages/PostPage";
import ChangePasswordPage from "@src/pages/ChangePasswordPage";

interface IRoutes {
  [key: string]: {
    name: string,
    path: string,
    element: JSX.Element,
  }
}

const routes: IRoutes = {
  frontpage: {
    name: 'Página Inicial',
    path: '/',
    element: <FrontPage />,
  },
  loginpage: {
    name: 'Iniciar Sessão',
    path: '/login',
    element: <LoginPage />,
  },
  registerpage: {
    name: 'Criar Conta',
    path: '/register',
    element: <RegisterPage />,
  },
  resetpasswordpage: {
    name: 'Redefinir Palavra Passe',
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  changepasswordpage: {
    name: 'Mudar Palavra Passe',
    path: '/change-password',
    element: <ChangePasswordPage />,
  },
  logoutpage: {
    name: 'Terminar Sessão',
    path: '/logout',
    element: <LogoutPage />,
  },
  logoutallpage: {
    name: 'Terminar Sessão',
    path: '/logout-all',
    element: <LogoutPage />,
  },
  profilepage: {
    name: 'Perfil',
    path: '/profile',
    element: <ProfilePage />,
  },
  mentoringpage: {
    name: 'Mentoria',
    path: '/mentoring',
    element: <MentoringPage />,
  },
  calendarpage: {
    name: 'Calendario',
    path: '/calendar',
    element: <CalendarPage />,
  },
  aboutFAQpage: {
    name: 'Sobre Nós',
    path: '/about',
    element: <AboutFAQPage />,
  },
  materialspage: {
    name: 'Materiais',
    path: '/materials',
    element: <MaterialsPage />,
  },
  blogpage: {
    name: 'Blog',
    path: '/blog',
    element: <BlogPage />,
  },
  postpage: {
    name: 'Post',
    path: '/blog/post/:slug',
    element: <PostPage />,
  },
  notfoundpage: {
    name: 'Not Found',
    path: '*',
    element: <NotFoundPage/>,
  }
}

export default routes;